import { useEffect, useState } from "react"
import { validToken } from "../helpers/validToken";
import { UserContext } from "./UserContext"


export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        logged: (localStorage.getItem('user')) ? true : false,
        userData: JSON.parse(localStorage.getItem('user'))
    });

    const { logged } = validToken();

    useEffect(() => {
        if (logged === false) {
            setUser({
                logged: false,
                userData: {}
            })
        }
    }, [logged])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
