import {Text, View,StyleSheet,TouchableOpacity,Image} from 'react-native'
import React, {PureComponent} from 'react'
import {Heading2,Heading3,Paragraph} from '../../widget/Text'
import screen from '../../common/screen'
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'
import color from '../../widget/color'
import NearbyListScene from './NearbyListScene'

class NearbyScene extends PureComponent<{}>{
  static navigationOptions = () => ({
    headerLeft : (
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',padding:10}}>
        <Image
          style={{width:13,height:16,marginRight:5,}}
          source={require('../../img/public/icon_food_merchant_address.png')}/>
        <Heading2>深圳</Heading2>
      </TouchableOpacity>
    ),
    headerTitle:(
      <TouchableOpacity style={styles.searchBar}>
        <Image
          source={require('../../img/home/search_icon.png')}
          style={styles.searchIcon} />
        <Paragraph>找附近吃喝玩乐</Paragraph>
      </TouchableOpacity>
    )
  })
  render(){
    let titles = ['享美食','住酒店','爱玩乐','全部']
    let types = [
      ['热门', '面包甜点', '小吃快餐', '川菜', '日本料理', '韩国料理', '台湾菜', '东北菜'],
      ['热门', '商务出行', '公寓民宿', '情侣专享', '高星特惠'],
      ['热门', 'KTV', '足疗按摩', '洗浴汗蒸', '电影院', '美发', '美甲'],
      []
    ]
    return (
      <ScrollableTabView
        style={styles.container}
        tabBarBackgroundColor='white'
        tabBarActiveTextColor='#fe566d'
        tabBarInactiveTextColor='#555555'
        tabBarTextStyle={styles.tabbartext}
        tabBarUnderlineStyle={styles.tabbarunderline}>
        {
          titles.map((title,index) => (
            <NearbyListScene
              tabLabel={title}
              key={index+''}
              types={types[index]}
              navigation={this.props.navigation}
            />
          ))
        }
      </ScrollableTabView>
    )
  }
}
const styles = StyleSheet.create({
  searchBar:{
    // flex:1,
    width:screen.width*0.75,
    marginLeft:10,
    height:34,
    borderRadius:19,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#eeeeee',
    marginRight:30,
  },
  searchIcon:{
    width:20,
    height:20,
    margin:10,
  },
  container:{
    flex:1,
    backgroundColor:color.paper,
  },
  tabbartext:{
    fontSize:14,
    marginTop:13,
  },
  tabbarunderline:{
    backgroundColor:'#fe566d'
  }
})
export default NearbyScene
