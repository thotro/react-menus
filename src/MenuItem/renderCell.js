import React from 'react'
import assign from 'object-assign'
import MenuItemCell from '../MenuItemCell'

export default (props, column) => {
  const style = assign({}, props.defaultCellStyle, props.cellStyle)

  return <MenuItemCell style={style}>
    {props.data[column]}
  </MenuItemCell>
}
