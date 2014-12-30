'use strict';

var React  = require('react')
var assign = require('object-assign')
var Region = require('region')
var selectParent = require('select-parent')
var MenuItemCell = require('./MenuItemCell')

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
                cursor: 'pointer'
            },
            defaultOverStyle: {
                background: '#d7e7ff'
            },
            defaultActiveStyle: {
                background: 'rgb(187, 212, 251)'
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

        if (!props.children){
            props.children = props.columns.map(this.renderCell.bind(this, props))
        } else {
            props.children  = this.prepareChildren(props)
        }

        props.onClick     = this.handleClick
        props.onMouseEnter = this.handleMouseEnter.bind(this, props)
        props.onMouseLeave  = this.handleMouseLeave.bind(this, props)
        props.onMouseDown = this.handleMouseDown
        props.onMouseMove = this.handleMouseMove

        return props
    },

    handleClick: function(event) {
        ;(this.props.onClick || emptyFn)(event)
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

    tryHandleMouseOver: function(props, event){

        // console.log('MOUSE OVER')

        // this.setState({
        //     tryMouseOver: true
        // })



        // setTimeout(function(){
        //     if (this.state.tryMouseOver && !this.state.mouseOver && this.isMounted()){
                this.handleMouseOver(props, offset)
            // }
        // }.bind(this), 0)

    },

    tryHandleMouseOut: function(props, event){

        // this.setState({
        //     tryMouseOver: false
        // })

        var offset = {
            x: event.pageX,
            y: event.pageY
        }

        // setTimeout(function(){
        //     if (!this.state.tryMouseOver && this.state.mouseOver){
                this.handleMouseOut(props, offset)
        //     }
        // }.bind(this), 0)

    },

    renderCell: function(props, column) {
        var style = assign({}, props.defaultCellStyle, props.cellStyle)

        return <MenuItemCell style={style}>{props.data[column]}</MenuItemCell>
    },

    prepareChildren: function(props) {

        var children = []
        var menu

        React.Children.forEach(props.children, function(child){
            if (child.props.isMenu){
                menu = child
                menu.props.subMenu = true
                return
            }

            children.push(child)
        })

        if (menu){
            // if (menu.isMounted()){
            //     debugger
            // }
            props.menu = menu
            children.push(<MenuItemCell expander={true}/>)
        }

        return children
    },

    prepareClassName: function(props) {
        var className = props.className || ''

        className += ' menu-row'

        if (props.mouseOver){
            className += ' over ' + (props.overClassName || '')
        }

        if (props.active){
            className += ' active ' + (props.activeClassName || '')
        }

        return className
    },

    prepareStyle: function(props) {
        var style = {}

        assign(style, props.defaultStyle, props.style)

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