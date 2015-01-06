'use strict';

var Menu         = require('../Menu')
var MenuItemCell = require('../MenuItemCell')
var renderCell   = require('./renderCell')

module.exports = function(props) {

    var children = []
    var menu

    React.Children.forEach(props.children, function(child){
        if (child.props.isMenu){
            menu = child
            menu.props.subMenu = true
            return
        }

        children.push(child)
    })

    if (menu){
        props.menu = menu
        children.push(React.createElement(MenuItemCell, {expander: true}))
    }

    return children
}