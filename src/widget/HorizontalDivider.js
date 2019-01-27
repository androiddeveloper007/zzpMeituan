import React, { PureComponent } from 'react'
import { ViewPropTypes, View,} from 'react-native'
import color from './color'
type Props = {
  dividerstyle?: ViewPropTypes.style,
}
class HorizontalDivider extends PureComponent<Props> {
  render() {
    let {dividerstyle} = this.props
    return (
      <View style={dividerstyle}/>
    )
  }
}
export default HorizontalDivider
