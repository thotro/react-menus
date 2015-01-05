'use strict';

var React  = require('react')
var assign = require('object-assign')


var renderCells     = require('./MenuItem/renderCells')
var MenuItem        = require('./MenuItem')
var MenuItemFactory = React.createFactory(MenuItem)
var MenuItemCell    = require('./MenuItemCell')
var MenuSeparator   = require('./MenuSeparator')

module.exports = function(props, state, item, index) {

    var expandedIndex = state.itemProps?
                            state.itemProps.index:
                            -1

    if (item === '-'){
        return <MenuSeparator key={index}/>
    }

    var className   = props.rowClassName || ''
    var style       = assign({}, props.defautRowStyle, props.rowStyle)
    var overStyle   = assign({}, props.defautRowOverStyle, props.rowOverStyle)
    var activeStyle = assign({}, props.defautRowActiveStyle, props.rowActiveStyle)

    var children

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
        columns    : props.columns,
        expanded   : index === expandedIndex,
        onClick    : this.handleClick.bind(this, props, item, index)
    }

    itemProps.children = renderCells(itemProps)

    if (item.items){
        var Menu = require('./Menu')
        itemProps.children.push(<Menu items={item.items} isMenu={true} />)
    }
    return (props.itemFactory || MenuItemFactory)(itemProps)
}