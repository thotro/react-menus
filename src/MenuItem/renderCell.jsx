'use strict';

var assign = require('object-assign')
var MenuItemCell = require('../MenuItemCell')

module.exports = function(props, column) {
    var style = assign({}, props.defaultCellStyle, props.cellStyle)

    return <MenuItemCell style={style}>{props.data[column]}</MenuItemCell>
}