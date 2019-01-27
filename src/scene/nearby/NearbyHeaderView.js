import {Text, View,StyleSheet,TouchableOpacity,Image} from 'react-native'
import React, {PureComponent} from 'react'
import {Heading2,Heading3,Paragraph} from '../../widget/Text'
import screen from '../../common/screen'
import color from '../../widget/color'

type Props = {
  titles:Array<string>,
  selectedIndex: number,
  onSelected: Function,
}

type States = {

}

class NearbyHeaderView extends PureComponent<{}>{
  render(){
    let {titles,onSelected,selectedIndex} = this.props
    return (
      <View style={styles.container}>
        {
          this.props.titles.map((text,index) =>(
            <TouchableOpacity
              key={index+''}
              onPress={() =>{
                onSelected(index)
              }}
              style={[styles.item,{backgroundColor:selectedIndex == index ? '#fe566d':'white'}]}>
              <Paragraph style={{color:selectedIndex==index ? 'white':'#555555'}}>{text}</Paragraph>
            </TouchableOpacity>
          ))
        }

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    flexWrap:'wrap',
  },
  item:{
    width:screen.width/4-10,
    marginLeft:8,
    marginTop:5,
    marginBottom:5,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:color.border,
  }
})
export default NearbyHeaderView
