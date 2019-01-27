import {View, StyleSheet, WebView, InteractionManager,Text} from 'react-native'
import React, {PureComponent} from 'react'
import {TabNavigator,TabBarBottom} from 'react-navigation'

type Props = {
  navigation: any,
}

type State = {
  source: Object,
}

class WebScene extends PureComponent<{}>{
  static navigationOptions = ({navigation}:any) => ({
    // title:navigation.state.params.title,
    headerTitle:(
      <Text
        style={{flex:1,textAlign:'center',fontSize:16,color:'#222222',fontWeight:'bold',}}
        numberOfLines={1}>
        {navigation.state.params.title}
      </Text>
    ),
    headerRight:(<View/>)
  })
  constructor(props:Object){
    super(props)
    // alert('url '+this.props.navigation.state.params.url)
    this.state = {
      source: {}
    }
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(()=>{
      this.props.navigation.setParams({title:'加载中'})
      this.setState({ source: { uri: this.props.navigation.state.params.url } })
    })
  }
  onLoadEnd = (e) => {
    let title = e.nativeEvent.title
    if(title.length>0){
      this.props.navigation.setParams({title:title})
    }
  }
  render(){
    return (
      <View style={{flex:1,}}>
          <WebView
            style={{flex:1,}}
            source={{uri:this.props.navigation.state.params.url}}
            onLoadEnd={this.onLoadEnd}
           />
      </View>
    )
  }
}
const styles = StyleSheet.create({

})
export default WebScene
