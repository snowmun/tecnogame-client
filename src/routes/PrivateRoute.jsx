import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"



export const PrivateRoute = ({ children }) => {

    let rolUser = 1;

    const { user } = useContext(UserContext);

    const { logged, userData } = user;

    if (userData) {
        rolUser = userData.rol;
    }
    return (logged && rolUser == 2) ? children : <Navigate to={'/'} />
}
