import {Text, View,StyleSheet} from 'react-native'
import React, {PureComponent} from 'react'
import {TabNavigator,TabBarBottom} from 'react-navigation'
import color from '../../widget/color'
import DetailCell from '../../widget/DetailCell'
import OrderMenuItem from './OrderMenuItem'
import Seporator from '../../widget/Seporator'
import HorizontalDivider from '../../widget/HorizontalDivider'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'
import { recommendUrl } from '../../mockData'

type States = {
  data: Array<Object>,
  refreshState: number,
}

class OrderScene extends PureComponent<{}>{
  static navigationOptions = ({navigation}) => ({
    headerTitle:(
      <Text style = {{flex:1,textAlign:'center',fontSize: 16,color:color.title,fontWeight:'bold'}}>订单</Text>
    ),
    headerStyle:{
      backgroundColor: color.paper,
    }
  })
  constructor(props:Object){
    super(props)
    this.state = {
      data: [],
      refreshState: RefreshState.Idle,
    }
  }
  componentDidMount(){
    this.requestFirstPage()
  }
  requestData = async() =>{
    let response = await fetch(recommendUrl)
    let json = await response.json()
    // alert(JSON.stringify(json))
    let dataList = json.data.map((info) => {
      return {
        id: info.id,
        imageUrl: info.squareimgurl,
        title: info.mname,
        subtitle: `[${info.range}]${info.title}`,
        price: info.price
      }
    })
    // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
    dataList.sort(() => { return 0.5 - Math.random() })
    return dataList
  }
  requestFirstPage = async() => {
    try {
      let dataList = await this.requestData()
      this.setState({
        data: dataList,
        refreshState: RefreshState.Idle,
      })
    } catch (e) {
      this.setState({
        refreshState: RefreshState.Failure,
      })
    }
  }
  //加载下一页
  onLoadMore = async() => {
    try {
      this.setState({refreshState: RefreshState.FooterRefreshing})
      let dataList = await this.requestData()
      this.setState({
        data: [...this.state.data, ...dataList],
        refreshState: this.state.data.length>80 ? RefreshState.NoMoreData:RefreshState.Idle,
      })
    } catch (e) {
      this.setState({
        refreshState: RefreshState.Failure,
      })
    }
  }
  rendHeader = () => {
    return(
      <View style={styles.container}>
        <DetailCell
          title='我的订单'
          subtitle='全部订单'
          style={{height:38}} />
        <Seporator />
        <View style={styles.itemContainer}>
          <OrderMenuItem
            title='待付款'
            icon={require('../../img/order/order_tab_need_pay.png')}/>
          <OrderMenuItem
            title='待使用'
            icon={require('../../img/order/order_tab_need_use.png')}/>
          <OrderMenuItem
            title='待评价'
            icon={require('../../img/order/order_tab_need_review.png')}/>
          <OrderMenuItem
            title='退款/售后'
            icon={require('../../img/order/order_tab_needoffer_aftersale.png')}/>
        </View>

        <HorizontalDivider dividerstyle={{height:15,backgroundColor:color.paper}}/>

        <DetailCell
          title='我的收藏'
          subtitle='全部收藏'
          style={{height:38}} />

      </View>
    )
  }
  renderItem = (rowData: any) => {
    return (
      <GroupPurchaseCell
        info={rowData.item}
        onPress={() => {
          this.props.navigation.navigate('GroupPurchase', { info: rowData.item })
        }}
      />
    )
  }
  render(){
    return (
      <RefreshListView
        style={styles.container}
        data={this.state.data}
        ListHeaderComponent={this.rendHeader}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshState={this.state.refreshState}
        onHeaderRefresh={this.requestFirstPage}
        onFooterRefresh={this.onLoadMore}
      />
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  itemContainer:{
    flexDirection:'row',
    backgroundColor:'white',
  }
})
export default OrderScene
