import Region from 'region-align'
import selectParent from 'select-parent'

import { findDOMNode } from 'react-dom'

export default function (constrainTo) {
  let constrainRegion

  if (constrainTo === true) {
    constrainRegion = Region.getDocRegion()
  }

  if (!constrainRegion && typeof constrainTo === 'string') {
    const parent = selectParent(constrainTo, findDOMNode(this))
    constrainRegion = Region.from(parent)
  }

  if (!constrainRegion && typeof constrainTo === 'function') {
    constrainRegion = Region.from(constrainTo())
  }

  return constrainRegion
}
