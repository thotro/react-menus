import renderCell from './renderCell'

export default (props) => {
  return props.columns.map(renderCell.bind(null, props))
}
