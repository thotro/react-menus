import Region from 'region-align'
import selectParent from 'select-parent'

export default (domNode) => {
  const menuRegion = Region.from(selectParent('.react-menus', domNode))
  const thisRegion = Region.from(domNode)

  return {
    // pageX : thisRegion.left,
    // pageY : thisRegion.top,

    left: thisRegion.left - menuRegion.left,
    top: thisRegion.top - menuRegion.top,
    width: thisRegion.width,
    height: thisRegion.height
  }
}
