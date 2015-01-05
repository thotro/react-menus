'use strict';

var MenuItemCell = require('./MenuItemCell')

function emptyFn(){}

module.exports = function(props, state) {
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
        var count    = React.Children.count(children)

        itemProps.onClick = (itemProps.onClick || emptyFn).bind(null, i, itemProps)
        itemProps.index = i
        itemProps.expanded = state.expandedIndex == i

        if (count < maxCellCount){
            children = item.props.children = [children]
        }
        while (count < maxCellCount){
            count++
            children.push(<MenuItemCell />)
        }
    }, this)

    return menuItems
}