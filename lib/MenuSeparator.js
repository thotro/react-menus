'use strict';

var React  = require('react')
var assign = require('object-assign')

var emptyFn = function(){}

module.exports = React.createClass({

    displayName: 'ReactMenuSeparator',

    getDefaultProps: function() {
        return {
            defaultStyle: {
                cursor: 'auto'
            },
            border: '1px solid gray'
        }
    },

    render: function() {
        var props = this.prepareProps(this.props)

        return React.createElement("tr", React.__spread({},  props), React.createElement("td", {colSpan: 10}))
    },

    prepareProps: function(thisProps) {
        var props = {}

        assign(props, thisProps)

        props.style = this.prepareStyle(props)
        props.className = this.prepareClassName(props)

        return props
    },

    prepareClassName: function(props) {
        var className = props.className || ''

        className += ' menu-separator'

        return className
    },

    prepareStyle: function(props) {
        var style = {}

        assign(style, props.defaultStyle, {
            borderTop: props.border
        }, props.style)

        return style
    }
})