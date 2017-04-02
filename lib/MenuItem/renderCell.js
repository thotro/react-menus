'use strict';

var React = require('react');
var assign = require('object-assign');
var MenuItemCell = require('../MenuItemCell');

module.exports = function (props, column) {
  var style = assign({}, props.defaultCellStyle, props.cellStyle);
  if (column === 'icon' || column === 'label') {
    return React.createElement(MenuItemCell, { style: style, dangerouslySetInnerHTML: { __html: props.data[column] } });
  } else {
    return React.createElement(
      MenuItemCell,
      { style: style },
      props.data[column]
    );
  }
};