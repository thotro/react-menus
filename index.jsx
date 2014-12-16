'use strict';

require('./index.styl')

var React = require('react')
var Menu  = require('./src')

var items = [
    {
        label: <div>hello!</div>,
        fn: function() {
            console.log('well, hello')
        }
    },
    {
        label: 'hi'
    }
]

var App = React.createClass({

    handleItemClick: function() {
        console.log('item click', arguments)
    },

    render: function() {
        //     <Menu.Item>
        //         <Menu.Item.Cell>hello</Menu.Item.Cell>
        //     </Menu.Item>

        //     <Menu.Item>
        //         <Menu.Item.Cell>hi</Menu.Item.Cell>
        //     </Menu.Item>
        // </Menu>

        return (
            <div>
                <Menu onClick={this.handleClick} items={items} />

                <Menu>
                    <Menu.Item onClick={this.handleItemClick}>
                        <Menu.Item.Cell>first</Menu.Item.Cell>

                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item onClick={this.handleItemClick}>
                        <Menu.Item.Cell>second</Menu.Item.Cell>
                        <Menu.Item.Cell>icon</Menu.Item.Cell>
                    </Menu.Item>
                </Menu>
            </div>

        )
    },

    handleClick: function(item) {
        console.log('clicked ', item.label)
    }
})

React.render(<App />, document.getElementById('content'))