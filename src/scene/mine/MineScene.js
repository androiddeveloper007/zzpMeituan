import {Text, View,StyleSheet,ScrollView,Image,RefreshControl} from 'react-native'
import React, {PureComponent} from 'react'
import {TabNavigator,TabBarBottom} from 'react-navigation'
import NavigationItem from '../../widget/NavigationItem'
import color from '../../widget/color'
import screen from '../../common/screen'
import {Heading2,Paragraph} from '../../widget/Text'
import HorizontalDivider from '../../widget/HorizontalDivider'
import DetailCell from '../../widget/DetailCell'

type States = {
  refreshing:boolean,
}

class MineScene extends PureComponent<{}>{
  static navigationOptions = ({navigation}) => ({
    headerTitle:(
      <Text
        style = {{flex:1,textAlign:'center',fontSize: 16,color:'white',fontWeight:'bold'}}
        >
        订单
      </Text>
    ),
    headerLeft:(
        <NavigationItem
          icon={require('../../img/mine/icon_navigation_item_set_white.png')}
          onPress={() => {
            // alert('aaa')
          }} style={{marginLeft:15}}/>
    ),
    headerRight:(
        <NavigationItem
          icon={require('../../img/mine/icon_navigation_item_message_white.png')}
          onPress={() => {
            // alert('aaa')
          }} style={{marginRight:5}}/>
    ),
    headerStyle:{
      backgroundColor: color.primary,
      elevation:0,/*适用于android中，消除标题栏底部横线*/
      borderBottomWidth:0,/*适用于ios中，消除标题栏底部横线*/
    }
  })
  constructor(props:Object){
    super(props)
    this.state = {
      refreshing: false,
    }
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Image source={require('../../img/mine/avatar.png')} style={styles.avatar}/>
        <View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Heading2 style={{color:'white'}}>小熊维尼</Heading2>
            <Image source={require('../../img/mine/beauty_technician_v15.png')}/>
          </View>
          <Paragraph style={{color:'white',marginTop:10}}>个人信息</Paragraph>
        </View>
      </View>
    )
  }
  renderCells = () =>{
    let cells = []
    let menuList = this.getMenuList()
    for(let i=0;i<menuList.length;i++){
      let subList = menuList[i]
      for(let j=0;j<subList.length;j++){
        let item = subList[j]
        let cell = (
          <DetailCell
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
          />
        )
        cells.push(cell)
      }
      cells.push(<HorizontalDivider key={i} dividerstyle={{height:14,backgroundColor:color.paper}}/>)
    }
    return(
      <View>
        {cells}
      </View>
    )
  }
  getMenuList = () =>{
    return(
      [
        [
          { title: '我的钱包', subtitle: '办信用卡', image: require('../../img/mine/icon_mine_wallet.png')},
          { title: '余额', subtitle: '￥95872385', image: require('../../img/mine/icon_mine_balance.png')},
          { title: '抵用券', subtitle: '63', image: require('../../img/mine/icon_mine_voucher.png')},
          { title: '会员卡', subtitle: '2', image: require('../../img/mine/icon_mine_membercard.png')}
        ],
        [
          { title: '好友去哪', image: require('../../img/mine/icon_mine_friends.png')},
          { title: '我的评价', image: require('../../img/mine/icon_mine_comment.png')},
          { title: '我的收藏', image: require('../../img/mine/icon_mine_collection.png')},
          { title: '会员中心', subtitle: 'v15', image: require('../../img/mine/icon_mine_membercenter.png')},
          { title: '积分商城', subtitle: '好礼已上线', image: require('../../img/mine/icon_mine_member.png')}
        ],
        [
          { title: '客服中心', image: require('../../img/mine/icon_mine_customerService.png')},
          { title: '关于美团', subtitle: '我要合作', image: require('../../img/mine/icon_mine_aboutmeituan.png')}
        ]
      ]
    )
  }
  render(){
    return (
      <View style={{flex:1, backgroundColor:color.paper}}>
          <View style={styles.headerBg}/>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                omRefresh={this.onHeadRefresh}
                tintColor='white' />
            }
          >
            {this.renderHeader()}
            <HorizontalDivider style={{height:14,backgroundColor:color.paper}} />
            {this.renderCells()}
          </ScrollView>
      </View>
    )
  }
  onHeadRefresh = () =>{
    this.setState({refreshing:true})
    setTimeOut(()=>{
      this.setState({refreshing:false})
    },2000)
  }
}
const styles = StyleSheet.create({
  header:{
    backgroundColor:color.primary,
    paddingBottom:20,
    flexDirection:'row',
    alignItems:'center',
    padding:10,
  },
  avatar:{
    width:50,
    height:50,
    marginRight:10,
    borderRadius:25,
    borderWidth:2,
    borderColor:'#51d3c6',
  },
  headerBg:{
    position:'absolute',
    width:screen.width,
    height:screen.width/4,
    backgroundColor:color.primary,
  }
})
export default MineScene
