import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, StyleSheet, Image, View, ScrollView } from 'react-native'
import HomeMenuItem from './HomeMenuItem'
import screen from '../../common/screen'
import PageControl from 'react-native-page-control'
import color from '../../widget/color'

type Props = {
  menuInfos: Array<Object>,
  onMenuSelected: Function,
}

type State = {
  currentPage : number,
}

class HomeMenuView extends PureComponent<Props> {
  constructor(props: Object){
    super(props)
    this.state = {
      currentPage: 0,
    }
  }
  onScroll = (e) => {
    let x = e.nativeEvent.contentOffset.x
    let  currentP = Math.round(x / screen.width)
    if(this.state.currentPage != currentP){
      this.setState({currentPage:currentP})
    }
  }
  render() {
    let { menuInfos, onMenuSelected } = this.props
    let menuElements = menuInfos.map((info,index)=>(
      <HomeMenuItem
        key={index}
        title={info.title}
        icon={info.icon}
        onPress={() =>{
          onMenuSelected(index)
        }}
       />
    ))
    let menuViews = []
    {/*向上取整*/}
    let pageCount = Math.ceil(menuInfos.length / 10)
    for(let i=0;i<pageCount;i++){
      let elementPerPage = menuElements.slice(i*10,i*10+10)
      let menuView = (
        <View key={i} style={styles.itemView}>
          {elementPerPage}
        </View>
      )
      menuViews.push(menuView)
    }
    return (
        <View style={styles.container}>
          <ScrollView
            onScroll={this.onScroll}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled >
            <View style={styles.menuContainer}>
              {menuViews}
            </View>
          </ScrollView>
          <PageControl
            style={styles.pageIndicator}
            numberOfPages={pageCount}
            currentPage={this.state.currentPage}
            pageIndicatorTintColor='grey'
            currentPageIndicatorTintColor={color.primary}/>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
  },
  title:{
    fontSize:15,
    color:'#eeeeee',
    margin:8,
  },
  itemView:{
    flexDirection:'row',
    flexWrap:'wrap',
    width:screen.width,
  },
  menuContainer: {
    flexDirection: 'row',
  },
  pageIndicator: {
    margin: 10,
  }
})
export default HomeMenuView
