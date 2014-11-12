'use strict';

var React = require('react')
var F     = require('functionally')
var copy  = require('copy-utils').copy

function emptyFn(){}

module.exports = React.createClass({

    displayName: 'Menu',

    getDefaultProps: function(){

        return {
            defaultStyle: {
                border : '1px solid gray',
                display: 'inline-block'
            },
            rowStyle: {
                cursor: 'pointer'
            },
            columnStyle: {
                padding: 10
            },
            columns: ['label'],
            items: [
                {
                    label: 'New item',
                    fn: function(){}
                }
            ]
        }
    },

    render: function() {
        var props = copy(this.props)

        props.style = copy(props.style, this.props.defaultStyle)

        return (
            React.createElement("div", React.__spread({},  props), 
                React.createElement("table", null, 
                    React.createElement("tbody", null, 
                        this.props.items.map(this.renderItem, this)
                    )
                )
            )
        )
    },

    renderItem: function(item, index) {
        return (
            React.createElement("tr", {style: this.props.rowStyle, key: index, onClick: this.handleClick(item, index).bind(this)}, 
                this.props.columns.map(this.renderColumn(item), this)
            )
        )
    },

    renderColumn: F.curry(function(item, column) {
        return React.createElement("td", {style: this.props.columnStyle, key: column}, item[column])
    }),

    handleClick: F.curry(function(item, index, event) {
        event.stopPropagation()

        ;(item.fn || emptyFn)(item, event)
        ;(this.props.onClick || emptyFn)(item, index, event)
    })
})