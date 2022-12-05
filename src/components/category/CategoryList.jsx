
export const CategoryList = ({category}) => {
  return (
    <option key={category._id} value={category._id}> {category.nombreCategoria} </option>
  )
}
