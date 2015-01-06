(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactMenus"] = factory(require("React"));
	else
		root["ReactMenus"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var MenuClass = __webpack_require__(1)

	var MenuItem      = __webpack_require__(4)
	var MenuItemCell  = __webpack_require__(2)
	var MenuSeparator = __webpack_require__(3)

	MenuClass.Item      = MenuItem
	MenuClass.Item.Cell = MenuItemCell
	MenuClass.ItemCell  = MenuItemCell
	MenuClass.Separator = MenuSeparator

	module.exports = MenuClass

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	function emptyFn(){}

	var React      = __webpack_require__(5)
	var assign     = __webpack_require__(11)
	var Region     = __webpack_require__(13)
	var inTriangle = __webpack_require__(12)

	var renderSubMenu  = __webpack_require__(6)
	var renderChildren = __webpack_require__(7)
	var prepareItem    = __webpack_require__(8)

	var propTypes = __webpack_require__(9)

	var MenuClass = React.createClass({

	    displayName: 'Menu',

	    propTypes: propTypes,

	    getDefaultProps: function(){

	        return {
	            isMenu: true,
	            defaultStyle: {
	                border  : '1px solid gray',
	                display : 'inline-block',
	                position: 'relative'
	            },
	            defaultSubMenuStyle: {
	                position: 'absolute'
	            },
	            columns: ['label'],
	            items: null
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

	    prepareProps: function(thisProps, state) {
	        var props = {}

	        assign(props, this.props)

	        props.style     = this.prepareStyle(props)
	        props.className = this.prepareClassName(props)

	        props.children  = this.prepareChildren(props, state)

	        return props
	    },

	    prepareChildren: function(props, state){

	        var children = props.children

	        if (props.items){
	            children = props.items.map(this.prepareItem.bind(this, props, state))
	        }

	        return children
	    },

	    prepareItem: prepareItem,

	    prepareClassName: function(props) {
	        var className = props.className || ''

	        className += ' z-menu'

	        return className
	    },

	    prepareStyle: function(props) {
	        var subMenuStyle = props.subMenu?
	                            props.defaultSubMenuStyle:
	                            null

	        return assign({}, props.defaultStyle, subMenuStyle, props.style)
	    },

	    /////////////// RENDERING LOGIC

	    renderSubMenu: renderSubMenu,

	    render: function() {
	        var state = this.state
	        var props = this.prepareProps(this.props, state)

	        var children = this.renderChildren(props, state)

	        var menu = this.renderSubMenu(props, state)

	        return (
	            React.createElement("div", React.__spread({},  props), 
	                menu, 
	                React.createElement("table", {ref: "table", 
	                    onMouseEnter: this.handleMouseEnter, 
	                    onMouseLeave: this.handleMouseLeave
	                }, 
	                    React.createElement("tbody", null, 
	                        children
	                    )
	                )
	            )
	        )
	    },

	    // renderItems: function(props){
	    //     return props.items.map(this.renderItem.bind(this, props, this.state))
	    // },

	    renderChildren: renderChildren,

	    ////////////////////////// BEHAVIOUR LOGIC

	    handleMouseEnter: function() {
	        this.setState({
	            mouseInside: true
	        })

	        this.onActivate()
	    },

	    handleMouseLeave: function() {
	        this.setState({
	            mouseInside: false
	        })

	        if (!this.state.menu && !this.state.nextItem){
	        // if (!this.state.nextItem){
	            this.onInactivate()
	        }
	    },

	    onActivate: function() {
	        if (!this.state.activated){
	            // console.log('activate')
	            this.setState({
	                activated: true
	            })

	            ;(this.props.onActivate || emptyFn)()
	        }
	    },

	    onInactivate: function() {
	        if (this.state.activated){

	            this.setState({
	                activated: false
	            })

	            // console.log('inactivate')
	            ;(this.props.onInactivate || emptyFn)()
	        }
	    },

	    //we also need mouseOverSubMenu: Boolean
	    //since when from a submenu we move back to a parent menu, we may move
	    //to a different menu item than the one that triggered the submenu
	    //so we should display another submenu
	    handleSubMenuMouseEnter: function() {
	        this.setState({
	            mouseOverSubMenu: true
	        })
	    },

	    handleSubMenuMouseLeave: function() {
	        this.setState({
	            mouseOverSubMenu: false
	        })
	    },

	    isSubMenuActive: function() {
	        return this.state.subMenuActive
	    },

	    onSubMenuActivate: function() {
	        this.setState({
	            subMenuActive: true
	        })
	    },

	    onSubMenuInactivate: function() {
	        var ts = +new Date()

	        var nextItem      = this.state.nextItem
	        var nextTimestamp = this.state.nextTimestamp || 0

	        this.setState({
	            subMenuActive: false,
	            timestamp       : ts
	        }, function(){

	            setTimeout(function(){
	                if (ts != this.state.timestamp || (nextItem && (ts - nextTimestamp < 100))){
	                    //a menu show has occured in the mean-time,
	                    //so skip hiding the menu
	                    this.setItem(this.state.nextItem, this.state.nextOffset)
	                    return
	                }

	                if (!this.isSubMenuActive()){
	                    this.setItem()
	                }
	            }.bind(this), 10)

	        })

	    },

	    removeMouseMoveListener: function() {
	        if (this.onWindowMouseMove){
	            window.removeEventListener('mousemove', this.onWindowMouseMove)
	            this.onWindowMouseMove = null
	        }
	    },

	    onMenuItemMouseOut: function(itemProps, leaveOffset) {
	        if (this.state.menu){
	            this.setupCheck(leaveOffset)
	        }
	    },

	    /**
	     * Called when mouseout happens on the item for which there is a submenu displayed
	     */
	    onMenuItemMouseOver: function(itemProps, menuOffset, entryPoint) {

	        if (!this.isMounted()){
	            return
	        }

	        var menu = itemProps.menu
	        var ts   = +new Date()

	        if (!menu){
	            return
	        }

	        if (!this.state.menu){
	            //there is no menu visible, so it's safe to show the menu
	            this.setItem(itemProps, menuOffset)
	        } else {
	            //there is a menu visible, from the previous item that had mouse over
	            //so we should queue this item's menu as the next menu to be shown
	            this.setNextItem(itemProps, menuOffset)
	        }
	    },

	    setupCheck: function(offset){
	        if (!this.isMounted()){
	            return
	        }

	        var tolerance = 5

	        var domNode    = this.getDOMNode()
	        var menuNode   = domNode.querySelector('.z-menu')

	        if (!menuNode){
	            return
	        }

	        var menuRegion = Region.from(menuNode)

	        var x1 = menuRegion.left
	        var y1 = menuRegion.top// - tolerance

	        var x2 = menuRegion.left
	        var y2 = menuRegion.bottom// + tolerance

	        var x3 = offset.x - tolerance
	        var y3 = offset.y

	        var triangle = [
	            [x1, y1],
	            [x2, y2],
	            [x3, y3]
	        ]

	        this.removeMouseMoveListener()

	        this.onWindowMouseMove = function(event){

	            var point = [event.pageX, event.pageY]

	            if (!inTriangle(point, triangle)){

	                this.removeMouseMoveListener()
	                // console.log('out')

	                if (!this.state.mouseOverSubMenu){
	                    // console.log('out next')
	                    //the mouse is not over a sub menu item
	                    //
	                    //so we show a menu of a sibling item, or hide the menu
	                    //if no sibling item visited
	                    this.setItem(this.state.nextItem, this.state.nextOffset)
	                }
	            }
	        }.bind(this)

	        window.addEventListener('mousemove', this.onWindowMouseMove)
	    },

	    setNextItem: function(itemProps, menuOffset) {

	        var ts = +new Date()

	        this.setState({
	            timestamp        : ts,

	            nextItem     : itemProps,
	            nextOffset   : menuOffset,
	            nextTimestamp: +new Date()
	        })
	    },

	    setItem: function(itemProps, offset) {

	        var menu = itemProps?
	                        itemProps.menu:
	                        null

	        this.removeMouseMoveListener()

	        if (!menu && !this.state.mouseInside){
	            this.onInactivate()
	        }

	        if (!this.isMounted()){
	            return
	        }

	        this.setState({
	            itemProps    : itemProps,

	            menu         : menu,
	            menuOffset   : offset,
	            timestamp    : +new Date(),

	            nextItem     : null,
	            nextOffset   : null,
	            nextTimestamp: null
	        })
	    },

	    onMenuItemClick: function(props, index, event) {
	        // console.log(arguments, ' menu click')
	        var stopped = event.isPropagationStopped()

	        event.stopPropagation()
	        // ;(item.fn || emptyFn)(item, event)

	        if (!stopped){
	            ;(this.props.onClick || emptyFn)(props, index, event)
	        }
	    }
	})

	module.exports = MenuClass

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React  = __webpack_require__(5)
	var assign =__webpack_require__(11)
	var arrowStyle =__webpack_require__(14)

	function expanderStyle(){
	    var style = arrowStyle('right', {
	        width: 8,
	        height: 4
	    })

	    style.display = 'inline-block'

	    return style
	}

	var MenuItemCell = React.createClass({

	    displayName: 'ReactMenuItemCell',

	    getDefaultProps: function() {
	        return {
	            defaultStyle: {
	                padding: 10,
	                whiteSpace: 'nowrap'
	            }
	        }
	    },

	    render: function() {
	        var props    = this.prepareProps(this.props)
	        var children = props.children

	        if (props.expander){
	            children = props.expander === true? '›': props.expander
	        }

	        return (
	            React.createElement("td", React.__spread({},  props), 
	                children
	            )
	        )
	    },

	    prepareProps: function(thisProps) {
	        var props = {}

	        assign(props, thisProps)

	        props.style = this.prepareStyle(props)
	        // if (props.onMouseOver){
	        //     debugger
	        // }

	        return props
	    },

	    prepareStyle: function(props) {
	        var style = {}

	        assign(style, props.defaultStyle, props.style)

	        return style
	    }
	})

	module.exports = MenuItemCell

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React  = __webpack_require__(5)
	var assign = __webpack_require__(11)

	var emptyFn = function(){}

	module.exports = React.createClass({

	    displayName: 'ReactMenuSeparator',

	    getDefaultProps: function() {
	        return {
	            defaultStyle: {
	                cursor: 'auto'
	            },
	            border: '1px solid gray'
	        }
	    },

	    render: function() {
	        var props = this.prepareProps(this.props)

	        return React.createElement("tr", React.__spread({},  props), React.createElement("td", {colSpan: 10}))
	    },

	    prepareProps: function(thisProps) {
	        var props = {}

	        assign(props, thisProps)

	        props.style = this.prepareStyle(props)
	        props.className = this.prepareClassName(props)

	        return props
	    },

	    prepareClassName: function(props) {
	        var className = props.className || ''

	        className += ' menu-separator'

	        return className
	    },

	    prepareStyle: function(props) {
	        var style = {}

	        assign(style, props.defaultStyle, {
	            borderTop: props.border
	        }, props.style)

	        return style
	    }
	})

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React  = __webpack_require__(5)
	var assign = __webpack_require__(11)
	var Region = __webpack_require__(13)
	var selectParent = __webpack_require__(15)

	var prepareChildren = __webpack_require__(10)
	var Menu = __webpack_require__(1)
	var MenuItemCell = __webpack_require__(2)

	var emptyFn = function(){}

	var MenuItem = React.createClass({

	    displayName: 'ReactMenuItem',

	    getInitialState: function() {
	        return {}
	    },

	    getDefaultProps: function() {
	        return {
	            isMenuItem: true,
	            defaultStyle: {
	                cursor: 'pointer',
	                background: 'white'
	            },
	            defaultOverStyle: {
	                background: '#d7e7ff'
	            },
	            defaultActiveStyle: {
	                background: 'rgb(187, 212, 251)'
	            },
	            defaultExpandedStyle: {
	                background: 'rgb(230, 240, 255)'
	            },
	            defaultDisabledStyle: {
	                color: 'gray',
	                cursor: 'default'
	            }
	        }
	    },

	    render: function() {
	        var props = this.prepareProps(this.props, this.state)

	        return React.createElement("tr", React.__spread({},  props))
	    },

	    prepareProps: function(thisProps, state) {
	        var props = {}

	        assign(props, thisProps)

	        props.mouseOver = !!state.mouseOver
	        props.active    = !!state.active
	        props.disabled    = !!props.disabled

	        props.style     = this.prepareStyle(props)
	        props.className = this.prepareClassName(props)

	        props.children  = this.prepareChildren(props)

	        props.onClick      = this.handleClick
	        props.onMouseEnter = this.handleMouseEnter.bind(this, props)
	        props.onMouseLeave = this.handleMouseLeave.bind(this, props)
	        props.onMouseDown  = this.handleMouseDown
	        props.onMouseMove  = this.handleMouseMove

	        return props
	    },

	    handleClick: function(event) {

	        var props = this.props

	        if (props.disabled){
	            event.stopPropagation()
	            return
	        }

	        ;(props.onClick || props.fn || emptyFn)(props, props.index, event)
	    },

	    handleMouseMove: function(event){

	    },

	    handleMouseDown: function(event) {
	        // event.preventDefault()

	        var mouseUpListener = function(){
	            this.setState({
	                active: false
	            })
	            window.removeEventListener('mouseup', mouseUpListener)
	        }.bind(this)

	        window.addEventListener('mouseup', mouseUpListener)

	        this.setState({
	            active: true
	        })
	    },

	    showMenu: function(menu, props) {

	        props.showMenu(menu, offset)
	    },

	    handleMouseEnter: function(props, event) {

	        if (props.disabled){
	            return
	        }

	        var offset = {
	            x: event.pageX,
	            y: event.pageY
	        }

	        this.setState({
	            mouseOver: true
	        })

	        if (props.onMenuItemMouseOver){

	            var menuOffset

	            if (props.menu){
	                var menuRegion = Region.from(selectParent('.z-menu', this.getDOMNode()))
	                var thisRegion = Region.from(this.getDOMNode())

	                menuOffset = {
	                    x: menuRegion.width,
	                    y : thisRegion.top - menuRegion.top
	                }
	            }

	            props.onMenuItemMouseOver(props, menuOffset, offset)
	        }
	    },

	    handleMouseLeave: function(props, event) {

	        if (props.disabled){
	            return
	        }

	        var offset = {
	            x: event.pageX,
	            y: event.pageY
	        }

	        if (this.isMounted()){
	            this.setState({
	                active: false,
	                mouseOver: false
	            })
	        }

	        if (props.onMenuItemMouseOut){
	            props.onMenuItemMouseOut(props, offset)
	        }
	    },

	    prepareChildren: prepareChildren,

	    prepareClassName: function(props) {
	        var className = props.className || ''

	        className += ' menu-row'

	        if (props.disabled){
	            className += ' disabled ' + (props.disabledClassName || '')
	        } else {

	            if (props.mouseOver){
	                className += ' over ' + (props.overClassName || '')
	            }

	            if (props.active){
	                className += ' active ' + (props.activeClassName || '')
	            }

	            if (props.expanded){
	                className += ' expanded ' + (props.expandedClassName || '')
	            }
	        }

	        return className
	    },

	    prepareStyle: function(props) {
	        var style = {}

	        assign(style, props.defaultStyle, props.style)

	        if (props.disabled){

	            assign(style, props.defaultDisabledStyle, props.disabledStyle)

	        } else {

	            if (props.expanded){
	                assign(style, props.defaultExpandedStyle, props.expandedStyle)
	            }

	            if (props.mouseOver){
	                assign(style, props.defaultOverStyle, props.overStyle)
	            }

	            if (props.active){
	                assign(style, props.defaultActiveStyle, props.activeStyle)
	            }
	        }

	        return style
	    }
	})

	module.exports = MenuItem

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	module.exports = function(props, state) {
	    var menu = state.menu

	    if (menu){
	        var offset = state.menuOffset

	        var style = {
	            position: 'absolute',
	            left    : offset.left || offset.x,
	            top     : offset.top || offset.y,
	            zIndex  : 1
	        }

	        menu.props.onActivate   = this.onSubMenuActivate
	        menu.props.onInactivate = this.onSubMenuInactivate

	        return React.createElement("div", {style: style, 
	                onMouseEnter: this.handleSubMenuMouseEnter, 
	                onMouseLeave: this.handleSubMenuMouseLeave
	            }, menu)
	    }
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React = __webpack_require__(5)
	var MenuItemCell = __webpack_require__(2)

	var cloneWithProps = __webpack_require__(18)
	var assign         = __webpack_require__(11)

	function emptyFn(){}

	module.exports = function(props, state) {
	    var expandedIndex = state.itemProps?
	                            state.itemProps.index:
	                            -1

	    var children     = props.children
	    var maxCellCount = 1
	    var menuItems    = []

	    React.Children.map(children, function(item){
	        var itemProps = item.props

	        menuItems.push(item)

	        if (!itemProps || !itemProps.isMenuItem){
	            return
	        }

	        var count = React.Children.count(itemProps.children)

	        maxCellCount = Math.max(maxCellCount, count)
	    })

	    var i = -1
	    var result = menuItems.map(function(item, index){
	        var itemProps = item.props

	        if (itemProps.isMenuItem){
	            i++

	            itemProps.onMenuItemMouseOver = this.onMenuItemMouseOver
	            itemProps.onMenuItemMouseOut  = this.onMenuItemMouseOut
	        }

	        var children = React.Children.map(itemProps.children, function(c){ return c })
	        var count    = React.Children.count(children)

	        if (count < maxCellCount){
	            children = children? [children]: []
	        }

	        while (count < maxCellCount){
	            count++
	            children.push(React.createElement(MenuItemCell, null))
	        }

	        var onClick = itemProps.onClick || emptyFn

	        return cloneWithProps(item, {
	            itemIndex: i,
	            key     : index,
	            index   : index,
	            expanded: expandedIndex == index,
	            children: children,
	            onClick : function(props, index, event){
	                onClick.apply(null, arguments)
	                this.onMenuItemClick(props, index, event)
	            }.bind(this)
	        })

	    }, this)

	    return result
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React  = __webpack_require__(5)
	var assign = __webpack_require__(11)

	var renderCells     = __webpack_require__(16)
	var MenuItem        = __webpack_require__(4)
	var MenuItemFactory = React.createFactory(MenuItem)
	var MenuSeparator   = __webpack_require__(3)

	module.exports = function(props, state, item, index) {

	    var expandedIndex = state.itemProps?
	                            state.itemProps.index:
	                            -1

	    if (item === '-'){
	        return React.createElement(MenuSeparator, {key: index})
	    }

	    var className   = [props.itemClassName, item.cls, item.className]
	                        .filter(function(x)  {return !!x;})
	                        .join(' ')

	    var style         = assign({}, props.defaultItemStyle, props.itemStyle)
	    var overStyle     = assign({}, props.defaultItemOverStyle, props.itemOverStyle)
	    var activeStyle   = assign({}, props.defaultItemActiveStyle, props.itemActiveStyle)
	    var disabledStyle = assign({}, props.defaultItemDisabledStyle, props.itemDisabledStyle)
	    var expandedStyle = assign({}, props.defaultItemExpandedStyle, props.itemExpandedStyle)

	    var itemProps = {
	        className  : className,

	        style        : style,
	        overStyle    : overStyle,
	        activeStyle  : activeStyle,
	        expandedStyle: expandedStyle,
	        disabledStyle: disabledStyle,

	        cellStyle    : props.cellStyle,

	        key        : index,
	        data       : item,
	        columns    : props.columns,
	        expanded   : index === expandedIndex,
	        disabled   : item.disabled,
	        onClick    : item.onClick || item.fn
	    }

	    itemProps.children = renderCells(itemProps)

	    if (item.items){
	        var Menu = __webpack_require__(1)
	        itemProps.children.push(React.createElement(Menu, {items: item.items, isMenu: true}))
	    }

	    return (props.itemFactory || MenuItemFactory)(itemProps)
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(5)

	module.exports = {
	    items      : React.PropTypes.array,
	    columns    : React.PropTypes.array,
	    onMount    : React.PropTypes.func,

	    defaultRowActiveStyle: React.PropTypes.object,
	    defaultRowOverStyle  : React.PropTypes.object,
	    defaultRowStyle      : React.PropTypes.object,

	    rowActiveStyle: React.PropTypes.object,
	    rowOverStyle  : React.PropTypes.object,
	    rowStyle      : React.PropTypes.object,

	    cellStyle  : React.PropTypes.object
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var Menu         = __webpack_require__(1)
	var MenuItemCell = __webpack_require__(2)
	var renderCell   = __webpack_require__(17)

	module.exports = function(props) {

	    var children = []
	    var menu

	    React.Children.forEach(props.children, function(child){
	        if (child.props.isMenu){
	            menu = child
	            menu.props.subMenu = true
	            return
	        }

	        children.push(child)
	    })

	    if (menu){
	        props.menu = menu
	        children.push(React.createElement(MenuItemCell, {expander: true}))
	    }

	    return children
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	//http://www.blackpawn.com/texts/pointinpoly/
	module.exports = function pointInTriangle(point, triangle) {
	    //compute vectors & dot products
	    var cx = point[0], cy = point[1],
	        t0 = triangle[0], t1 = triangle[1], t2 = triangle[2],
	        v0x = t2[0]-t0[0], v0y = t2[1]-t0[1],
	        v1x = t1[0]-t0[0], v1y = t1[1]-t0[1],
	        v2x = cx-t0[0], v2y = cy-t0[1],
	        dot00 = v0x*v0x + v0y*v0y,
	        dot01 = v0x*v1x + v0y*v1y,
	        dot02 = v0x*v2x + v0y*v2y,
	        dot11 = v1x*v1x + v1y*v1y,
	        dot12 = v1x*v2x + v1y*v2y

	    // Compute barycentric coordinates
	    var b = (dot00 * dot11 - dot01 * dot01),
	        inv = b === 0 ? 0 : (1 / b),
	        u = (dot11*dot02 - dot01*dot12) * inv,
	        v = (dot00*dot12 - dot01*dot02) * inv
	    return u>=0 && v>=0 && (u+v < 1)
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21)

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function arrowStyle(side, config){

	    var arrowSize   = config.size   || 8
	    var arrowWidth  = config.width  || arrowSize
	    var arrowHeight = config.height || arrowSize
	    var arrowColor  = config.color  || 'black'
	    var includePosition = config.includePosition

	    var style

	    if (side == 'up' || side == 'down'){

	        style = {
	            borderLeft : arrowWidth + 'px solid transparent',
	            borderRight: arrowWidth + 'px solid transparent'
	        }

	        if (includePosition){
	            style.marginTop = -Math.round(arrowHeight/2) + 'px'
	            style.position  = 'relative'
	            style.top       = '50%'
	        }

	        style[side === 'up'? 'borderBottom': 'borderTop'] = arrowHeight + 'px solid ' + arrowColor
	    }

	    if (side == 'left' || side == 'right'){

	        style = {
	            borderTop : arrowHeight + 'px solid transparent',
	            borderBottom: arrowHeight + 'px solid transparent'
	        }

	        if (includePosition){
	            style.marginLeft = -Math.round(arrowWidth/2) + 'px'
	            style.position   = 'relative'
	            style.left       = '50%'
	        }

	        style[side === 'left'? 'borderRight': 'borderLeft'] = arrowWidth + 'px solid ' + arrowColor
	    }

	    return style
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var curry   = __webpack_require__(19)
	var matches = __webpack_require__(20)

	module.exports = curry(function(selector, node){
	    while (node = node.parentElement){
	        if (matches.call(node, selector)){
	            return node
	        }
	    }
	})

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var renderCell = __webpack_require__(17)

	module.exports = function(props) {
	    return props.columns.map(renderCell.bind(null, props))
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var assign = __webpack_require__(11)
	var MenuItemCell = __webpack_require__(2)

	module.exports = function(props, column) {
	    var style = assign({}, props.defaultCellStyle, props.cellStyle)

	    return React.createElement(MenuItemCell, {style: style}, props.data[column])
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React    = __webpack_require__(5)
	  , hasOwn   = Object.prototype.hasOwnProperty
	  , version  = React.version.split('.').map(parseFloat)
	  , RESERVED = {
	      className:  resolve(joinClasses),
	      children:   function(){},
	      key:        function(){},
	      ref:        function(){},
	      style:      resolve(extend)
	    };

	module.exports = function cloneWithProps(child, props) {
	  var newProps = mergeProps(props, child.props);

	  if (!hasOwn.call(newProps, 'children') && hasOwn.call(child.props, 'children'))
	    newProps.children = child.props.children;

	  // < 0.11
	  if (version[0] === 0 && version[1] < 11)
	    return child.constructor.ConvenienceConstructor(newProps);
	  
	  // 0.11
	  if (version[0] === 0 && version[1] === 11)
	    return child.constructor(newProps);

	  // 0.12
	  else if (version[0] === 0 && version[1] === 12){
	    MockLegacyFactory.isReactLegacyFactory = true
	    MockLegacyFactory.type = child.type
	    return React.createElement(MockLegacyFactory, newProps);
	  }

	  // 0.13+
	  return React.createElement(child.type, newProps);

	  function MockLegacyFactory(){}
	}

	function mergeProps(currentProps, childProps) {
	  var newProps = extend(currentProps), key

	  for (key in childProps) {
	    if (hasOwn.call(RESERVED, key) )
	      RESERVED[key](newProps, childProps[key], key)

	    else if ( !hasOwn.call(newProps, key) )
	      newProps[key] = childProps[key];
	  }
	  return newProps
	}

	function resolve(fn){
	  return function(src, value, key){
	    if( !hasOwn.call(src, key)) src[key] = value
	    else src[key] = fn(src[key], value)
	  }
	}

	function joinClasses(a, b){
	  if ( !a ) return b || ''
	  return a + (b ? ' ' + b : '')
	}

	function extend() {
	  var target = {};
	  for (var i = 0; i < arguments.length; i++) 
	    for (var key in arguments[i]) if (hasOwn.call(arguments[i], key)) 
	      target[key] = arguments[i][key]   
	  return target
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function curry(fn, n){

	    if (typeof n !== 'number'){
	        n = fn.length
	    }

	    function getCurryClosure(prevArgs){

	        function curryClosure() {

	            var len  = arguments.length
	            var args = [].concat(prevArgs)

	            if (len){
	                args.push.apply(args, arguments)
	            }

	            if (args.length < n){
	                return getCurryClosure(args)
	            }

	            return fn.apply(this, args)
	        }

	        return curryClosure
	    }

	    return getCurryClosure([])
	}

	module.exports = curry

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var proto = Element.prototype

	var nativeMatches = proto.matches ||
	  proto.mozMatchesSelector ||
	  proto.msMatchesSelector ||
	  proto.oMatchesSelector ||
	  proto.webkitMatchesSelector

	module.exports = nativeMatches


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn    = __webpack_require__(26)
	var newify    = __webpack_require__(27)
	var copyUtils = __webpack_require__(28)
	var copyList  = copyUtils.copyList
	var copy      = copyUtils.copy
	var isObject  = __webpack_require__(29).object
	var EventEmitter = __webpack_require__(25).EventEmitter
	var inherits = __webpack_require__(22)
	var VALIDATE = __webpack_require__(23)

	/**
	 * @class Region
	 *
	 * The Region is an abstraction that allows the developer to refer to rectangles on the screen,
	 * and move them around, make diffs and unions, detect intersections, compute areas, etc.
	 *
	 * ## Creating a region
	 *      var region = require('region')({
	 *          top  : 10,
	 *          left : 10,
	 *          bottom: 100,
	 *          right : 100
	 *      })
	 *      //this region is a square, 90x90, starting from (10,10) to (100,100)
	 *
	 *      var second = require('region')({ top: 10, left: 100, right: 200, bottom: 60})
	 *      var union  = region.getUnion(second)
	 *
	 *      //the "union" region is a union between "region" and "second"
	 */

	var POINT_POSITIONS = {
	        cy: 'YCenter',
	        cx: 'XCenter',
	        t : 'Top',
	        tc: 'TopCenter',
	        tl: 'TopLeft',
	        tr: 'TopRight',
	        b : 'Bottom',
	        bc: 'BottomCenter',
	        bl: 'BottomLeft',
	        br: 'BottomRight',
	        l : 'Left',
	        lc: 'LeftCenter',
	        r : 'Right',
	        rc: 'RightCenter',
	        c : 'Center'
	    }

	/**
	 * @constructor
	 *
	 * Construct a new Region.
	 *
	 * Example:
	 *
	 *      var r = new Region({ top: 10, left: 20, bottom: 100, right: 200 })
	 *
	 *      //or, the same, but with numbers (can be used with new or without)
	 *
	 *      r = Region(10, 200, 100, 20)
	 *
	 *      //or, with width and height
	 *
	 *      r = Region({ top: 10, left: 20, width: 180, height: 90})
	 *
	 * @param {Number|Object} top The top pixel position, or an object with top, left, bottom, right properties. If an object is passed,
	 * instead of having bottom and right, it can have width and height.
	 *
	 * @param {Number} right The right pixel position
	 * @param {Number} bottom The bottom pixel position
	 * @param {Number} left The left pixel position
	 *
	 * @return {Region} this
	 */
	var REGION = function(top, right, bottom, left){

	    if (!(this instanceof REGION)){
	        return newify(REGION, arguments)
	    }

	    EventEmitter.call(this)

	    if (isObject(top)){
	        copyList(top, this, ['top','right','bottom','left'])

	        if (top.bottom == null && top.height != null){
	            this.bottom = this.top + top.height
	        }
	        if (top.right == null && top.width != null){
	            this.right = this.left + top.width
	        }

	        if (top.emitChangeEvents){
	            this.emitChangeEvents = top.emitChangeEvents
	        }
	    } else {
	        this.top    = top
	        this.right  = right
	        this.bottom = bottom
	        this.left   = left
	    }

	    this[0] = this.left
	    this[1] = this.top

	    VALIDATE(this)
	}

	inherits(REGION, EventEmitter)

	copy({

	    /**
	     * @cfg {Boolean} emitChangeEvents If this is set to true, the region
	     * will emit 'changesize' and 'changeposition' whenever the size or the position changs
	     */
	    emitChangeEvents: false,

	    /**
	     * Returns this region, or a clone of this region
	     * @param  {Boolean} [clone] If true, this method will return a clone of this region
	     * @return {Region}       This region, or a clone of this
	     */
	    getRegion: function(clone){
	        return clone?
	                    this.clone():
	                    this
	    },

	    /**
	     * Sets the properties of this region to those of the given region
	     * @param {Region/Object} reg The region or object to use for setting properties of this region
	     * @return {Region} this
	     */
	    setRegion: function(reg){

	        if (reg instanceof REGION){
	            this.set(reg.get())
	        } else {
	            this.set(reg)
	        }

	        return this
	    },

	    /**
	     * Returns true if this region is valid, false otherwise
	     *
	     * @param  {Region} region The region to check
	     * @return {Boolean}        True, if the region is valid, false otherwise.
	     * A region is valid if
	     *  * left <= right  &&
	     *  * top  <= bottom
	     */
	    validate: function(){
	        return REGION.validate(this)
	    },

	    _before: function(){
	        if (this.emitChangeEvents){
	            return copyList(this, {}, ['left','top','bottom','right'])
	        }
	    },

	    _after: function(before){
	        if (this.emitChangeEvents){

	            if(this.top != before.top || this.left != before.left) {
	                this.emitPositionChange()
	            }

	            if(this.right != before.right || this.bottom != before.bottom) {
	                this.emitSizeChange()
	            }
	        }
	    },

	    notifyPositionChange: function(){
	        this.emit('changeposition', this)
	    },

	    emitPositionChange: function(){
	        this.notifyPositionChange()
	    },

	    notifySizeChange: function(){
	        this.emit('changesize', this)
	    },

	    emitSizeChange: function(){
	        this.notifySizeChange()
	    },

	    /**
	     * Add the given amounts to each specified side. Example
	     *
	     *      region.add({
	     *          top: 50,    //add 50 px to the top side
	     *          bottom: -100    //substract 100 px from the bottom side
	     *      })
	     *
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     * @param {Number} [directions.bottom]
	     * @param {Number} [directions.right]
	     *
	     * @return {Region} this
	     */
	    add: function(directions){

	        var before = this._before()
	        var direction

	        for (direction in directions) if ( hasOwn(directions, direction) ) {
	            this[direction] += directions[direction]
	        }

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * The same as {@link #add}, but substracts the given values
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     * @param {Number} [directions.bottom]
	     * @param {Number} [directions.right]
	     *
	     * @return {Region} this
	     */
	    substract: function(directions){

	        var before = this._before()
	        var direction

	        for (direction in directions) if (hasOwn(directions, direction) ) {
	            this[direction] -= directions[direction]
	        }

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * Retrieves the size of the region.
	     * @return {Object} An object with {width, height}, corresponding to the width and height of the region
	     */
	    getSize: function(){
	        return {
	            width  : this.getWidth(),
	            height : this.getHeight()
	        }
	    },

	    /**
	     * Move the region to the given position and keeps the region width and height.
	     *
	     * @param {Object} position An object with {top, left} properties. The values in {top,left} are used to move the region by the given amounts.
	     * @param {Number} [position.left]
	     * @param {Number} [position.top]
	     *
	     * @return {Region} this
	     */
	    setPosition: function(position){
	        var width  = this.getWidth(),
	            height = this.getHeight()

	        if (position.left){
	            position.right  = position.left + width
	        }

	        if (position.top){
	            position.bottom = position.top  + height
	        }

	        return this.set(position)
	    },

	    /**
	     * Sets both the height and the width of this region to the given size.
	     *
	     * @param {Number} size The new size for the region
	     * @return {Region} this
	     */
	    setSize: function(size){
	        if (size.height && size.width){
	            return this.set({
	                right  : this.left + size.width,
	                bottom : this.top + size.height
	            })
	        }

	        if (size.width){
	            this.setWidth(size.width)
	        }

	        if (size.height){
	            this.setHeight(size.height)
	        }

	        return this
	    },



	    /**
	     * @chainable
	     *
	     * Sets the width of this region
	     * @param {Number} width The new width for this region
	     * @return {Region} this
	     */
	    setWidth: function(width){
	        return this.set({
	            right: this.left + width
	        })
	    },

	    /**
	     * @chainable
	     *
	     * Sets the height of this region
	     * @param {Number} height The new height for this region
	     * @return {Region} this
	     */
	    setHeight: function(height){
	        return this.set({
	            bottom: this.top + height
	        })
	    },

	    /**
	     * Sets the given properties on this region
	     *
	     * @param {Object} directions an object containing top, left, and EITHER bottom, right OR width, height
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     *
	     * @param {Number} [directions.bottom]
	     * @param {Number} [directions.right]
	     *
	     * @param {Number} [directions.width]
	     * @param {Number} [directions.height]
	     *
	     *
	     * @return {Region} this
	     */
	    set: function(directions){
	        var before = this._before()

	        copyList(directions, this, ['left','top','bottom','right'])

	        if (directions.bottom == null && directions.height != null){
	            this.bottom = this.top + directions.height
	        }
	        if (directions.right == null && directions.width != null){
	            this.right = this.left + directions.width
	        }

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * Retrieves the given property from this region. If no property is given, return an object
	     * with {left, top, right, bottom}
	     *
	     * @param {String} [dir] the property to retrieve from this region
	     * @return {Number/Object}
	     */
	    get: function(dir){
	        return dir? this[dir]:
	                    copyList(this, {}, ['left','right','top','bottom'])
	    },

	    /**
	     * Shifts this region to either top, or left or both.
	     * Shift is similar to {@link #add} by the fact that it adds the given dimensions to top/left sides, but also adds the given dimensions
	     * to bottom and right
	     *
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     *
	     * @return {Region} this
	     */
	    shift: function(directions){

	        var before = this._before()

	        if (directions.top){
	            this.top    += directions.top
	            this.bottom += directions.top
	        }

	        if (directions.left){
	            this.left  += directions.left
	            this.right += directions.left
	        }

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * Same as {@link #shift}, but substracts the given values
	     * @chainable
	     *
	     * @param {Object} directions
	     * @param {Number} [directions.top]
	     * @param {Number} [directions.left]
	     *
	     * @return {Region} this
	     */
	    unshift: function(directions){

	        if (directions.top){
	            directions.top *= -1
	        }

	        if (directions.left){
	            directions.left *= -1
	        }

	        return this.shift(directions)
	    },

	    /**
	     * Compare this region and the given region. Return true if they have all the same size and position
	     * @param  {Region} region The region to compare with
	     * @return {Boolean}       True if this and region have same size and position
	     */
	    equals: function(region){
	        return this.equalsPosition(region) && this.equalsSize(region)
	    },

	    /**
	     * Returns true if this region has the same bottom,right properties as the given region
	     * @param  {Region/Object} size The region to compare against
	     * @return {Boolean}       true if this region is the same size as the given size
	     */
	    equalsSize: function(size){
	        var isInstance = size instanceof REGION

	        var s = {
	            width: size.width == null && isInstance?
	                    size.getWidth():
	                    size.width,

	            height: size.height == null && isInstance?
	                    size.getHeight():
	                    size.height
	        }
	        return this.getWidth() == s.width && this.getHeight() == s.height
	    },

	    /**
	     * Returns true if this region has the same top,left properties as the given region
	     * @param  {Region} region The region to compare against
	     * @return {Boolean}       true if this.top == region.top and this.left == region.left
	     */
	    equalsPosition: function(region){
	        return this.top == region.top && this.left == region.left
	    },

	    /**
	     * Adds the given ammount to the left side of this region
	     * @param {Number} left The ammount to add
	     * @return {Region} this
	     */
	    addLeft: function(left){
	        var before = this._before()

	        this.left = this[0] = this.left + left

	        this._after(before)

	        return this
	    },

	    /**
	     * Adds the given ammount to the top side of this region
	     * @param {Number} top The ammount to add
	     * @return {Region} this
	     */
	    addTop: function(top){
	        var before = this._before()

	        this.top = this[1] = this.top + top

	        this._after(before)

	        return this
	    },

	    /**
	     * Adds the given ammount to the bottom side of this region
	     * @param {Number} bottom The ammount to add
	     * @return {Region} this
	     */
	    addBottom: function(bottom){
	        var before = this._before()

	        this.bottom += bottom

	        this._after(before)

	        return this
	    },

	    /**
	     * Adds the given ammount to the right side of this region
	     * @param {Number} right The ammount to add
	     * @return {Region} this
	     */
	    addRight: function(right){
	        var before = this._before()

	        this.right += right

	        this._after(before)

	        return this
	    },

	    /**
	     * Minimize the top side.
	     * @return {Region} this
	     */
	    minTop: function(){
	        return this.expand({top: 1})
	    },
	    /**
	     * Minimize the bottom side.
	     * @return {Region} this
	     */
	    maxBottom: function(){
	        return this.expand({bottom: 1})
	    },
	    /**
	     * Minimize the left side.
	     * @return {Region} this
	     */
	    minLeft: function(){
	        return this.expand({left: 1})
	    },
	    /**
	     * Maximize the right side.
	     * @return {Region} this
	     */
	    maxRight: function(){
	        return this.expand({right: 1})
	    },

	    /**
	     * Expands this region to the dimensions of the given region, or the document region, if no region is expanded.
	     * But only expand the given sides (any of the four can be expanded).
	     *
	     * @param {Object} directions
	     * @param {Boolean} [directions.top]
	     * @param {Boolean} [directions.bottom]
	     * @param {Boolean} [directions.left]
	     * @param {Boolean} [directions.right]
	     *
	     * @param {Region} [region] the region to expand to, defaults to the document region
	     * @return {Region} this region
	     */
	    expand: function(directions, region){
	        var docRegion = region || REGION.getDocRegion()
	        var list      = []
	        var direction
	        var before = this._before()

	        for (direction in directions) if ( hasOwn(directions, direction) ) {
	            list.push(direction)
	        }

	        copyList(docRegion, this, list)

	        this[0] = this.left
	        this[1] = this.top

	        this._after(before)

	        return this
	    },

	    /**
	     * Returns a clone of this region
	     * @return {Region} A new region, with the same position and dimension as this region
	     */
	    clone: function(){
	        return new REGION({
	                    top    : this.top,
	                    left   : this.left,
	                    right  : this.right,
	                    bottom : this.bottom
	                })
	    },

	    /**
	     * Returns true if this region contains the given point
	     * @param {Number/Object} x the x coordinate of the point
	     * @param {Number} [y] the y coordinate of the point
	     *
	     * @return {Boolean} true if this region constains the given point, false otherwise
	     */
	    containsPoint: function(x, y){
	        if (arguments.length == 1){
	            y = x.y
	            x = x.x
	        }

	        return this.left <= x  &&
	               x <= this.right &&
	               this.top <= y   &&
	               y <= this.bottom
	    },

	    /**
	     *
	     * @param region
	     *
	     * @return {Boolean} true if this region contains the given region, false otherwise
	     */
	    containsRegion: function(region){
	        return this.containsPoint(region.left, region.top)    &&
	               this.containsPoint(region.right, region.bottom)
	    },

	    /**
	     * Returns an object with the difference for {top, bottom} positions betwen this and the given region,
	     *
	     * See {@link #diff}
	     * @param  {Region} region The region to use for diff
	     * @return {Object}        {top,bottom}
	     */
	    diffHeight: function(region){
	        return this.diff(region, {top: true, bottom: true})
	    },

	    /**
	     * Returns an object with the difference for {left, right} positions betwen this and the given region,
	     *
	     * See {@link #diff}
	     * @param  {Region} region The region to use for diff
	     * @return {Object}        {left,right}
	     */
	    diffWidth: function(region){
	        return this.diff(region, {left: true, right: true})
	    },

	    /**
	     * Returns an object with the difference in sizes for the given directions, between this and region
	     *
	     * @param  {Region} region     The region to use for diff
	     * @param  {Object} directions An object with the directions to diff. Can have any of the following keys:
	     *  * left
	     *  * right
	     *  * top
	     *  * bottom
	     *
	     * @return {Object} and object with the same keys as the directions object, but the values being the
	     * differences between this region and the given region
	     */
	    diff: function(region, directions){
	        var result = {}
	        var dirName

	        for (dirName in directions) if ( hasOwn(directions, dirName) ) {
	            result[dirName] = this[dirName] - region[dirName]
	        }

	        return result
	    },

	    /**
	     * Returns the position, in {left,top} properties, of this region
	     *
	     * @return {Object} {left,top}
	     */
	    getPosition: function(){
	        return {
	            left: this.left,
	            top : this.top
	        }
	    },

	    /**
	     * Returns the point at the given position from this region.
	     *
	     * @param {String} position Any of:
	     *
	     *  * 'cx' - See {@link #getPointXCenter}
	     *  * 'cy' - See {@link #getPointYCenter}
	     *  * 'b'  - See {@link #getPointBottom}
	     *  * 'bc' - See {@link #getPointBottomCenter}
	     *  * 'l'  - See {@link #getPointLeft}
	     *  * 'lc' - See {@link #getPointLeftCenter}
	     *  * 't'  - See {@link #getPointTop}
	     *  * 'tc' - See {@link #getPointTopCenter}
	     *  * 'r'  - See {@link #getPointRight}
	     *  * 'rc' - See {@link #getPointRightCenter}
	     *  * 'c'  - See {@link #getPointCenter}
	     *  * 'tl' - See {@link #getPointTopLeft}
	     *  * 'bl' - See {@link #getPointBottomLeft}
	     *  * 'br' - See {@link #getPointBottomRight}
	     *  * 'tr' - See {@link #getPointTopRight}
	     *
	     * @param {Boolean} asLeftTop
	     *
	     * @return {Object} either an object with {x,y} or {left,top} if asLeftTop is true
	     */
	    getPoint: function(position, asLeftTop){

	        //<debug>
	        if (!POINT_POSITIONS[position]) {
	            console.warn('The position ', position, ' could not be found! Available options are tl, bl, tr, br, l, r, t, b.');
	        }
	        //</debug>

	        var method = 'getPoint' + POINT_POSITIONS[position],
	            result = this[method]()

	        if (asLeftTop){
	            return {
	                left : result.x,
	                top  : result.y
	            }
	        }

	        return result
	    },

	    /**
	     * Returns a point with x = null and y being the middle of the left region segment
	     * @return {Object} {x,y}
	     */
	    getPointYCenter: function(){
	        return { x: null, y: this.top + this.getHeight() / 2 }
	    },

	    /**
	     * Returns a point with y = null and x being the middle of the top region segment
	     * @return {Object} {x,y}
	     */
	    getPointXCenter: function(){
	        return { x: this.left + this.getWidth() / 2, y: null }
	    },

	    /**
	     * Returns a point with x = null and y the region top position on the y axis
	     * @return {Object} {x,y}
	     */
	    getPointTop: function(){
	        return { x: null, y: this.top }
	    },

	    /**
	     * Returns a point that is the middle point of the region top segment
	     * @return {Object} {x,y}
	     */
	    getPointTopCenter: function(){
	        return { x: this.left + this.getWidth() / 2, y: this.top }
	    },

	    /**
	     * Returns a point that is the top-left point of the region
	     * @return {Object} {x,y}
	     */
	    getPointTopLeft: function(){
	        return { x: this.left, y: this.top}
	    },

	    /**
	     * Returns a point that is the top-right point of the region
	     * @return {Object} {x,y}
	     */
	    getPointTopRight: function(){
	        return { x: this.right, y: this.top}
	    },

	    /**
	     * Returns a point with x = null and y the region bottom position on the y axis
	     * @return {Object} {x,y}
	     */
	    getPointBottom: function(){
	        return { x: null, y: this.bottom }
	    },

	    /**
	     * Returns a point that is the middle point of the region bottom segment
	     * @return {Object} {x,y}
	     */
	    getPointBottomCenter: function(){
	        return { x: this.left + this.getWidth() / 2, y: this.bottom }
	    },

	    /**
	     * Returns a point that is the bottom-left point of the region
	     * @return {Object} {x,y}
	     */
	    getPointBottomLeft: function(){
	        return { x: this.left, y: this.bottom}
	    },

	    /**
	     * Returns a point that is the bottom-right point of the region
	     * @return {Object} {x,y}
	     */
	    getPointBottomRight: function(){
	        return { x: this.right, y: this.bottom}
	    },

	    /**
	     * Returns a point with y = null and x the region left position on the x axis
	     * @return {Object} {x,y}
	     */
	    getPointLeft: function(){
	        return { x: this.left, y: null }
	    },

	    /**
	     * Returns a point that is the middle point of the region left segment
	     * @return {Object} {x,y}
	     */
	    getPointLeftCenter: function(){
	        return { x: this.left, y: this.top + this.getHeight() / 2 }
	    },

	    /**
	     * Returns a point with y = null and x the region right position on the x axis
	     * @return {Object} {x,y}
	     */
	    getPointRight: function(){
	        return { x: this.right, y: null }
	    },

	    /**
	     * Returns a point that is the middle point of the region right segment
	     * @return {Object} {x,y}
	     */
	    getPointRightCenter: function(){
	        return { x: this.right, y: this.top + this.getHeight() / 2 }
	    },

	    /**
	     * Returns a point that is the center of the region
	     * @return {Object} {x,y}
	     */
	    getPointCenter: function(){
	        return { x: this.left + this.getWidth() / 2, y: this.top + this.getHeight() / 2 }
	    },

	    /**
	     * @return {Number} returns the height of the region
	     */
	    getHeight: function(){
	        return this.bottom - this.top
	    },

	    /**
	     * @return {Number} returns the width of the region
	     */
	    getWidth: function(){
	        return this.right - this.left
	    },

	    /**
	     * @return {Number} returns the top property of the region
	     */
	    getTop: function(){
	        return this.top
	    },

	    /**
	     * @return {Number} returns the left property of the region
	     */
	    getLeft: function(){
	        return this.left
	    },

	    /**
	     * @return {Number} returns the bottom property of the region
	     */
	    getBottom: function(){
	        return this.bottom
	    },

	    /**
	     * @return {Number} returns the right property of the region
	     */
	    getRight: function(){
	        return this.right
	    },

	    /**
	     * Returns the area of the region
	     * @return {Number} the computed area
	     */
	    getArea: function(){
	        return this.getWidth() * this.getHeight()
	    },

	    constrainTo: function(contrain){
	        var intersect = this.getIntersection(contrain)
	        var shift

	        if (!intersect || !intersect.equals(this)){

	            var contrainWidth  = contrain.getWidth(),
	                contrainHeight = contrain.getHeight()

	            if (this.getWidth() > contrainWidth){
	                this.left = contrain.left
	                this.setWidth(contrainWidth)
	            }

	            if (this.getHeight() > contrainHeight){
	                this.top = contrain.top
	                this.setHeight(contrainHeight)
	            }

	            shift = {}

	            if (this.right > contrain.right){
	                shift.left = contrain.right - this.right
	            }

	            if (this.bottom > contrain.bottom){
	                shift.top = contrain.bottom - this.bottom
	            }

	            if (this.left < contrain.left){
	                shift.left = contrain.left - this.left
	            }

	            if (this.top < contrain.top){
	                shift.top = contrain.top - this.top
	            }

	            this.shift(shift)

	            return true
	        }

	        return false
	    },

	    __IS_REGION: true

	    /**
	     * @property {Number} top
	     */

	    /**
	     * @property {Number} right
	     */

	    /**
	     * @property {Number} bottom
	     */

	    /**
	     * @property {Number} left
	     */

	    /**
	     * @property {Number} [0] the top property
	     */

	    /**
	     * @property {Number} [1] the left property
	     */

	    /**
	     * @method getIntersection
	     * Returns a region that is the intersection of this region and the given region
	     * @param  {Region} region The region to intersect with
	     * @return {Region}        The intersection region
	     */

	    /**
	     * @method getUnion
	     * Returns a region that is the union of this region with the given region
	     * @param  {Region} region  The region to make union with
	     * @return {Region}        The union region. The smallest region that contains both this and the given region.
	     */

	}, REGION.prototype)

	Object.defineProperties(REGION.prototype, {
	    width: {
	        get: function(){
	            return this.getWidth()
	        },
	        set: function(width){
	            return this.setWidth(width)
	        }
	    },
	    height: {
	        get: function(){
	            return this.getHeight()
	        },
	        set: function(height){
	            return this.setHeight(height)
	        }
	    }
	})

	__webpack_require__(24)(REGION)

	module.exports = REGION

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	            value       : ctor,
	            enumerable  : false,
	            writable    : true,
	            configurable: true
	        }
	    })
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @static
	 * Returns true if the given region is valid, false otherwise.
	 * @param  {Region} region The region to check
	 * @return {Boolean}        True, if the region is valid, false otherwise.
	 * A region is valid if
	 *  * left <= right  &&
	 *  * top  <= bottom
	 */
	module.exports = function validate(region){

	    var isValid = true

	    if (region.right < region.left){
	        isValid = false
	        region.right = region.left
	    }

	    if (region.bottom < region.top){
	        isValid = false
	        region.bottom = region.top
	    }

	    return isValid
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn   = __webpack_require__(26)
	var VALIDATE = __webpack_require__(23)

	module.exports = function(REGION){

	    var MAX = Math.max
	    var MIN = Math.min

	    var statics = {
	        init: function(){
	            var exportAsNonStatic = {
	                getIntersection      : true,
	                getIntersectionArea  : true,
	                getIntersectionHeight: true,
	                getIntersectionWidth : true,
	                getUnion             : true
	            }
	            var thisProto = REGION.prototype
	            var newName

	            var exportHasOwn = hasOwn(exportAsNonStatic)
	            var methodName

	            for (methodName in exportAsNonStatic) if (exportHasOwn(methodName)) {
	                newName = exportAsNonStatic[methodName]
	                if (typeof newName != 'string'){
	                    newName = methodName
	                }

	                ;(function(proto, methodName, protoMethodName){

	                    proto[methodName] = function(region){
	                        //<debug>
	                        if (!REGION[protoMethodName]){
	                            console.warn('cannot find method ', protoMethodName,' on ', REGION)
	                        }
	                        //</debug>
	                        return REGION[protoMethodName](this, region)
	                    }

	                })(thisProto, newName, methodName);
	            }
	        },

	        validate: VALIDATE,

	        /**
	         * Returns the region corresponding to the documentElement
	         * @return {Region} The region corresponding to the documentElement. This region is the maximum region visible on the screen.
	         */
	        getDocRegion: function(){
	            return REGION.fromDOM(document.documentElement)
	        },

	        from: function(reg){
	            if (reg.__IS_REGION){
	                return reg
	            }

	            if (typeof document != 'undefined'){
	                if (typeof HTMLElement != 'undefined' && reg instanceof HTMLElement){
	                    return REGION.fromDOM(reg)
	                }

	                if (reg.type && typeof reg.pageX !== 'undefined' && typeof reg.pageY !== 'undefined'){
	                    return REGION.fromEvent(reg)
	                }
	            }

	            return REGION(reg)
	        },

	        fromEvent: function(event){
	            return REGION.fromPoint({
	                x: event.pageX,
	                y: event.pageY
	            })
	        },

	        fromDOM: function(dom){
	            var rect = dom.getBoundingClientRect()
	            // var docElem = document.documentElement
	            // var win     = window

	            // var top  = rect.top + win.pageYOffset - docElem.clientTop
	            // var left = rect.left + win.pageXOffset - docElem.clientLeft

	            return new REGION({
	                top   : rect.top,
	                left  : rect.left,
	                bottom: rect.bottom,
	                right : rect.right
	            })
	        },

	        /**
	         * @static
	         * Returns a region that is the intersection of the given two regions
	         * @param  {Region} first  The first region
	         * @param  {Region} second The second region
	         * @return {Region/Boolean}        The intersection region or false if no intersection found
	         */
	        getIntersection: function(first, second){

	            var area = this.getIntersectionArea(first, second)

	            if (area){
	                return new REGION(area)
	            }

	            return false
	        },

	        getIntersectionWidth: function(first, second){
	            var minRight  = MIN(first.right, second.right)
	            var maxLeft   = MAX(first.left,  second.left)

	            if (maxLeft < minRight){
	                return minRight  - maxLeft
	            }

	            return 0
	        },

	        getIntersectionHeight: function(first, second){
	            var maxTop    = MAX(first.top,   second.top)
	            var minBottom = MIN(first.bottom,second.bottom)

	            if (maxTop  < minBottom){
	                return minBottom - maxTop
	            }

	            return 0
	        },

	        getIntersectionArea: function(first, second){
	            var maxTop    = MAX(first.top,   second.top)
	            var minRight  = MIN(first.right, second.right)
	            var minBottom = MIN(first.bottom,second.bottom)
	            var maxLeft   = MAX(first.left,  second.left)

	            if (
	                    maxTop  < minBottom &&
	                    maxLeft < minRight
	                ){
	                return {
	                    top    : maxTop,
	                    right  : minRight,
	                    bottom : minBottom,
	                    left   : maxLeft,

	                    width  : minRight  - maxLeft,
	                    height : minBottom - maxTop
	                }
	            }

	            return false
	        },

	        /**
	         * @static
	         * Returns a region that is the union of the given two regions
	         * @param  {Region} first  The first region
	         * @param  {Region} second The second region
	         * @return {Region}        The union region. The smallest region that contains both given regions.
	         */
	        getUnion: function(first, second){
	            var top    = MIN(first.top,   second.top)
	            var right  = MAX(first.right, second.right)
	            var bottom = MAX(first.bottom,second.bottom)
	            var left   = MIN(first.left,  second.left)

	            return new REGION(top, right, bottom, left)
	        },

	        /**
	         * @static
	         * Returns a region. If the reg argument is a region, returns it, otherwise return a new region built from the reg object.
	         *
	         * @param  {Region} reg A region or an object with either top, left, bottom, right or
	         * with top, left, width, height
	         * @return {Region} A region
	         */
	        getRegion: function(reg){
	            return REGION.from(reg)
	        },

	        /**
	         * Creates a region that corresponds to a point.
	         *
	         * @param  {Object} xy The point
	         * @param  {Number} xy.x
	         * @param  {Number} xy.y
	         *
	         * @return {Region}    The new region, with top==xy.y, bottom = xy.y and left==xy.x, right==xy.x
	         */
	        fromPoint: function(xy){
	            return new REGION({
	                        top    : xy.y,
	                        bottom : xy.y,
	                        left   : xy.x,
	                        right  : xy.x
	                    })
	        }
	    }

	    Object.keys(statics).forEach(function(key){
	        REGION[key] = statics[key]
	    })

	    REGION.init()
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var hasOwn = Object.prototype.hasOwnProperty

	function curry(fn, n){

	    if (typeof n !== 'number'){
	        n = fn.length
	    }

	    function getCurryClosure(prevArgs){

	        function curryClosure() {

	            var len  = arguments.length
	            var args = [].concat(prevArgs)

	            if (len){
	                args.push.apply(args, arguments)
	            }

	            if (args.length < n){
	                return getCurryClosure(args)
	            }

	            return fn.apply(this, args)
	        }

	        return curryClosure
	    }

	    return getCurryClosure([])
	}


	module.exports = curry(function(object, property){
	    return hasOwn.call(object, property)
	})

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var getInstantiatorFunction = __webpack_require__(30)

	module.exports = function(fn, args){
		return getInstantiatorFunction(args.length)(fn, args)
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(){

	    'use strict'

	    var HAS_OWN       = Object.prototype.hasOwnProperty,
	        STR_OBJECT    = 'object',
	        STR_UNDEFINED = 'undefined'

	    return {

	        /**
	         * Copies all properties from source to destination
	         *
	         *      copy({name: 'jon',age:5}, this);
	         *      // => this will have the 'name' and 'age' properties set to 'jon' and 5 respectively
	         *
	         * @param {Object} source
	         * @param {Object} destination
	         *
	         * @return {Object} destination
	         */
	        copy: __webpack_require__(31),

	        /**
	         * Copies all properties from source to destination, if the property does not exist into the destination
	         *
	         *      copyIf({name: 'jon',age:5}, {age:7})
	         *      // => { name: 'jon', age: 7}
	         *
	         * @param {Object} source
	         * @param {Object} destination
	         *
	         * @return {Object} destination
	         */
	        copyIf: __webpack_require__(32),

	        /**
	         * Copies all properties from source to a new object, with the given value. This object is returned
	         *
	         *      copyAs({name: 'jon',age:5})
	         *      // => the resulting object will have the 'name' and 'age' properties set to 1
	         *
	         * @param {Object} source
	         * @param {Object/Number/String} [value=1]
	         *
	         * @return {Object} destination
	         */
	        copyAs: function(source, value){

	            var destination = {}

	            value = value || 1

	            if (source != null && typeof source === STR_OBJECT ){

	                for (var i in source) if ( HAS_OWN.call(source, i) ) {
	                    destination[i] = value
	                }

	            }

	            return destination
	        },

	        /**
	         * Copies all properties named in the list, from source to destination
	         *
	         *      copyList({name: 'jon',age:5, year: 2006}, {}, ['name','age'])
	         *      // => {name: 'jon', age: 5}
	         *
	         * @param {Object} source
	         * @param {Object} destination
	         * @param {Array} list the array with the names of the properties to copy
	         *
	         * @return {Object} destination
	         */
	        copyList: __webpack_require__(33),

	        /**
	         * Copies all properties named in the list, from source to destination, if the property does not exist into the destination
	         *
	         *      copyListIf({name: 'jon',age:5, year: 2006}, {age: 10}, ['name','age'])
	         *      // => {name: 'jon', age: 10}
	         *
	         * @param {Object} source
	         * @param {Object} destination
	         * @param {Array} list the array with the names of the properties to copy
	         *
	         * @return {Object} destination
	         */
	        copyListIf: __webpack_require__(34),

	        /**
	         * Copies all properties named in the namedKeys, from source to destination
	         *
	         *      copyKeys({name: 'jon',age:5, year: 2006, date: '2010/05/12'}, {}, {name:1 ,age: true, year: 'theYear'})
	         *      // => {name: 'jon', age: 5, theYear: 2006}
	         *
	         * @param {Object} source
	         * @param {Object} destination
	         * @param {Object} namedKeys an object with keys denoting the properties to be copied
	         *
	         * @return {Object} destination
	         */
	        copyKeys: __webpack_require__(35),

	        /**
	         * Copies all properties named in the namedKeys, from source to destination,
	         * but only if the property does not already exist in the destination object
	         *
	         *      copyKeysIf({name: 'jon',age:5, year: 2006}, {aname: 'test'}, {name:'aname' ,age: true})
	         *      // => {aname: 'test', age: 5}
	         *
	         * @param {Object} source
	         * @param {Object} destination
	         * @param {Object} namedKeys an object with keys denoting the properties to be copied
	         *
	         * @return {Object} destination
	         */
	        copyKeysIf: __webpack_require__(36),

	        copyExceptKeys: function(source, destination, exceptKeys){
	            destination = destination || {}
	            exceptKeys  = exceptKeys  || {}

	            if (source != null && typeof source === STR_OBJECT ){

	                for (var i in source) if ( HAS_OWN.call(source, i) && !HAS_OWN.call(exceptKeys, i) ) {

	                    destination[i] = source[i]
	                }

	            }

	            return destination
	        },

	        /**
	         * Copies the named keys from source to destination.
	         * For the keys that are functions, copies the functions bound to the source
	         *
	         * @param  {Object} source      The source object
	         * @param  {Object} destination The target object
	         * @param  {Object} namedKeys   An object with the names of the keys to copy The values from the keys in this object
	         *                              need to be either numbers or booleans if you want to copy the property under the same name,
	         *                              or a string if you want to copy the property under a different name
	         * @return {Object}             Returns the destination object
	         */
	        bindCopyKeys: function(source, destination, namedKeys){
	            if (arguments.length == 2){
	                namedKeys = destination
	                destination = null
	            }

	            destination = destination || {}

	            if (
	                       source != null && typeof source    === STR_OBJECT &&
	                    namedKeys != null && typeof namedKeys === STR_OBJECT
	                ) {


	                var typeOfNamedProperty,
	                    namedPropertyValue,

	                    typeOfSourceProperty,
	                    propValue


	                for(var propName in namedKeys) if (HAS_OWN.call(namedKeys, propName)) {

	                    namedPropertyValue = namedKeys[propName]
	                    typeOfNamedProperty = typeof namedPropertyValue

	                    propValue = source[propName]
	                    typeOfSourceProperty = typeof propValue


	                    if ( typeOfSourceProperty !== STR_UNDEFINED ) {

	                        destination[
	                            typeOfNamedProperty == 'string'?
	                                            namedPropertyValue :
	                                            propName
	                            ] = typeOfSourceProperty == 'function' ?
	                                            propValue.bind(source):
	                                            propValue
	                    }
	                }
	            }

	            return destination
	        }
	    }

	}()

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(37)

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(){

	    'use strict';

	    var fns = {}

	    return function(len){

	        if ( ! fns [len ] ) {

	            var args = []
	            var i    = 0

	            for (; i < len; i++ ) {
	                args.push( 'a[' + i + ']')
	            }

	            fns[len] = new Function(
	                            'c',
	                            'a',
	                            'return new c(' + args.join(',') + ')'
	                        )
	        }

	        return fns[len]
	    }

	}()

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var HAS_OWN       = Object.prototype.hasOwnProperty
	var STR_OBJECT    = 'object'

	/**
	 * Copies all properties from source to destination
	 *
	 *      copy({name: 'jon',age:5}, this);
	 *      // => this will have the 'name' and 'age' properties set to 'jon' and 5 respectively
	 *
	 * @param {Object} source
	 * @param {Object} destination
	 *
	 * @return {Object} destination
	 */
	module.exports = function(source, destination){

	    destination = destination || {}

	    if (source != null && typeof source === STR_OBJECT ){

	        for (var i in source) if ( HAS_OWN.call(source, i) ) {
	            destination[i] = source[i]
	        }

	    }

	    return destination
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var HAS_OWN       = Object.prototype.hasOwnProperty
	var STR_OBJECT    = 'object'
	var STR_UNDEFINED = 'undefined'

	/**
	 * Copies all properties from source to destination, if the property does not exist into the destination
	 *
	 *      copyIf({name: 'jon',age:5}, {age:7})
	 *      // => { name: 'jon', age: 7}
	 *
	 * @param {Object} source
	 * @param {Object} destination
	 *
	 * @return {Object} destination
	 */
	module.exports = function(source, destination){
	    destination = destination || {}

	    if (source != null && typeof source === STR_OBJECT){

	        for (var i in source) if ( HAS_OWN.call(source, i) && (typeof destination[i] === STR_UNDEFINED) ) {

	            destination[i] = source[i]

	        }
	    }

	    return destination
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var STR_UNDEFINED = 'undefined'

	/**
	 * Copies all properties named in the list, from source to destination
	 *
	 *      copyList({name: 'jon',age:5, year: 2006}, {}, ['name','age'])
	 *      // => {name: 'jon', age: 5}
	 *
	 * @param {Object} source
	 * @param {Object} destination
	 * @param {Array} list the array with the names of the properties to copy
	 *
	 * @return {Object} destination
	 */
	module.exports = function(source, destination, list){
	    if (arguments.length < 3){
	        list = destination
	        destination = null
	    }

	    destination = destination || {}
	    list        = list || Object.keys(source)

	    var i   = 0
	    var len = list.length
	    var propName

	    for ( ; i < len; i++ ){
	        propName = list[i]

	        if ( typeof source[propName] !== STR_UNDEFINED ) {
	            destination[list[i]] = source[list[i]]
	        }
	    }

	    return destination
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var STR_UNDEFINED = 'undefined'

	/**
	 * Copies all properties named in the list, from source to destination, if the property does not exist into the destination
	 *
	 *      copyListIf({name: 'jon',age:5, year: 2006}, {age: 10}, ['name','age'])
	 *      // => {name: 'jon', age: 10}
	 *
	 * @param {Object} source
	 * @param {Object} destination
	 * @param {Array} list the array with the names of the properties to copy
	 *
	 * @return {Object} destination
	 */
	module.exports = function(source, destination, list){
	    if (arguments.length < 3){
	        list = destination
	        destination = null
	    }

	    destination = destination || {}
	    list        = list || Object.keys(source)

	    var i   = 0
	    var len = list.length
	    var propName

	    for ( ; i < len ; i++ ){
	        propName = list[i]
	        if (
	                (typeof source[propName]      !== STR_UNDEFINED) &&
	                (typeof destination[propName] === STR_UNDEFINED)
	            ){
	            destination[propName] = source[propName]
	        }
	    }

	    return destination
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var STR_UNDEFINED = 'undefined'
	var STR_OBJECT    = 'object'
	var HAS_OWN       = Object.prototype.hasOwnProperty

	var copyList = __webpack_require__(33)

	/**
	 * Copies all properties named in the namedKeys, from source to destination
	 *
	 *      copyKeys({name: 'jon',age:5, year: 2006, date: '2010/05/12'}, {}, {name:1 ,age: true, year: 'theYear'})
	 *      // => {name: 'jon', age: 5, theYear: 2006}
	 *
	 * @param {Object} source
	 * @param {Object} destination
	 * @param {Object} namedKeys an object with keys denoting the properties to be copied
	 *
	 * @return {Object} destination
	 */
	module.exports = function(source, destination, namedKeys){
	    if (arguments.length < 3 ){
	        namedKeys = destination
	        destination = null
	    }

	    destination = destination || {}

	    if (!namedKeys || Array.isArray(namedKeys)){
	        return copyList(source, destination, namedKeys)
	    }

	    if (
	           source != null && typeof source    === STR_OBJECT &&
	        namedKeys != null && typeof namedKeys === STR_OBJECT
	    ) {
	        var typeOfNamedProperty
	        var namedPropertyValue

	        for  (var propName in namedKeys) if ( HAS_OWN.call(namedKeys, propName) ) {
	            namedPropertyValue  = namedKeys[propName]
	            typeOfNamedProperty = typeof namedPropertyValue

	            if (typeof source[propName] !== STR_UNDEFINED){
	                destination[typeOfNamedProperty == 'string'? namedPropertyValue : propName] = source[propName]
	            }
	        }
	    }

	    return destination
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var STR_UNDEFINED = 'undefined'
	var STR_OBJECT    = 'object'
	var HAS_OWN       = Object.prototype.hasOwnProperty

	var copyListIf = __webpack_require__(34)

	/**
	 * Copies all properties named in the namedKeys, from source to destination,
	 * but only if the property does not already exist in the destination object
	 *
	 *      copyKeysIf({name: 'jon',age:5, year: 2006}, {aname: 'test'}, {name:'aname' ,age: true})
	 *      // => {aname: 'test', age: 5}
	 *
	 * @param {Object} source
	 * @param {Object} destination
	 * @param {Object} namedKeys an object with keys denoting the properties to be copied
	 *
	 * @return {Object} destination
	 */
	module.exports = function(source, destination, namedKeys){
	    if (arguments.length < 3 ){
	        namedKeys = destination
	        destination = null
	    }

	    destination = destination || {}

	    if (!namedKeys || Array.isArray(namedKeys)){
	        return copyListIf(source, destination, namedKeys)
	    }

	    if (
	               source != null && typeof source    === STR_OBJECT &&
	            namedKeys != null && typeof namedKeys === STR_OBJECT
	        ) {

	            var typeOfNamedProperty
	            var namedPropertyValue
	            var newPropertyName

	            for (var propName in namedKeys) if ( HAS_OWN.call(namedKeys, propName) ) {

	                namedPropertyValue  = namedKeys[propName]
	                typeOfNamedProperty = typeof namedPropertyValue
	                newPropertyName     = typeOfNamedProperty == 'string'? namedPropertyValue : propName

	                if (
	                        typeof      source[propName]        !== STR_UNDEFINED &&
	                        typeof destination[newPropertyName] === STR_UNDEFINED
	                    ) {
	                    destination[newPropertyName] = source[propName]
	                }

	            }
	        }

	    return destination
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = {
	    'numeric'  : __webpack_require__(38),
	    'number'   : __webpack_require__(39),
	    'int'      : __webpack_require__(40),
	    'float'    : __webpack_require__(41),
	    'string'   : __webpack_require__(42),
	    'function' : __webpack_require__(43),
	    'object'   : __webpack_require__(44),
	    'arguments': __webpack_require__(45),
	    'boolean'  : __webpack_require__(46),
	    'date'     : __webpack_require__(47),
	    'regexp'   : __webpack_require__(48),
	    'array'    : __webpack_require__(49)
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function(value){
	    return !isNaN( parseFloat( value ) ) && isFinite( value )
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function(value){
	    return typeof value === 'number' && isFinite(value)
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var number = __webpack_require__(39)

	module.exports = function(value){
	    return number(value) && (value === parseInt(value, 10))
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var number = __webpack_require__(39)

	module.exports = function(value){
	    return number(value) && (value === parseFloat(value, 10)) && !(value === parseInt(value, 10))
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function(value){
	    return typeof value == 'string'
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var objectToString = Object.prototype.toString

	module.exports = function(value){
	    return objectToString.apply(value) === '[object Function]'
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var objectToString = Object.prototype.toString

	module.exports = function(value){
	    return objectToString.apply(value) === '[object Object]'
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var objectToString = Object.prototype.toString

	module.exports = function(value){
	    return objectToString.apply(value) === '[object Arguments]' || !!value.callee
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function(value){
	    return typeof value == 'boolean'
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var objectToString = Object.prototype.toString

	module.exports = function(value){
	    return objectToString.apply(value) === '[object Date]'
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var objectToString = Object.prototype.toString

	module.exports = function(value){
	    return objectToString.apply(value) === '[object RegExp]'
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = function(value){
	    return Array.isArray(value)
	}

/***/ }
/******/ ])
});
