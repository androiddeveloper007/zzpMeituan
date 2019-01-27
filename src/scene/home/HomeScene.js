import {Text, View, StyleSheet, TouchableOpacity, Image,FlatList} from 'react-native'
import React, {PureComponent} from 'react'
import {TabNavigator, TabBarBottom} from 'react-navigation'
import color from '../../widget/color'
import NavigationItem from '../../widget/NavigationItem'
import { menuInfo,discount,recommendUrl } from '../../mockData'
import HomeMenuView from './HomeMenuView'
import screen from '../../common/screen'
import HomeGridView from './HomeGridView'
import HorizontalDivider from '../../widget/HorizontalDivider'
import {Heading3} from '../../widget/Text'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'

type State = {
  discounts : Array<Object>,
  recommendDataList: Array<Object>,
  isRefresh: boolean,
}

class HomeScene extends PureComponent < {} > {
  constructor(props: Object){
    super(props)
    this.state = {
      discounts: [],
      recommendDataList:[],
      isRefresh:false,
    }
  }

  componentDidMount() {
      this.requestData()
  }

  static navigationOptions = () => ({
    headerStyle: {
      backgroundColor: color.primary,
    },
    headerTitle: (
      <TouchableOpacity style = {styles.searchBar}>
        <Image source = {require('../../img/home/search_icon.png')} style = {styles.searchIcon}/>
        <Text style = {{fontSize: 12}}>搜索</Text>
      </TouchableOpacity >
    ),
    headerLeft: (
      <NavigationItem
        title = '深圳'
        titleStyle = {{color: 'white',}}
        // onPress = {() => {alert('aaa')}}
      />
    ),
    headerRight: (
      <NavigationItem
        icon = {require('../../img//mine/icon_navigation_item_message_white.png')}
        // onPress = {() => {alert('aaa')}}
      />
    )
  })
  requestData = async()=> {
    this.requestDiscount()
    this.requesetRecommend()
  }
  requestDiscount = async()=>{
    try{
      let json = discount
      this.setState({discounts: json.data})
    } catch(error){
      console.log(error)
    }
  }
  requesetRecommend = async()=>{
    this.setState({isRefresh:true})
    try{
      let response = await fetch(recommendUrl)
      let json = await response.json()
      let recommendDataList = json.data.map((info) => ({
        id:info.id,
        imageUrl:info.squareimgurl,
        title:info.mname,
        subtitle:`[${info.range}]${info.title}`,
        price:info.price,
      }))
      //由于第二个item图片错误，过滤掉
      recommendDataList.splice(1,1)
      this.setState({recommendDataList: recommendDataList,isRefresh:false})
    } catch(error){
      console.log('error:'+error)
      this.setState({isRefresh:false})
    }
  }
//这里注意，要使用箭头函数，因为用常规函数可能无法绑定上下文
  onGridSelected = (index) => {
    let discountItem = this.state.discounts[index]
    if(discountItem.type == 1){
      let location = discountItem.tplurl.indexOf('http')
      let url = discountItem.tplurl.slice(location)
      this.props.navigation.navigate('Web', {url:url})
    }
  }
  renderHeader = () =>{
    return (
      <View>
          <HomeMenuView
            menuInfos = {menuInfo}
            onMenuSelected = {(index) => {
              // alert("index:"+index)
            }}/>
          <HorizontalDivider dividerstyle={{height:14,backgroundColor:color.paper}}/>
          <HomeGridView infos={this.state.discounts} onGridSelected={this.onGridSelected}/>
          <HorizontalDivider dividerstyle={{height:14,backgroundColor:color.paper}}/>
          <View style={styles.recommondHeader}>
            <Heading3>猜你喜欢</Heading3>
          </View>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container} >
          <FlatList
            ListHeaderComponent={() => this.renderHeader()}
            data={this.state.recommendDataList}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index+''}
            onRefresh={this.requestData}
            refreshing={this.state.isRefresh}
          />
      </View>
    )
  }
  renderItem = (rowData:Object) => {
    return(
      <GroupPurchaseCell
        info={rowData.item}
        onPress={this.onCellClicked}
      />
    )
  }
  onCellClicked = (info) => {
    // alert(JSON.stringify(info))
    this.props.navigation.navigate('GroupPurchaseDetail',{info:info})
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: color.paper
  },
  searchBar: {
    flex:1,
    // width: screen.width * 0.5,
    marginLeft:10,
    marginRight:10,
    height: 30,
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    margin: 5,
  },
  recommondHeader:{
    height:35,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:color.border,
    paddingVertical:8,
    paddingLeft:20,
    backgroundColor:'white',
  }
})
export default HomeScene
