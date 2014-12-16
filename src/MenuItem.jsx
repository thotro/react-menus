'use strict';

var React  = require('react')
var assign = require('object-assign')
var MenuItemCell = require('./MenuItemCell')

var emptyFn = function(){}

var MenuItem = React.createClass({

    displayName: 'ReactMenuItem',

    getDefaultProps: function() {
        return {
            isMenuItem: true,
            defaultStyle: {
                cursor: 'pointer'
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

        if (!props.children){
            props.children = props.columns.map(this.renderCell.bind(this, props))
        }

        props.onClick = this.handleClick

        return props
    },

    handleClick: function(event) {
        ;(this.props.onClick || emptyFn)(event)
    },

    renderCell: function(props, column) {
        return <MenuItemCell style={props.cellStyle}>{props.data[column]}</MenuItemCell>
    },

    prepareStyle: function(props) {
        var style = {}

        assign(style, props.defaultStyle, props.style)

        return style
    }
})

module.exports = MenuItem