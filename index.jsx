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
    },
    '-',
    {
        label: 'Save as',
        items: [
            {
                label: 'PDF'
            },
            {
                label: 'ODT'
            },
            {
                label: 'MS Word',
                fn: function() {
                    console.log('save as ms word')
                }
            }
        ]
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

                <Menu style={{margin: 10}}>
                    <Menu.Item onClick={this.handleItemClick}>
                        <Menu.Item.Cell>first</Menu.Item.Cell>
                    </Menu.Item>

                    <Menu.Separator />
                    <Menu.Item onClick={this.handleItemClick} label={1}>
                        <Menu>
                            <Menu.Item onClick={this.handleItemClick}>
                                <Menu.Item.Cell>one</Menu.Item.Cell>
                            </Menu.Item>
                            <Menu.Item onClick={this.handleItemClick}>
                                <Menu.Item.Cell>two</Menu.Item.Cell>

                                <Menu>
                                    <Menu.Item onClick={this.handleItemClick}>
                                        <Menu.Item.Cell>one</Menu.Item.Cell>
                                    </Menu.Item>
                                    <Menu.Item onClick={this.handleItemClick}>
                                        <Menu.Item.Cell>two</Menu.Item.Cell>
                                    </Menu.Item>
                                    <Menu.Item onClick={this.handleItemClick}>
                                        <Menu>
                                            <Menu.Item onClick={this.handleItemClick}>
                                                <Menu.Item.Cell>one</Menu.Item.Cell>
                                            </Menu.Item>
                                            <Menu.Item onClick={this.handleItemClick}>
                                                <Menu.Item.Cell>two</Menu.Item.Cell>
                                            </Menu.Item>
                                            <Menu.Item onClick={this.handleItemClick}>
                                                <Menu.Item.Cell>three</Menu.Item.Cell>
                                            </Menu.Item>
                                        </Menu>
                                        <Menu.Item.Cell>three</Menu.Item.Cell>
                                    </Menu.Item>
                                </Menu>
                            </Menu.Item>
                            <Menu.Item onClick={this.handleItemClick}>
                                <Menu.Item.Cell>three</Menu.Item.Cell>

                                <Menu>
                                    <Menu.Item onClick={this.handleItemClick}>
                                        <Menu.Item.Cell>3. one</Menu.Item.Cell>
                                    </Menu.Item>
                                    <Menu.Item onClick={this.handleItemClick}>
                                        <Menu.Item.Cell>3. two</Menu.Item.Cell>
                                    </Menu.Item>
                                    <Menu.Item onClick={this.handleItemClick}>
                                        <Menu.Item.Cell>3. three</Menu.Item.Cell>
                                    </Menu.Item>
                                </Menu>
                            </Menu.Item>
                        </Menu>

                        <Menu.Item.Cell>one</Menu.Item.Cell>
                        <Menu.Item.Cell>icon</Menu.Item.Cell>
                    </Menu.Item>

                    <Menu.Item onClick={this.handleItemClick} label={2}>
                                                <Menu.Item.Cell>two</Menu.Item.Cell>
                        <Menu.Item.Cell>icon</Menu.Item.Cell>
                        <Menu>
                            <Menu.Item onClick={this.handleItemClick}>
                                <Menu.Item.Cell>first in submenu</Menu.Item.Cell>
                            </Menu.Item>
                        </Menu>
                    </Menu.Item>
                    <Menu.Item label={3}>
                        <Menu.Item.Cell>three </Menu.Item.Cell>
                        <Menu>
                            <Menu.Item>
                                <Menu.Item.Cell>hello</Menu.Item.Cell>
                            </Menu.Item>
                        </Menu>
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