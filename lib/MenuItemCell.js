'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var assign = require('object-assign');

var MenuItemCell = React.createClass({

    displayName: 'ReactMenuItemCell',

    getDefaultProps: function getDefaultProps() {
        return {
            defaultStyle: {
                padding: 5,
                whiteSpace: 'nowrap'
            }
        };
    },

    render: function render() {
        var props = this.prepareProps(this.props);
        var children = props.children;

        if (props.expander) {
            var expander = props.expander === true ? '&#10093;' : props.expander;
            delete props.children;
            return React.createElement('td', _extends({}, props, { dangerouslySetInnerHTML: { __html: expander } }));
        } else {
            return React.createElement('td', props);
        }
    },

    prepareProps: function prepareProps(thisProps) {
        var props = {};

        assign(props, thisProps);

        props.style = this.prepareStyle(props);

        return props;
    },

    prepareStyle: function prepareStyle(props) {
        var style = {};

        assign(style, props.defaultStyle, props.style

        // if (props.itemIndex != props.itemCount - 1){
        //     style.paddingBottom = 0
        // }

        );return style;
    }
});

module.exports = MenuItemCell;