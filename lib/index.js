'use strict';

var React  = require('react')
var assign = require('object-assign')

function emptyFn(){}

module.exports = React.createClass({

    displayName: 'Menu',

    propTypes: {
        items      : React.PropTypes.array,
        columns    : React.PropTypes.array,
        onMount    : React.PropTypes.func,
        columnStyle: React.PropTypes.object,
        rowStyle   : React.PropTypes.object
    },

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

    getInitialState: function() {
        return {
            mouseOver: false
        }
    },

    componentDidMount: function() {
        ;(this.props.onMount || emptyFn)(this)
    },

    render: function() {
        var props = {}

        assign(props, this.props)

        props.style = assign({}, props.defaultStyle, props.style)

        if (props.factory){
            return props.factory(props)
        }

        return React.DOM.div(props,
                React.createElement("table", null, 
                    React.createElement("tbody", null, 
                        this.props.items.map(this.renderItem.bind(this, props, this.state))
                    )
                )
            )
    },

    renderItem: function(props, state, item, index) {
        var className = props.rowClassName || ''
        className += ' menu-row'

        if (state.mouseOver === index){
            className += ' over'
        }
        if (item.cls){
            className += ' ' + item.cls
        }

        var itemProps = {
            className: className,
            style    : props.rowStyle,
            key      :index,
            onClick  :this.handleClick.bind(this, props, item, index)
        }

        if (props.itemFactory){
            return props.itemFactory(itemProps, item, index)
        }

        itemProps.children = props.columns.map(this.renderColumn.bind(this, props, item))
        itemProps.onMouseOver = this.handleMouseOver.bind(this, item, index)
        itemProps.onMouseOut  = this.handleMouseOut.bind(this, item, index)

        return (
            React.createElement("tr", React.__spread({},  itemProps))
        )
    },

    handleMouseOver: function(item, index){
        this.setState({
            mouseOver: index
        })
    },

    handleMouseOut: function(item){
        this.setState({
            mouseOver: false
        })
    },

    renderColumn: function(props, item, column) {
        return React.createElement("td", {style: props.columnStyle, key: column}, item[column])
    },

    handleClick: function(props, item, index, event) {
        event.stopPropagation()

        ;(item.fn || emptyFn)(item, event)
        ;(this.props.onClick || emptyFn)(item, index, event)
    }
})