import Menu from './Menu'

import MenuItem from './MenuItem'
import MenuItemCell from './MenuItemCell'
import MenuSeparator from './MenuSeparator'

export default Menu

Menu.Item = MenuItem
Menu.Item.Cell = MenuItemCell
MenuItem.Cell = MenuItemCell

export {
  MenuItem as Item,
  MenuItemCell as Cell,
  MenuItemCell as ItemCell,
  MenuSeparator as Separator
}
