'use strict';

var Menu         = require('../Menu')
var MenuItemCell = require('../MenuItemCell')
var renderCell   = require('./renderCell')
var cloneWithProps = require('react-clonewithprops')

module.exports = function(props) {

    var children = []
    var menu

    React.Children.forEach(props.children, function(child){
        if (child.props.isMenu){
            menu = cloneWithProps(child, {
                ref: 'subMenu'
            })
            menu.props.subMenu = true
            return
        }

        child = cloneWithProps(child, {
            style: props.cellStyle
        })

        children.push(child)
    })

    if (menu){
        props.menu = menu
        children.push(React.createElement(MenuItemCell, {expander: props.expander || true}))
    }

    return children
}