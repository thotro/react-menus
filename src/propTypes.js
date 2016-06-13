import { PropTypes } from 'react'

export default {
  items: PropTypes.array,
  columns: PropTypes.array,
  onMount: PropTypes.func,

  rowActiveStyle: PropTypes.object,
  rowOverStyle: PropTypes.object,
  rowStyle: PropTypes.object,

  cellStyle: PropTypes.object
}
