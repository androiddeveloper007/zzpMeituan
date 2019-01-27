import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native'
import HomeGridItem from './HomeGridItem'
import color from '../../widget/color'

type Props = {
  infos: Array<Object>,
  onGridSelected: Function,
}

type State = {

}

class HomeGridView extends PureComponent<Props> {
  render() {
    let { infos, onGridSelected} = this.props
    return (
      <View style={styles.gridContainer}>
        {
          infos.map((info,index) => (
          <HomeGridItem
            key={index}
            info={info}
            onPress={()=>{
              onGridSelected(index)
            }}
           />
        ))
      }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  gridContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: color.border,
  },
})
export default HomeGridView
