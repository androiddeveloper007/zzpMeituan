import React, {PureComponent} from 'react'
import { StatusBar } from 'react-native'
import {Text, View,StyleSheet} from 'react-native'
import {createBottomTabNavigator,createStackNavigator,TabBarBottom,createAppContainer}
from 'react-navigation'
import HomeScene from './scene/home/HomeScene'
import NearbyScene from './scene/nearby/NearbyScene'
import OrderScene from './scene/order/OrderScene'
import MineScene from './scene/mine/MineScene'
import TabBarItem from './widget/TabBarItem'
import WebScene from './scene/web/WebScene'
import color from './widget/color'
import GroupPurchaseDetail from './scene/GroupPurchase/GroupPurchaseDetail'
import codePush from 'react-native-code-push'

const lightContentScenes = ['Home', 'Mine']
function getCurrentRouteName(navigationState: any) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentRouteName(route)
  }
  return route.routeName
}
class RootScene extends PureComponent<{}>{
  constructor() {
    super()
    StatusBar.setBarStyle('light-content')
    // alert('热更新成功1')
  }
  render(){
    return (
      <AppContainer onNavigationStateChange={
        (prevState, currentState) => {
          const currentScene = getCurrentRouteName(currentState)
          const previousScene = getCurrentRouteName(prevState)
          if (previousScene !== currentScene) {
            if (lightContentScenes.indexOf(currentScene) >= 0) {
              StatusBar.setBarStyle('light-content')
            } else {
              StatusBar.setBarStyle('dark-content')
            }
          }
        }
      }/>
    )
  }
}

const Tab = createBottomTabNavigator({
  Home: {
    screen: createStackNavigator({ Home: HomeScene }),
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '首页',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={require('./img/tabbar/tabbar_homepage.png')}
          selectedImage={require('./img/tabbar/tabbar_homepage_selected.png')}
        />
      )
    }),
  },
  Nearby:{
    screen:createStackNavigator({Nearby:NearbyScene}),
    navigationOptions:({ navigation })=>({
      tabBarLabel:"附近",
      tabBarIcon:({focused,tintColor})=>(
        <TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={require('./img/tabbar/tabbar_merchant.png')}
          selectedImage={require('./img/tabbar/tabbar_merchant_selected.png')}
        />
      )
    }),
  },
  Order:{
    screen:createStackNavigator({Order:OrderScene}),
    navigationOptions:({ navigation })=>({
      tabBarLabel:"订单",
      tabBarIcon:({focused,tintColor})=>(
        <TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={require('./img/tabbar/tabbar_order.png')}
          selectedImage={require('./img/tabbar/tabbar_order_selected.png')}
        />
      )
    }),
  },
  Mine:{
    screen:createStackNavigator({Mine:MineScene}),
    navigationOptions:({ navigation })=>({
      tabBarLabel:"我的",
      tabBarIcon:({focused,tintColor})=>(
        <TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={require('./img/tabbar/tabbar_mine.png')}
          selectedImage={require('./img/tabbar/tabbar_mine_selected.png')}
        />
      )
    }),
  },
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition:'bottom',
    lazy:true,
    animationEnabled:false,
    swipeEnabled:true,
    tabBarOptions: {
      activeTintColor: color.primary,
      inactiveTintColor: color.gray,
      style: { backgroundColor: '#ffffff' },
    }
  }
)

Tab.navigationOptions = {
  header : null
}

const AppNavigator = createStackNavigator(
  {
    Tab: { screen: Tab },
    Web: {screen: WebScene},
    GroupPurchaseDetail: {screen: GroupPurchaseDetail}
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      showIcon: true,
    },
  }
)

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({

})
export default codePush(RootScene)
//热更新使用codePush
