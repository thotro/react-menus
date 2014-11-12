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
            <div {...props}>
                <table>
                    <tbody>
                        {this.props.items.map(this.renderItem, this)}
                    </tbody>
                </table>
            </div>
        )
    },

    renderItem: function(item, index) {
        return (
            <tr style={this.props.rowStyle} key={index} onClick={this.handleClick(item, index).bind(this)}>
                {this.props.columns.map(this.renderColumn(item), this)}
            </tr>
        )
    },

    renderColumn: F.curry(function(item, column) {
        return <td style={this.props.columnStyle} key={column}>{item[column]}</td>
    }),

    handleClick: F.curry(function(item, index, event) {
        event.stopPropagation()

        ;(item.fn || emptyFn)(item, event)
        ;(this.props.onClick || emptyFn)(item, index, event)
    })
})