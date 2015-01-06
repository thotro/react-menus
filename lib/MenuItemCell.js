'use strict';

var React  = require('react')
var assign =require('object-assign')
var arrowStyle =require('arrow-style')

function expanderStyle(){
    var style = arrowStyle('right', {
        width: 8,
        height: 4
    })

    style.display = 'inline-block'

    return style
}

var MenuItemCell = React.createClass({

    displayName: 'ReactMenuItemCell',

    getDefaultProps: function() {
        return {
            defaultStyle: {
                padding: 10,
                whiteSpace: 'nowrap'
            }
        }
    },

    render: function() {
        var props    = this.prepareProps(this.props)
        var children = props.children

        if (props.expander){
            children = props.expander === true? '›': props.expander
        }

        return (
            React.createElement("td", React.__spread({},  props), 
                children
            )
        )
    },

    prepareProps: function(thisProps) {
        var props = {}

        assign(props, thisProps)

        props.style = this.prepareStyle(props)
        // if (props.onMouseOver){
        //     debugger
        // }

        return props
    },

    prepareStyle: function(props) {
        var style = {}

        assign(style, props.defaultStyle, props.style)

        return style
    }
})

module.exports = MenuItemCell