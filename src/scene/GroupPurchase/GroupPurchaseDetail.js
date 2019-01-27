import {View, StyleSheet,Image, InteractionManager} from 'react-native'
import React, {PureComponent} from 'react'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import {Heading1,Heading2,Heading3,Paragraph} from '../../widget/Text'
import screen from '../../common/screen'
import color from '../../widget/color'
import Button from '../../widget/Button'
import Seporator from '../../widget/Seporator'
import NavigationItem from '../../widget/NavigationItem'
import HorizontalDivider from '../../widget/HorizontalDivider'
import GroupPurchaseCell from './GroupPurchaseCell'
import { recommendUrlWithId, groupPurchaseDetailWithId } from '../../mockData'

type Props = {
  info: Object,
  navigation: any,
}

type State = {
  data: Array<Object>,
  refreshState: number,
}

class GroupPurchaseDetail extends PureComponent<{}>{
  constructor(props:Object){
    super(props)
    // alert(JSON.stringify(this.props.navigation.state.params.info))
    this.state = {
      data:[],
      refreshState:RefreshState.Idle,
    }
  }
  static navigationOptions = ({navigation}) => ({
    headerTitle:'团购详情',
    headerTitleStyle:{ flex:1, textAlign:'center',},
    headerRight:(<NavigationItem
      icon={require('../../img/public/icon_navigation_item_share.png')}
      onPress={() =>{
        // alert('share')
      }}
      />)
  })
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.requestData()
    })
  }
  requestData = () => {
    this.requestRecommend()
  }
  requestRecommend = async () => {
    try {
      this.setState({ refreshState: RefreshState.HeaderRefreshing })
      let infoId = this.props.navigation.state.params.info.id
      let response = await fetch(recommendUrlWithId(infoId))
      let json = await response.json()
      // alert(JSON.stringify(json))
      let dataList = json.data.deals.map((info) => {
        return {
          id: info.id,
          imageUrl: info.imgurl,
          title: info.brandname,
          subtitle: `[${info.range}]${info.title}`,
          price: info.price
        }
      })
      this.setState({
        data: dataList,
        refreshState: RefreshState.NoMoreData,
      })
    } catch (e) {
      console.log('error:'+e)
      this.setState({
        refreshState: RefreshState.Failure,
      })
    }
  }
  keyExtractor = (item: Object, index: number) => {
    return item.id.toString()
  }
  renderHeader = () => {
    let info = this.props.navigation.state.params.info
    let imgurl = info.imageUrl.replace('w.h','480.0')
    return (
      <View>
        <View>
          <Image style={styles.banner} source={{uri:imgurl}}/>
          <View style={styles.topcontainer}>
            <Heading2 style={{color:color.primary,}}>￥</Heading2>
            <Heading1 style={{marginBottom:-8,}}>{info.price}</Heading1>
            <Paragraph style={{marginLeft:10,}}>门市价：￥{(info.price*2).toFixed(0)}</Paragraph>
            <View style={{flex:1}}/>
            <Button
              title='立即抢购'
              titleStyle={{color:'white',fontSize:18,}}
              onPress={this.purchaseButtonClk}
              style={styles.buybutton} />
          </View>
        </View>

        <Seporator />

        <View style={styles.tagcontainer}>
          <Image
            source={require('../../img/home/icon_deal_anytime_refund.png')}
            style={{width:20,height:20,}}/>
          <Paragraph style={{color:'#89B24F'}}> 随时退</Paragraph>
          <View style={{flex:1}}></View>
          <Paragraph>已售{(info.price*11).toFixed(0)}</Paragraph>
        </View>

        <HorizontalDivider />

        <View style={styles.tipHeader}>
          <Heading3>看了本团购的用户还看了</Heading3>
        </View>
      </View>
    )
  }
  renderCell = (rowData: any) => {
    return (
      <GroupPurchaseCell
        info={rowData.item}
        onPress={() =>
          // this.props.navigation.navigate('GroupPurchaseDetail', { info: rowData.item })
          // this.props.navigation.navigate('GroupPurchaseDetail',{info:info})
          alert(JSON.stringify(rowData.item))
        }
      />
    )
  }
  purchaseButtonClk = () => {
    alert('aaa')
  }
  render(){
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
        <RefreshListView
          data={this.state.data}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderCell}
          keyExtractor={this.keyExtractor}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.requestData}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  banner:{
    width:screen.width,
    height:screen.width/2,
    backgroundColor:'gray',
  },
  topcontainer:{
    padding:10,
    flexDirection:'row',
    alignItems:'flex-end',
  },
  tagcontainer:{
    flexDirection:'row',
    padding:10,
    alignItems:'center',
  },
  buybutton:{
    backgroundColor:'#fc9e28',
    width:94,
    height:36,
    borderRadius:7,
  },
  tipHeader: {
    height: 35,
    justifyContent: 'center',
    borderWidth: screen.onePixel,
    borderColor: color.border,
    paddingVertical: 8,
    paddingLeft: 20,
    backgroundColor: 'white'
  }
})
export default GroupPurchaseDetail
