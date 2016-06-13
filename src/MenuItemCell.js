import React from 'react'
import Component from 'react-class'

export default class MenuItemCell extends Component {
  render() {
    const { props } = this
    let { children } = props

    if (props.expander) {
      children = props.expander === true ? '›' : props.expander
    }
    return <td {...props}>
      {children}
    </td>
  }
}
