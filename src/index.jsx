'use strict';

var React      = require('react')
var assign     = require('object-assign')
var Region     = require('region')
var inTriangle = require('point-in-triangle')

var MenuItem      = require('./MenuItem')
var MenuItemCell  = require('./MenuItemCell')
var MenuSeparator = require('./MenuSeparator')

var renderSubMenu  = require('./renderSubMenu')
var renderItem     = require('./renderItem')
var renderChildren = require('./renderChildren')

var propTypes = require('./propTypes')

function emptyFn(){}

var MenuClass = React.createClass({

    displayName: 'Menu',

    propTypes: propTypes,

    getDefaultProps: function(){

        return {
            isMenu: true,
            defaultStyle: {
                border  : '1px solid gray',
                display : 'inline-block',
                position: 'relative'
            },
            defaultSubMenuStyle: {
                position: 'absolute'
            },
            columns: ['label'],
            items: null
        }
    },

    getInitialState: function() {
        return {
            mouseOver: false
        }
    },

    componentDidMount: function() {
        ;(this.props.onMount || emptyFn)(this)
    },

    prepareProps: function(thisProps) {
        var props = {}

        assign(props, this.props)

        props.style     = this.prepareStyle(props)
        props.className = this.prepareClassName(props)

        return props
    },

    prepareClassName: function(props) {
        var className = props.className || ''

        className += ' z-menu'

        return className
    },

    prepareStyle: function(props) {
        var subMenuStyle = props.subMenu?
                            props.defaultSubMenuStyle:
                            null

        return assign({}, props.defaultStyle, subMenuStyle, props.style)
    },

    /////////////// RENDERING LOGIC

    renderSubMenu: renderSubMenu,

    render: function() {
        var props = this.prepareProps(this.props)
        var state = this.state

        var children = props.items?
                            this.renderItems(props):
                            this.renderChildren(props, state)

        var menu = this.renderSubMenu(props, state)

        return (
            <div {...props}>
                {menu}
                <table ref="table"
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                >
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        )
    },

    renderItems: function(props){
        return props.items.map(this.renderItem.bind(this, props, this.state))
    },

    renderItem: renderItem,

    renderChildren: renderChildren,

    ////////////////////////// BEHAVIOUR LOGIC

    handleMouseEnter: function() {
        this.setState({
            mouseInside: true
        })

        this.onActivate()
    },

    handleMouseLeave: function() {
        this.setState({
            mouseInside: false
        })

        if (!this.state.menu && !this.state.nextMenu){
            this.onInactivate()
        }
    },

    onActivate: function() {
        if (!this.state.activated){
            // console.log('activated')
            this.setState({
                activated: true
            })

            ;(this.props.onActivate || emptyFn)()
        }
    },

    onInactivate: function() {

        if (this.state.activated){
            // console.log('inactivated')

            this.setState({
                activated: false
            })

            ;(this.props.onInactivate || emptyFn)()
        }
    },

    //we also need mouseOverSubMenu: Boolean
    //since when from a submenu we move back to a parent menu, we may move
    //to a different menu item than the one that triggered the submenu
    //so we should display another submenu
    handleSubMenuMouseEnter: function() {
        this.setState({
            mouseOverSubMenu: true
        })
    },

    handleSubMenuMouseLeave: function() {
        this.setState({
            mouseOverSubMenu: false
        })
    },

    isSubMenuActive: function() {
        return this.state.subMenuActive
    },

    onSubMenuActivate: function() {
        this.setState({
            subMenuActive: true
        })
    },

    onSubMenuInactivate: function() {
        var ts = +new Date()

        var nextMenu   = this.state.nextMenu
        var nextMenuTs = this.state.nextMenuTimestamp || 0

        this.setState({
            subMenuActive: false,
            timestamp       : ts
        }, function(){

            setTimeout(function(){
                //a menu show has occured in the mean-time,
                //so skip hiding the menu
                if (ts != this.state.timestamp || (nextMenu && (ts - nextMenuTs < 50))){
                    this.setMenu(this.state.nextMenu, this.state.nextMenuOffset, this.state.nextMenuIndex)
                    return
                }

                if (!this.isSubMenuActive()){
                    this.setMenu()
                }
            }.bind(this), 10)

        })

    },

    removeMouseMoveListener: function() {
        if (this.onWindowMouseMove){
            window.removeEventListener('mousemove', this.onWindowMouseMove)
            this.onWindowMouseMove = null
        }
    },

    onMenuItemMouseOut: function(itemProps, leaveOffset) {
        if (this.state.menu){
            this.setupCheck(leaveOffset)
        }
    },

    /**
     * Called when mouseout happens on the item for which there is a submenu displayed
     */
    onMenuItemMouseOver: function(itemProps, menuOffset, entryPoint) {

        if (!this.isMounted()){
            return
        }

        var menu = itemProps.menu
        var ts = +new Date()

        if (!menu){
            return
        }

        if (!this.state.menu){
            //there is no menu visible, so it's safe to show the menu
            this.setItem(itemProps, menuOffset)
        } else {
            //there is a menu visible, from the previous item that had mouse over
            //so we should queue this item's menu as the next menu to be shown
            this.setNextItem(itemProps, menuOffset)
        }
    },

    setupCheck: function(offset){
        if (!this.isMounted()){
            return
        }

        var tolerance = 5

        var domNode    = this.getDOMNode()
        var menuNode   = domNode.querySelector('.z-menu')

        if (!menuNode){
            return
        }

        var menuRegion = Region.from(menuNode)

        var x1 = menuRegion.left
        var y1 = menuRegion.top// - tolerance

        var x2 = menuRegion.left
        var y2 = menuRegion.bottom// + tolerance

        var x3 = offset.x - tolerance
        var y3 = offset.y

        var triangle = [
            [x1, y1],
            [x2, y2],
            [x3, y3]
        ]

        this.removeMouseMoveListener()

        this.onWindowMouseMove = function(event){

            var point = [event.pageX, event.pageY]

            if (!inTriangle(point, triangle)){

                this.removeMouseMoveListener()

                if (!this.state.mouseOverSubMenu){
                    //the mouse is not over a sub menu item
                    //
                    //so we show a menu of a sibling item, or hide the menu
                    //if no sibling item visited
                    this.setMenu(this.state.nextMenu, this.state.nextMenuOffset, this.state.nextMenuIndex)
                }
            }
        }.bind(this)

        window.addEventListener('mousemove', this.onWindowMouseMove)
    },

    setNextItem: function(itemProps, menuOffset) {

        var ts = +new Date()

        this.setState({
            timestamp     : ts,
            nextItem: itemProps,
            nextMenuTimestamp: +new Date(),
            nextMenu      : itemProps.menu,
            nextMenuOffset: menuOffset,
            nextMenuIndex : itemProps.index
        })
    },

    setItem: function(itemProps, offset) {

        var menu = itemProps?
                        itemProps.menu:
                        null

        this.removeMouseMoveListener()

        if (!menu && !this.state.mouseInside){
            this.onInactivate()
        }

        if (!this.isMounted()){
            return
        }

        this.setState({
            expandedIndex: menu? itemProps.index: -1,
            menu         : menu,
            menuOffset   : offset,
            timestamp    : +new Date(),
            nextMenu     : null,
            nextMenuTimestamp: null,
            nextMenuIndex: -1
        })
    },

    setMenu: function(menu, offset, index) {

        // console.log(index,'!!!')
        this.removeMouseMoveListener()

        if (!menu && !this.state.mouseInside){
            this.onInactivate()
        }

        if (!this.isMounted()){
            return
        }

        this.setState({
            expandedIndex: menu? index: -1,
            menu         : menu,
            menuOffset   : offset,
            timestamp    : +new Date(),
            nextMenu     : null,
            nextMenuTimestamp: null,
            nextMenuIndex: -1
        })
    },

    handleClick: function(props, item, index, event) {
        event.stopPropagation()

        ;(item.fn || emptyFn)(item, event)
        ;(this.props.onClick || emptyFn)(item, index, event)
    }
})

MenuClass.Item      = MenuItem
MenuClass.Item.Cell = MenuItemCell
MenuClass.ItemCell  = MenuItemCell
MenuClass.Separator = MenuSeparator

module.exports = MenuClass