'use strict';

var React         = require('react')
var assign        = require('object-assign')
var normalize     = require('react-style-normalizer')
var EVENT_NAMES   = require('react-event-names')

var getMenuOffset = require('../getMenuOffset')

var prepareChildren = require('./prepareChildren')

var Menu = require('../Menu')
var MenuItemCell = require('../MenuItemCell')

var emptyFn = function(){}

function toUpperFirst(s){
    return s?
            s.charAt(0).toUpperCase() + s.substring(1):
            ''
}

var THEME = {
    default: {
        // overStyle: {
        //     background: 'rgb(202, 223, 255)'
        // },
        overStyle: {
                    background: 'linear-gradient(to bottom, rgb(125, 191, 242) 0%, rgb(110, 184, 241) 50%, rgb(117, 188, 242) 100%)',
                    color: 'white'
                },
        activeStyle: {
            // background: 'rgb(118, 181, 231)',
            //-6 lightness from overStyle
            background: ' linear-gradient(to bottom, rgb(106,182,240) 0%,rgb(91,175,239) 50%,rgb(96,178,240) 100%)',
            color: 'white'
        },
        expandedStyle: {
            // background: 'rgb(215, 231, 255)',
            background: 'linear-gradient(to bottom, rgb(162,210,246) 0%,rgb(151,204,245) 50%,rgb(154,206,246) 100%)',
            color: 'white'
        },
        disabledStyle: {
            color : 'gray',
            cursor: 'default'
        }
    }
}

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
                cursor    : 'pointer',
                userSelect: 'none',
                boxSizing : 'border-box'
            },

            expander: '›'
        }
    },

    render: function() {
        var props = this.prepareProps(this.props, this.state)

        return React.createElement("tr", React.__spread({},  props))
    },

    prepareProps: function(thisProps, state) {
        var props = {}

        assign(props, thisProps)

        props.theme = this.prepareTheme(props)

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

    prepareTheme: function(props){
        var theme = props.theme

        if (typeof theme == 'string'){
            theme = THEME[theme]
        }

        return theme || THEME.default
    },

    handleClick: function(props, event) {

        if (props.disabled){
            event.stopPropagation()
            return
        }

        ;(this.props.onClick || this.props.fn || emptyFn)(event, props, props.index)
    },

    handleMouseMove: function(event){

    },

    handleMouseDown: function(event) {

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

    prepareDefaultStyle: function(props){
        var defaultStyle = assign({}, props.defaultStyle)

        if (props.disabled){
            assign(defaultStyle, props.defaultDisabledStyle)
        }

        return defaultStyle
    },

    prepareComputedStyleNames: function(props){
        var names = ['style']

        if (props.disabled){
            names.push('disabledStyle')

            return names
        }

        if (props.expanded){
            names.push('expandedStyle')
        }

        //names is something like ['style','expandedStyle']
        //
        //now we add over and active styles

        var overNames
        if (props.mouseOver){
            overNames = names.map(function(name){
                return 'over' + toUpperFirst(name)
            })
        }

        var activeNames
        if (props.active){
            activeNames = names.map(function(name){
                return 'active' + toUpperFirst(name)
            })
        }

        overNames   && names.push.apply(names, overNames)
        activeNames && names.push.apply(names, activeNames)

        return names
    },

    prepareStyle: function(props) {
        var style = assign({}, this.prepareDefaultStyle(props))

        var styleNames = this.prepareComputedStyleNames(props)
        var theme      = props.theme


        if (theme){
            //apply default theme first
            if (theme != THEME.default){
                styleNames.forEach(function(styleName){
                    assign(style, THEME.default[styleName])
                })
            }

            //then apply theme
            styleNames.forEach(function(styleName){
                assign(style, theme[styleName])
            })
        }

        ;(props.onThemeStyleReady || emptyFn)(style, props)

        //now apply non-theme
        styleNames.forEach(function(styleName){
            assign(style, props[styleName])
        })

        ;(props.onStyleReady || emptyFn)(style, props)

        return normalize(style)


        // assign(style, props.defaultStyle, props.style)

        // if (props.disabled){

        //     assign(style, props.defaultDisabledStyle, props.disabledStyle)

        // } else {

        //     if (props.interactionStyles){
        //         if (props.expanded){
        //             assign(style, props.defaultExpandedStyle, props.expandedStyle)
        //         }

        //         if (props.mouseOver){
        //             assign(style, props.defaultOverStyle, props.overStyle)
        //         }

        //         if (props.active){
        //             assign(style, props.defaultActiveStyle, props.activeStyle)
        //         }
        //     }
        // }

        // return normalize(style)
    }
})

MenuItem.theme = THEME
module.exports = MenuItem