'use strict';

var React  = require('react')
var assign = require('object-assign')
var EVENT_NAMES = require('react-event-names')
var getMenuOffset = require('../getMenuOffset')

var prepareChildren = require('./prepareChildren')
var Menu = require('../Menu')
var MenuItemCell = require('../MenuItemCell')

var emptyFn = function(){}

var MenuItem = React.createClass({

    displayName: 'ReactMenuItem',

    getInitialState: function() {
        return {}
    },

    getDefaultProps: function() {
        return {
            isMenuItem: true,
            interactionStyles: true,
            defaultStyle: {
                cursor: 'pointer',
                background: 'white'
            },
            defaultOverStyle: {
                background: 'rgb(118, 181, 231)',
                color: 'white'
            },
            defaultActiveStyle: {
                background: 'rgb(118, 181, 231)',
            },
            defaultExpandedStyle: {
                background: 'rgb(154, 196, 229)',
                color: 'white'
            },
            defaultDisabledStyle: {
                color: 'gray',
                cursor: 'default'
            },
            expander: '›'
        }
    },

    render: function() {
        var props = this.prepareProps(this.props, this.state)

        return <tr {...props} />
    },

    prepareProps: function(thisProps, state) {
        var props = {}

        assign(props, thisProps)

        props.mouseOver = !!state.mouseOver
        props.active    = !!state.active
        props.disabled    = !!props.disabled

        props.style     = this.prepareStyle(props)
        props.className = this.prepareClassName(props)

        props.children  = this.prepareChildren(props)

        props.onClick      = this.handleClick.bind(this, props)
        props.onMouseEnter = this.handleMouseEnter.bind(this, props)
        props.onMouseLeave = this.handleMouseLeave.bind(this, props)
        props.onMouseDown  = this.handleMouseDown
        props.onMouseMove  = this.handleMouseMove

        return props
    },

    handleClick: function(props, event) {

        if (props.disabled){
            event.stopPropagation()
            return
        }

        ;(this.props.onClick || this.props.fn || emptyFn)(props, props.index, event)
    },

    handleMouseMove: function(event){

    },

    handleMouseDown: function(event) {
        // event.preventDefault()

        var mouseUpListener = function(){
            this.setState({
                active: false
            })
            window.removeEventListener('mouseup', mouseUpListener)
        }.bind(this)

        window.addEventListener('mouseup', mouseUpListener)

        this.setState({
            active: true
        })
    },

    showMenu: function(menu, props) {

        props.showMenu(menu, offset)
    },

    handleMouseEnter: function(props, event) {

        if (props.disabled){
            return
        }

        var offset = {
            x: event.pageX,
            y: event.pageY
        }

        this.setState({
            mouseOver: true
        })

        if (props.onMenuItemMouseOver){

            var menuOffset

            if (props.menu){
                // console.log(props);
                menuOffset = getMenuOffset(this.getDOMNode())
            }

            // console.log(menuOffset, offset);
            props.onMenuItemMouseOver(props, menuOffset, offset)
        }
    },

    handleMouseLeave: function(props, event) {

        if (props.disabled){
            return
        }

        var offset = {
            x: event.pageX,
            y: event.pageY
        }

        if (this.isMounted()){
            this.setState({
                active: false,
                mouseOver: false
            })
        }

        if (props.onMenuItemMouseOut){
            props.onMenuItemMouseOut(props, offset)
        }
    },

    prepareChildren: prepareChildren,

    prepareClassName: function(props) {
        var className = props.className || ''

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
    },

    prepareStyle: function(props) {
        var style = {}

        assign(style, props.defaultStyle, props.style)

        if (props.disabled){

            assign(style, props.defaultDisabledStyle, props.disabledStyle)

        } else {

            if (props.interactionStyles){
                if (props.expanded){
                    assign(style, props.defaultExpandedStyle, props.expandedStyle)
                }

                if (props.mouseOver){
                    assign(style, props.defaultOverStyle, props.overStyle)
                }

                if (props.active){
                    assign(style, props.defaultActiveStyle, props.activeStyle)
                }
            }
        }

        return style
    }
})

module.exports = MenuItem