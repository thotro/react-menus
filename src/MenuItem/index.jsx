'use strict';

var React  = require('react')
var assign = require('object-assign')
var Region = require('region')
var selectParent = require('select-parent')

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
            defaultStyle: {
                cursor: 'pointer',
                background: 'white'
            },
            defaultOverStyle: {
                background: '#d7e7ff'
            },
            defaultActiveStyle: {
                background: 'rgb(187, 212, 251)'
            },
            defaultExpandedStyle: {
                background: 'rgb(230, 240, 255)'
            }
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

        props.style     = this.prepareStyle(props)
        props.className = this.prepareClassName(props)

        props.children  = this.prepareChildren(props)

        props.onClick      = this.handleClick
        props.onMouseEnter = this.handleMouseEnter.bind(this, props)
        props.onMouseLeave = this.handleMouseLeave.bind(this, props)
        props.onMouseDown  = this.handleMouseDown
        props.onMouseMove  = this.handleMouseMove

        return props
    },

    handleClick: function(event) {
        debugger
        ;(this.props.onClick || emptyFn)(this.props, this.props.index, event)
    },

    handleMouseMove: function(event){

    },

    handleMouseDown: function(event) {
        event.preventDefault()

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
                var menuRegion = Region.from(selectParent('.z-menu', this.getDOMNode()))
                var thisRegion = Region.from(this.getDOMNode())

                menuOffset = {
                    x: menuRegion.width,
                    y : thisRegion.top - menuRegion.top
                }
            }

            props.onMenuItemMouseOver(props, menuOffset, offset)
        }
    },

    handleMouseLeave: function(props, event) {

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

        if (props.mouseOver){
            className += ' over ' + (props.overClassName || '')
        }

        if (props.active){
            className += ' active ' + (props.activeClassName || '')
        }

        if (props.expanded){
            className += ' expanded ' + (props.expandedClassName || '')
        }

        return className
    },

    prepareStyle: function(props) {
        var style = {}

        assign(style, props.defaultStyle, props.style)

        if (props.expanded){
            assign(style, props.defaultExpandedStyle, props.expandedStyle)
        }

        if (props.mouseOver){
            assign(style, props.defaultOverStyle, props.overStyle)
        }

        if (props.active){
            assign(style, props.defaultActiveStyle, props.activeStyle)
        }

        return style
    }
})

module.exports = MenuItem