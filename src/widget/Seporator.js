import React, { PureComponent } from 'react'
import { View,StyleSheet } from 'react-native'
import color from './color'
import screen from '../common/screen'

class Seporator extends PureComponent<Props> {
  render() {
    return (
        <View style={styles.line}/>
    )
  }
}
const styles = StyleSheet.create({
  line:{
    width:screen.width,
    height:StyleSheet.hairlineWidth,
    backgroundColor:color.border
  }
})
export default Seporator
