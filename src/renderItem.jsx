'use strict';

var assign = require('object-assign')

var MenuItem = require('./MenuItem')
var MenuItemFactory = React.createFactory(MenuItem)

var MenuSeparator = require('./MenuSeparator')

module.exports = function(props, state, item, index) {

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
        expanded   : index === state.expandedIndex,
        onClick    : this.handleClick.bind(this, props, item, index)
    }

    return (props.itemFactory || MenuItemFactory)(itemProps)
}