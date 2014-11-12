'use strict';

require('./index.styl')

var React = require('react')
var Menu  = require('./src')

var items = [
    {
        label: 'hello',
        fn: function() {
            console.log('well, hello')
        }
    },
    {
        label: 'hi'
    }
]

var App = React.createClass({

    render: function() {
        return <Menu items={items} onClick={this.handleClick}/>
    },

    handleClick: function(item) {
        console.log('clicked ', item.label)
    }
})

React.render(<App />, document.getElementById('content'))