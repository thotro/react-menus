import getConstrainRegion from './getConstrainRegion'

export default (props, subMenuRegion, targetAlignRegion, constrainTo) => {
  const constrainRegion = getConstrainRegion.call(this, constrainTo)

  if (!constrainRegion) {
    return
  }

  if (typeof props.alignSubMenu === 'function'){
    props.alignSubMenu(subMenuRegion, targetAlignRegion, constrainRegion)
  } else {
    const pos = subMenuRegion.alignTo(targetAlignRegion, [
      // align to right
      'tl-tr',
      'bl-br',

      // align to left
      'tr-tl',
      'br-bl'
    ], { constrain: constrainRegion })

    return (pos == 'tl-tr' || pos == 'tr-tl') ?
      //align downwards
      1 :
      //align upwards
      -1
  }
}
