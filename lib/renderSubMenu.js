'use strict';

var Region           = require('region')
var assign           = require('object-assign')
var cloneWithProps   = require('react-clonewithprops')
var getPositionStyle = require('./getSubMenuPositionStyle')

module.exports = function(props, state) {
    var menu = state.menu

    if (menu && this.isMounted()){

        var style = getPositionStyle.call(this, props, state)

        menu = cloneWithProps(menu, assign({
            ref          : 'subMenu',
            subMenu      : true,
            maxHeight    : state.subMenuMaxHeight,
            onActivate   : this.onSubMenuActivate,
            onInactivate : this.onSubMenuInactivate,
            scrollerProps: props.scrollerProps,
            constrainTo  : props.constrainTo,
            expander     : props.expander
        }, props.itemStyleProps))

        return React.createElement("div", {ref: "subMenuWrap", style: style, 
                onMouseEnter: this.handleSubMenuMouseEnter, 
                onMouseLeave: this.handleSubMenuMouseLeave
            }, menu)
    }
}