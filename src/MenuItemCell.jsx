'use strict';

var React  = require('react')
var assign =require('object-assign')

var MenuItemCell = React.createClass({

    displayName: 'ReactMenuItemCell',

    getDefaultProps: function() {
        return {
            defaultStyle: {
                padding: 10
            }
        }
    },

    render: function() {
        var props = this.prepareProps(this.props)

        return <td {...props} />
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

module.exports = MenuItemCell