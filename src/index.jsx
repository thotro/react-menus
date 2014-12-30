'use strict';

var React  = require('react')
var assign = require('object-assign')
var Region = require('region')
var inTriangle = require('point-in-triangle')

var MenuItemCell = require('./MenuItemCell')
var MenuSeparator = require('./MenuSeparator')
var MenuItem = require('./MenuItem')
var MenuItemFactory = React.createFactory(MenuItem)

function emptyFn(){}

var MenuClass = React.createClass({

    displayName: 'Menu',

    propTypes: {
        items      : React.PropTypes.array,
        columns    : React.PropTypes.array,
        onMount    : React.PropTypes.func,

        defaultRowActiveStyle: React.PropTypes.object,
        defaultRowOverStyle  : React.PropTypes.object,
        defaultRowStyle      : React.PropTypes.object,

        rowActiveStyle: React.PropTypes.object,
        rowOverStyle  : React.PropTypes.object,
        rowStyle      : React.PropTypes.object,

        cellStyle  : React.PropTypes.object
    },

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

    renderSubMenu: function(props) {
        var menu = this.state.menu

        if (menu){
            var offset = this.state.menuOffset

            var style = {
                position: 'absolute',
                left    : offset.left || offset.x,
                top     : offset.top || offset.y
            }

            menu.props.onActivate   = this.onSubMenuActivate
            menu.props.onInactivate = this.onSubMenuInactivate

            return <div style={style}
                    onMouseEnter={this.handleSubMenuMouseEnter}
                    onMouseLeave={this.handleSubMenuMouseLeave}
                >{menu}</div>
        }
    },

    render: function() {
        var props = this.prepareProps(this.props)

        var children = props.items?
                            this.renderItems(props):
                            this.renderChildren(props)

        var menu = this.renderSubMenu(props)

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

    renderChildren: function(props) {
        var children     = props.children
        var maxCellCount = 1
        var menuItems    = []

        React.Children.map(children, function(item){
            var itemProps = item.props

            menuItems.push(item)

            if (!itemProps || !itemProps.isMenuItem){
                return
            }

            var count = React.Children.count(itemProps.children)

            maxCellCount = Math.max(maxCellCount, count)
        })


        var i = -1
        menuItems.forEach(function(item){
            var itemProps = item.props

            if (itemProps.isMenuItem){
                i++

                itemProps.onMenuItemMouseOver = this.onMenuItemMouseOver
                itemProps.onMenuItemMouseOut  = this.onMenuItemMouseOut
            }

            var children = itemProps.children
            var count = React.Children.count(children)

            itemProps.onClick = (itemProps.onClick || emptyFn).bind(null, i, itemProps)

            if (count < maxCellCount){
                children = item.props.children = [children]
            }
            while (count < maxCellCount){
                count++
                children.push(<MenuItemCell />)
            }
        }, this)

        return menuItems
    },

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

        this.setState({
            activated: true
        })

        ;(this.props.onActivate || emptyFn)()
    },

    onInactivate: function() {

        if (this.state.activated){

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

        this.setState({
            subMenuActive: false,
            timestamp       : ts
        }, function(){

            setTimeout(function(){
                if (ts != this.state.timestamp){
                    //a menu show has occured in the mean-time,
                    //so skip hiding the menu
                    if (this.state.nextMenu){
                        this.setMenu(this.state.nextMenu, this.state.nextMenuOffset)
                    }

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

        if (!itemProps.menu){
            return
        }

        if (!this.state.menu){
            //there is no menu visible, so it's safe to show the menu
            this.setMenu(itemProps.menu, menuOffset)
        } else {
            //there is a menu visible, from the previous item that had mouse over
            //so we should queue this item's menu as the next menu to be shown
            this.setState({
                timestamp     : +new Date(),
                nextMenu      : itemProps.menu,
                nextMenuOffset: menuOffset
            })
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
                    this.setMenu(this.state.nextMenu, this.state.nextMenuOffset)
                }
            }
        }.bind(this)

        window.addEventListener('mousemove', this.onWindowMouseMove)
    },

    setMenu: function(menu, offset) {

        this.removeMouseMoveListener()

        if (!this.isMounted()){
            return
        }

        if (!menu && !this.state.mouseInside){
            this.onInactivate()
        }

        this.setState({
            menu         : menu,
            menuOffset   : offset,
            timestamp    : +new Date(),
            nextMenu     : null
        })
    },

    renderItem: function(props, state, item, index) {

        if (item === '-'){
            return <MenuSeparator key={index}/>
        }

        var className = props.rowClassName || ''
        var style = assign({}, props.defautRowStyle, props.rowStyle)
        var overStyle = assign({}, props.defautRowOverStyle, props.rowOverStyle)
        var activeStyle = assign({}, props.defautRowActiveStyle, props.rowActiveStyle)

        if (item.cls){
            className += ' ' + item.cls
        }

        var itemProps = {
            className  : className,
            style      : style,
            overStyle  : overStyle,
            activeStyle: activeStyle,
            cellStyle  : props.cellStyle,
            key        : index,
            data       : item,
            index      : index,
            columns    : props.columns,
            onClick    : this.handleClick.bind(this, props, item, index)
        }

        return (props.itemFactory || MenuItemFactory)(itemProps)
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