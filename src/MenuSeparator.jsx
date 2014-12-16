'use strict';

var React  = require('react')
var assign = require('object-assign')

var emptyFn = function(){}

module.exports = React.createClass({

    displayName: 'ReactMenuSeparator',

    getDefaultProps: function() {
        return {
            defaultStyle: {
            }
        }
    },

    render: function() {
        var props = this.prepareProps(this.props)

        return <tr {...props} />
    },

    prepareProps: function(thisProps) {
        var props = {}

        assign(props, thisProps)

        props.style = this.prepareStyle(props)

        return props
    },

    prepareStyle: function(props) {
        var style = {}

        assign(style, props.defaultStyle, props.style)

        return style
    }
})