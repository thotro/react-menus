'use strict';

module.exports = function(props, state) {
    var menu = state.menu

    if (menu){
        var offset = state.menuOffset

        var style = {
            position: 'absolute',
            left    : offset.left || offset.x,
            top     : offset.top || offset.y,
            zIndex  : 1
        }

        menu.props.onActivate   = this.onSubMenuActivate
        menu.props.onInactivate = this.onSubMenuInactivate

        return React.createElement("div", {style: style, 
                onMouseEnter: this.handleSubMenuMouseEnter, 
                onMouseLeave: this.handleSubMenuMouseLeave
            }, menu)
    }
}