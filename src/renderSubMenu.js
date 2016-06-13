import React from 'react'
import assign from 'object-assign'

import getPositionStyle from './getSubMenuPositionStyle'

const cloneElement = React.cloneElement

export default function (props, state) {
  let menu = state.menu

  if (menu && this.didMount){
    const style = getPositionStyle.call(this, props, state)

    menu = cloneElement(menu, assign({
      ref: 'subMenu',
      subMenu: true,
      parentMenu: this,
      maxHeight: state.subMenuMaxHeight,
      onActivate: this.onSubMenuActivate,
      onInactivate: this.onSubMenuInactivate,
      scrollerProps: props.scrollerProps,
      constrainTo: props.constrainTo,
      expander: props.expander
    }, props.itemStyleProps))

    return <div ref="subMenuWrap" style={style}
      onMouseEnter={this.handleSubMenuMouseEnter}
      onMouseLeave={this.handleSubMenuMouseLeave}
    >{menu}</div>
  }
}
