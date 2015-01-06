'use strict';

var Region = require('region-align')
var getConstrainRegion = require('./getConstrainRegion')

module.exports = function(props, subMenuRegion, targetAlignRegion, constrainTo){
    var constrainRegion = getConstrainRegion.call(this, constrainTo)

    if (typeof props.alignSubMenu === 'function'){
        props.alignSubMenu(subMenuRegion, targetAlignRegion, constrainRegion)
        return
    }

    if (!constrainRegion){
        return
    }

    subMenuRegion.alignTo(targetAlignRegion, [
        //align to right
        'tl-tr','bl-br',

        //align to left
        'tr-tl', 'br-bl'
    ], { constrain: constrainRegion })
}