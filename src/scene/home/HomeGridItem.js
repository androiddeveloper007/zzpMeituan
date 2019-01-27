import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, ViewPropTypes, StyleSheet, Image, View } from 'react-native'
import screen from '../../common/screen'
import color from '../../widget/color'
import {Heading2,Heading3} from '../../widget/Text'

//首页grid item视图

type Props = {
  info: Object,
  onPress?: Function,
}

class HomeGridItem extends PureComponent<Props> {
  render() {
    let {info,onPress} = this.props
    let title = info.maintitle
    let color = info.deputy_typeface_color
    let subtitle = info.deputytitle
    let imgurl = info.imageurl.replace('w.h','120.0')
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <View>
            <Heading2 style={{color:color,marginBottom:10}}>{title}</Heading2>
            <Heading3>{subtitle}</Heading3>
          </View>
          <View>
            <Image style={styles.icon} source={{uri:imgurl}}/>
          </View>
        </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:screen.width*0.5 - StyleSheet.hairlineWidth,
    height:screen.width/5,
    backgroundColor:'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: color.border,
  },
  text:{
    fontSize:15,
    color:'red',
    marginBottom:10,
  },
  text1:{
    fontSize:14,
    color:'#eeeeee',
  },
  icon:{
    width:screen.width/5,
    height:screen.width/5,
    margin:10,
  }
})
export default HomeGridItem
