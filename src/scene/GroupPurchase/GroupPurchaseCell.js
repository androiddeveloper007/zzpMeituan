import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, ViewPropTypes, StyleSheet, Image, View } from 'react-native'
import screen from '../../common/screen'
import color from '../../widget/color'
import {Heading2,Paragraph} from '../../widget/Text'

//团购cell item视图

type Props = {
  info?: Object,
  onPress?: Function,
}

class GroupPurchaseCell extends PureComponent<Props> {
  render() {
    let {info,onPress} = this.props
    let imgurl = info.imageUrl.replace('w.h','160.0')
    return (
        <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
          <Image style={styles.icon} source={{uri:imgurl}}/>
          <View style={styles.rightContainer}>
            <Heading2>{info.title}</Heading2>
            <Paragraph numberOfLines={0} style={{marginTop:8}}>{info.subtitle}</Paragraph>
            <View style={{flex:1,justifyContent:'flex-end',}}>
              <Heading2 style={styles.price}>{info.price}元</Heading2>
            </View>
          </View>
        </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    padding:10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor:color.border,
    backgroundColor:'white',
  },
  icon:{
    width:80,
    height:80,
    borderRadius:5,
    backgroundColor:color.primary,
  },
  rightContainer:{
    flex:1,
    paddingLeft:20,
    paddingRight:10,
  },
  price:{
    color:color.primary,

  }
})
export default GroupPurchaseCell
