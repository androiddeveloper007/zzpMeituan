import React, { PureComponent } from 'react'
import { TouchableOpacity, StyleSheet,View,Image} from 'react-native'
import {Heading3} from '../../widget/Text'
import screen from '../../common/screen'

type Props = {
  onPress?: Function,
  icon?: any,
  title?: string,
}

class OrderMenuItem extends PureComponent<Props> {
  render() {
    let {icon,title,onPress} = this.props
    return (
        <TouchableOpacity
          onPress={onPress}
          style={styles.content}>
          <Image source={icon} resizeMode='contain' style={styles.icon}/>
          <Heading3>{title}</Heading3>
        </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  content:{
    justifyContent:'center',
    alignItems:'center',
    width:screen.width/4,
    height:screen.width/5,
  },
  icon:{
    width:30,
    height:30,
    margin:5,
  }
})
export default OrderMenuItem
