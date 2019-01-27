import {Text, View,StyleSheet,TouchableOpacity,Image} from 'react-native'
import React, {PureComponent} from 'react'
import {Heading2,Heading3,Paragraph} from '../../widget/Text'
import screen from '../../common/screen'
import color from '../../widget/color'
import NearbyHeaderView from './NearbyHeaderView'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'
import { recommendUrl } from '../../mockData'

type Props = {
  types:Array<string>,
}

type States = {
  typeIndex: number,
  data: Array<Object>,
  refreshState: number,
}

class NearbyListScene extends PureComponent<{}>{

  constructor(props:Object){
    super(props)
    this.state = {
      typeIndex:0,
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
  renderHeader = () =>{
    return(
      <NearbyHeaderView
        titles={this.props.types}
        selectedIndex={this.state.typeIndex}
        onSelected={(index) => {
          if(index!=this.state.typeIndex){
            this.setState({typeIndex:index})
            this.requestFirstPage()
          }
        }}/>
    )
  }
  renderItem = (rowData: any) => {
    return (
      <GroupPurchaseCell
        info={rowData.item}
        onPress={() => {
          this.props.navigation.navigate('GroupPurchaseDetail', { info: rowData.item })
        }}
      />
    )
  }
  render(){
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
        <RefreshListView
          data={this.state.data}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.requestFirstPage}
          onFooterRefresh={this.onLoadMore}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({

})
export default NearbyListScene
