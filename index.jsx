'use strict';

require('./index.styl')

var React = require('react')
var Menu  = require('./src')

var items = [
    {
        disabled: true,
        icon: 'x',
        label: <div>hello!</div>,
        fn: function(props, index) {
            console.log('well, hello')
            console.log(arguments)
        }
    },
    {
        label: <input placeholder="text" style={{width: '100%', height: '100%'}}/>
    },
    {
        label: 'hi',
        fn: function(){
            console.log(arguments, 'hi')
        }
    },
    '-',
    {
        label: 'Save as',
        // disabled: true,
        fn: function(props, index, event) {
            event.stopPropagation()
            // console.log('well, hello')
            console.log(arguments)
        },
        items: [
            {
                label: 'save as PDF'
            },
            {
                label: 'save as ODT'
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
                <Menu visible={true} onClick={this.handleClick} columns={['icon','label']} items={items} />

                <Menu style={{margin: 10}} at={[100, 200]}>
                    <Menu.Item onClick={this.handleItemClick}>
                        <Menu.Item.Cell>first</Menu.Item.Cell>
                        <Menu items={items} />
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

    handleClick: function(itemProps) {
        console.log('clicked ', arguments)
    }
})

React.render(<App />, document.getElementById('content'))