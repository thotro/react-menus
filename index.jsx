'use strict';

require('./index.styl')
import { render } from 'react-dom'
var React = require('react')
var Menu  = require('./src')

var items = []

var i = 0
var len = 10

for (; i< len; i++){
    items.push({
        icon: '<span>II</span>',
        label: 'item ' + (i + 1),
        // disabled: true,
        onClick: function(e, obj, index){
            console.log('clicked', index);
            // debugger
        },
        fn: function(){
            // debugger
        },
        items: [
            {
                icon: '<span>OO</span>',
                label: 'item ' + i
            }
        ]
    })
}

var App = React.createClass({

    handleItemClick: function() {
        console.log('item click', arguments)
    },

    render: function() {

        var t = {
            xdefault: {
                style: {
                    color: 'blue'
                },
                overStyle: {
                    color: 'red'
                }
            }
        }
        return (
            <div>
                <Menu theme="xdefault" themes={t} onChildClick={this.handleChildClick} onClick={this.handleClick} xmaxHeight={300} 
                        items={items} columns={['icon', 'label']} at={[100, 100]}/>
            </div>

        )
    },

    handleChildClick: function() {
        console.log('child clicked!')
    },

    handleClick: function(itemProps) {
        console.log('clicked !!!', arguments)
    }
})

render(<App />, document.getElementById('content'))