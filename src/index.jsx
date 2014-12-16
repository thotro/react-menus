'use strict';

var React  = require('react')
var assign = require('object-assign')

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
        cellStyle  : React.PropTypes.object,
        rowStyle   : React.PropTypes.object
    },

    getDefaultProps: function(){

        return {
            defaultStyle: {
                border : '1px solid gray',
                display: 'inline-block'
            },
            rowStyle: {
                cursor: 'pointer'
            },
            cellStyle: {
                padding: 10
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

        props.style = this.prepareStyle(props)
        props.className = this.prepareClassName(props)

        return props
    },

    prepareClassName: function(props) {
        var className = props.className || ''

        className += ' z-menu'

        return className
    },

    prepareStyle: function(props) {
        return assign({}, props.defaultStyle, props.style)
    },

    render: function() {
        var props = this.prepareProps(this.props)

        var children = props.items? this.renderItems(props): this.renderChildren(props)

        return (
            <div {...props}>
                <table>
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
        var children = props.children
        var i = -1

        React.Children.forEach(children, function(child){
            var childProps = child.props

            if (!childProps || !childProps.isMenuItem){
                return
            }

            i++

            var onClick = childProps.onClick || emptyFn

            child.props.onClick = onClick.bind(null, i, childProps)
        })

        return children
    },

    renderItem: function(props, state, item, index) {
        var className = props.rowClassName || ''

        className += ' menu-row'

        if (state.mouseOver === index){
            className += ' over'
        }
        if (item.cls){
            className += ' ' + item.cls
        }

        var itemProps = {
            className  : className,
            style      : props.rowStyle,
            key        : index,
            data       : item,
            index      : index,
            columns    : props.columns,
            cellStyle  : props.cellStyle,
            onClick    : this.handleClick.bind(this, props, item, index),
            onMouseOver: this.handleMouseOver.bind(this, item, index),
            onMouseOut : this.handleMouseOut.bind(this, item, index)
        }

        return (props.itemFactory || MenuItemFactory)(itemProps)
    },

    handleMouseOver: function(item, index){
        this.setState({
            mouseOver: index
        })
    },

    handleMouseOut: function(item){
        this.setState({
            mouseOver: false
        })
    },

    handleClick: function(props, item, index, event) {
        event.stopPropagation()

        ;(item.fn || emptyFn)(item, event)
        ;(this.props.onClick || emptyFn)(item, index, event)
    }
})

MenuClass.Item = MenuItem
MenuClass.Item.Cell = MenuItemCell
MenuClass.ItemCell  = MenuItemCell
MenuClass.Separator  = MenuSeparator

module.exports = MenuClass