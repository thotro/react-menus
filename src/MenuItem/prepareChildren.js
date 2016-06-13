'use strict';

import React from 'react'
import Menu from '../Menu'
import MenuItemCell from '../MenuItemCell'
import renderCell from './renderCell'

const cloneElement = React.cloneElement

export default (props) => {

  var children = []
  var menu

  React.Children.forEach(props.children, function(child){
    if (child){
      if (child.props && child.props.isMenu){
        menu = cloneElement(child, {
            ref: 'subMenu',
            subMenu: true
        })
        return
      }

      if (typeof child != 'string'){
        child = cloneElement(child, {
            style    : props.cellStyle,
            itemIndex: props.itemIndex,
            itemCount: props.itemCount
        })
      }

      children.push(child)
    }
  })

  if (menu) {
    props.menu = menu

    var expander = props.expander || true
    var expanderProps = {}

    if (expander){
        expanderProps.onClick = props.onExpanderClick
    }
    children.push(<MenuItemCell expander={expander} {...expanderProps}/>)
  }

  return children
}
