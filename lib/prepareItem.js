'use strict';

var React  = require('react')
var assign = require('object-assign')

var renderCells     = require('./MenuItem/renderCells')
var MenuItem        = require('./MenuItem')
var MenuItemFactory = React.createFactory(MenuItem)
var MenuSeparator   = require('./MenuSeparator')

module.exports = function(props, state, item, index) {

    var expandedIndex = state.itemProps?
                            state.itemProps.index:
                            -1

    if (item === '-'){
        return React.createElement(MenuSeparator, {key: index})
    }

    var className   = [props.itemClassName, item.cls, item.className]
                        .filter(function(x)  {return !!x;})
                        .join(' ')

    var style         = assign({}, props.defaultItemStyle, props.itemStyle)
    var overStyle     = assign({}, props.defaultItemOverStyle, props.itemOverStyle)
    var activeStyle   = assign({}, props.defaultItemActiveStyle, props.itemActiveStyle)
    var disabledStyle = assign({}, props.defaultItemDisabledStyle, props.itemDisabledStyle)
    var expandedStyle = assign({}, props.defaultItemExpandedStyle, props.itemExpandedStyle)

    var itemProps = {
        className  : className,

        style        : style,
        overStyle    : overStyle,
        activeStyle  : activeStyle,
        expandedStyle: expandedStyle,
        disabledStyle: disabledStyle,

        cellStyle    : props.cellStyle,

        key        : index,
        data       : item,
        columns    : props.columns,
        expanded   : index === expandedIndex,
        disabled   : item.disabled,
        onClick    : item.onClick || item.fn
    }

    itemProps.children = renderCells(itemProps)

    if (item.items){
        var Menu = require('./Menu')
        itemProps.children.push(React.createElement(Menu, {items: item.items, isMenu: true}))
    }

    return (props.itemFactory || MenuItemFactory)(itemProps)
}