import { useGetCategory } from "../hooks/useGetCategory"
import { CategoryContext } from "./CategoryContext"


export const CategoryProvider = ({ children }) => {

    const { category: categorys, setCategory, setIsUpdate } = useGetCategory();

    return (
        <CategoryContext.Provider value={{ categorys, setCategory, setIsUpdate }}>
            {children}
        </CategoryContext.Provider>
    )
}
