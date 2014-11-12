react-menus
===========

> React Menu Component

## Install

```sh
$ npm install --save react-menus
```

## Usage

```jsx
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

React.render(<App />, document.body)
```

## Properties

 * items: Object[]
 * onClick: Function(item, index, event)
 * rowStyle: Object
 * columnStyle: Object
 * columns: String[] - defaults to ['label']

For every item in the items property, a row will be rendered, with all the columns specified in props.columns. Every column displays
the value in item[<column_name>].

Every item can optionally have a **fn** property, which is called when the item is clicked.

## License

```MIT```