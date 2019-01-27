import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, ViewPropTypes, StyleSheet, Image } from 'react-native'
type Props = {
  title?: string,
  titleStyle?: ViewPropTypes.style,
  onPress?: Function,
  icon?:any,
  iconStyle?:ViewPropTypes.style,
}
class NavigationItem extends PureComponent<Props> {
  render() {
    let {title,titleStyle,onPress,icon,iconStyle} = this.props
    let titleElement = title && (
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    )
    let iconElement = icon && (
      <Image style={[styles.icon, iconStyle]} source={icon} />
    )
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
          {titleElement}
          {iconElement}
        </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title:{
    fontSize:15,
    color:'#eeeeee',
    margin:8,
  },
  icon:{
    width:27,
    height:27,
    margin:8,
  }
})
export default NavigationItem
