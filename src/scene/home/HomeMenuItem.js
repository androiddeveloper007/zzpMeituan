import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, ViewPropTypes, StyleSheet, Image } from 'react-native'
import screen from '../../common/screen'
//首页swiper item视图
type Props = {
  title: string,
  icon: any,
  onPress: Function,
  titleStyle?: ViewPropTypes.style,
  iconStyle?:ViewPropTypes.style,
}
class HomeMenuItem extends PureComponent<Props> {
  render() {
    let {title,onPress,icon,titleStyle,iconStyle} = this.props
    let titleElement = title && (
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    )
    let iconElement = icon && (
      <Image style={[styles.icon, iconStyle]} source={icon} />
    )
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <Image source={icon} style={styles.icon}/>
          <Text>{title}</Text>
        </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    width:screen.width*0.2,
    height:screen.width*0.2,
  },
  title:{
    fontSize:15,
    color:'#eeeeee',
    margin:8,
  },
  icon:{
    width:screen.width/9,
    height:screen.width/9,
    margin:5,
  }
})
export default HomeMenuItem
