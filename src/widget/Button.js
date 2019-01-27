import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, ViewPropTypes, StyleSheet} from 'react-native'
type Props = {
  onPress?: Function,
  disable: boolean,
  style?: ViewPropTypes.style,
  title?: string,
  titleStyle?: ViewPropTypes.style,
  activeOpacity: number,
}
class Button extends PureComponent<Props> {
  static defaultProps = {
    disable:false,
    activeOpacity:0.8,
  }
  render() {
    let {onPress,disable,style,title,titleStyle,activeOpacity} = this.props
    return (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.container,style]}
          disabled={disable}
          activeOpacity={activeOpacity} >
          <Text style={titleStyle}>{title}</Text>
        </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
  }
})
export default Button
