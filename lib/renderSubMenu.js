'use strict';

var Region = window.Region = require('region')
var assign = require('object-assign')
var align  = require('./align')

module.exports = function(props, state) {
    var menu = state.menu

    var style = getPositionStyle.call(this, props, state)

    if (menu && this.isMounted()){

        menu.props.onActivate   = this.onSubMenuActivate
        menu.props.onInactivate = this.onSubMenuInactivate

        return React.createElement("div", {ref: "subMenuWrap", style: style, 
                onMouseEnter: this.handleSubMenuMouseEnter, 
                onMouseLeave: this.handleSubMenuMouseLeave
            }, menu)
    }
}

function getPositionStyle(props, state){
    if (!state.menu || !this.isMounted()){
        this.prevMenuIndex = -1
        return
    }

    var offset = state.menuOffset
    var left   = offset.left + offset.width
    var top    = offset.top

    var menuIndex = state.itemProps.index
    var sameMenu = this.prevMenuIndex == menuIndex

    if (this.aligning && !sameMenu){
        this.aligning = false
    }

    this.prevMenuIndex = menuIndex

    var style = {
        position     : 'absolute',
        visibility   : 'hidden',
        overflow     : 'hidden',
        pointerEvents: 'none',
        left         : left,
        top          : top,
        zIndex       : 1
    }

    if (!this.aligning && !sameMenu){
        setTimeout(function(){

            if (!this.isMounted()){
                return
            }

            var thisRegion = Region.from(this.getDOMNode())
            var menuItemRegion = Region.from({
                left  : thisRegion.left,
                top   : thisRegion.top + offset.top,
                width : offset.width,
                height: offset.height
            })

            var subMenuDOM = this.refs.subMenuWrap && this.refs.subMenuWrap.getDOMNode()
            if (!subMenuDOM){
                return
            }

            var subMenuRegion = Region.from(subMenuDOM.firstChild)

            align(props, subMenuRegion, /* alignTo */ menuItemRegion, props.constrainTo)

            var newLeft = subMenuRegion.left - thisRegion.left
            var newTop  = subMenuRegion.top  - thisRegion.top

            if (Math.abs(newLeft - left) < 5){
                newLeft = left
            }

            if (Math.abs(newTop - top) < 5){
                newTop = top
            }

            this.subMenuPosition = newLeft < 0? 'left': 'right'

            this.alignOffset = {
                left: newLeft,
                top : newTop
            }
            this.aligning = true
            this.setState({})

        }.bind(this), 0)
    }

    if (sameMenu || (this.aligning && this.alignOffset)){
        assign(style, this.alignOffset)
        style.visibility = 'visible'
        delete style.pointerEvents
        delete style.overflow
    }

    this.aligning = false

    return style
}