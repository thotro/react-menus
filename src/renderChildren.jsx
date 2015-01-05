'use strict';

var React = require('react')
var MenuItemCell = require('./MenuItemCell')

var cloneWithProps = require('react-clonewithprops')
var assign         = require('object-assign')

function emptyFn(){}

module.exports = function(props, state) {
    var expandedIndex = state.itemProps?
                            state.itemProps.index:
                            -1

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
    var result = menuItems.map(function(item, keyIndex){
        var itemProps = item.props

        if (itemProps.isMenuItem){
            i++

            itemProps.onMenuItemMouseOver = this.onMenuItemMouseOver
            itemProps.onMenuItemMouseOut  = this.onMenuItemMouseOut
        }

        var children = itemProps.children
        var count    = React.Children.count(children)

        itemProps.index = i
        itemProps.expanded = expandedIndex == i

        if (count < maxCellCount){
            children = item.props.children = children? [children]: []
        }

        while (count < maxCellCount){
            count++
            children.push(<MenuItemCell />)
        }

        // return item
        return cloneWithProps(item, {
            key: keyIndex,
            onClick: function(){
                (itemProps.onClick || emptyFn).apply(this, arguments)
            }.bind(null, i, itemProps)
        })
    }, this)

    return result
}