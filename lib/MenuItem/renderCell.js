'use strict';

var React = require('react');
var assign = require('object-assign');
var MenuItemCell = require('../MenuItemCell');

module.exports = function (props, column) {
  var style = assign({}, props.defaultCellStyle, props.cellStyle);
<<<<<<< HEAD
  if (column === 'icon' && props.data[column]) {
=======
  if (column === 'icon' || column === 'label') {
>>>>>>> 8423cc4f482b5786617f9775bf186e6949f9130a
    return React.createElement(MenuItemCell, { style: style, dangerouslySetInnerHTML: { __html: props.data[column] } });
  } else {
    return React.createElement(
      MenuItemCell,
      { style: style },
      props.data[column]
    );
  }
};