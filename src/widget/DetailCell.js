import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, ViewPropTypes, StyleSheet,View,Image} from 'react-native'
import {Heading3,Paragraph} from './Text'
import Seporator from './Seporator'

type Props = {
  image?: any,
  title?: string,
  subtitle?: string,
  onPress?: Function,
  style?: ViewPropTypes.style,
}

class DetailCell extends PureComponent<Props> {
  render() {
    let {image,title,onPress,subtitle,style} = this.props
    let iconElement = image && (
      <Image style={styles.icon} source={image}/>
    )
    return (
        <TouchableOpacity
          onPress={onPress}>
          <View style={[styles.content, style]}>
            {iconElement}
            <Heading3 >{title}</Heading3>
            <View style={{flex:1}}/>
            <Paragraph style={{color:'#999999'}}>{subtitle}</Paragraph>
            <Image style={styles.arrow} source={require('../img/public/cell_arrow.png')}/>
          </View>
          <Seporator />
        </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  content:{
    backgroundColor:'white',
    height:44,
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:15,
    paddingRight:10,
  },
  icon:{
    width:25,
    height:25,
    marginRight:10,
  },
  arrow:{
    width:14,
    height:14,
    marginLeft:10,
  }
})
export default DetailCell
