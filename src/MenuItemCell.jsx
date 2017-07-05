'use strict';

var React  = require('react')
var assign =require('object-assign')

var MenuItemCell = React.createClass({

    displayName: 'ReactMenuItemCell',

    getDefaultProps: function() {
        return {
            defaultStyle: {
                padding: 5,
                whiteSpace: 'nowrap'
            }
        }
    },

    render: function() {
        var props    = this.prepareProps(this.props)
        var children = props.children

        if (props.expander){
            var expander = props.expander === true ? '&#10093;': props.expander
            delete props.children
            return (
                <td {...props} dangerouslySetInnerHTML={{__html: expander}} />
            )
        } else {
            return (
                <td {...props} />
            )
        }
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

        // if (props.itemIndex != props.itemCount - 1){
        //     style.paddingBottom = 0
        // }

        return style
    }
})

module.exports = MenuItemCell