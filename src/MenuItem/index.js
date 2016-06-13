import React from 'react'
import { findDOMNode } from 'react-dom'
import Component from 'react-class'

import assign from 'object-assign'
import normalize from 'react-style-normalizer'
import EVENT_NAMES from 'react-event-names'

import getMenuOffset from '../getMenuOffset'

import prepareChildren from './prepareChildren'

import Menu from '../Menu'
import MenuItemCell from '../MenuItemCell'

const emptyFn = () => {}

const toUpperFirst = s => {
  return s?
    s.charAt(0).toUpperCase() + s.substring(1):
    ''
}

class MenuItem extends Component {

    render() {
      const props = this.prepareProps(this.props, this.state)

      return <tr {...props} />
    }

    componentDidMount() {
      this.didMount = true
    }

    prepareProps(thisProps, state) {
        const props = assign({}, thisProps)

        props.mouseOver = !!state.mouseOver
        props.active = !!state.active
        props.disabled = !!props.disabled

        props.style = this.prepareStyle(props)
        props.className = this.prepareClassName(props)

        props.children = this.prepareChildren(props)

        props.onClick      = this.handleClick.bind(this, props)
        props.onMouseEnter = this.handleMouseEnter.bind(this, props)
        props.onMouseLeave = this.handleMouseLeave.bind(this, props)
        props.onMouseDown  = this.handleMouseDown
        props.onMouseMove  = this.handleMouseMove

        return props
    }

    handleClick(props, event) {

      if (props.disabled){
        event.stopPropagation()
        return
      }

      ;(this.props.onClick || this.props.fn || emptyFn)(event, props, props.index)
    }

    handleMouseMove(event){

    }

    handleMouseDown(event) {

      const mouseUpListener = () => {
        this.setState({
            active: false
        })
        global.removeEventListener('mouseup', mouseUpListener)
      }

      global.addEventListener('mouseup', mouseUpListener)

      this.setState({
        active: true
      })
    }

    showMenu(menu, props) {
      props.showMenu(menu, offset)
    }

    handleMouseEnter(props, event) {

      if (props.disabled){
        return
      }

      const offset = {
        x: event.pageX,
        y: event.pageY
      }

      this.setState({
        mouseOver: true
      })

      if (props.onMenuItemMouseOver){

        let menuOffset

        if (props.menu){
          // console.log(props);
          menuOffset = getMenuOffset(findDOMNode(this))
        }

        // console.log(menuOffset, offset);
        props.onMenuItemMouseOver(props, menuOffset, offset)
      }
    }

    handleMouseLeave(props, event) {
      if (props.disabled){
        return
      }

      const offset = {
        x: event.pageX,
        y: event.pageY
      }

      if (this.didMount){
        this.setState({
          active: false,
          mouseOver: false
        })
      }

      if (props.onMenuItemMouseOut){
        props.onMenuItemMouseOut(props, offset)
      }
    }

    prepareChildren(...args){
      return prepareChildren.apply(this, args)
    }

    prepareClassName(props) {
      let className = props.className || ''

      className += ' menu-row'

      if (props.disabled){
        className += ' disabled ' + (props.disabledClassName || '')
      } else {

        if (props.mouseOver){
          className += ' over ' + (props.overClassName || '')
        }

        if (props.active){
          className += ' active ' + (props.activeClassName || '')
        }

        if (props.expanded){
          className += ' expanded ' + (props.expandedClassName || '')
        }
      }

      return className
    }
}

MenuItem.defaultProps = {
  isMenuItem: true,
  interactionStyles: true,

  defaultStyle: {
      cursor    : 'pointer',
      userSelect: 'none',
      boxSizing : 'border-box'
  },

  expander: '›'
}

export default MenuItem
