
export const MarkList = ({mark}) => {
  return (
    <option key={mark._id} value={mark._id}> {mark.nombreMarca} </option>
  )
}
