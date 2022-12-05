import { useState, useEffect } from 'react';
import { httpRequest } from '../helpers/httpRequest';

export const userGetUser = () => {

    const [user, setUser] = useState([]);

    const [isUpdate, setIsUpdate] = useState(false);

    const selectUser = async () => {

        const resUser = await httpRequest(import.meta.env.VITE_URL_ALL_USERS, 'GET');

        const { Data } = resUser.data;

        setUser(Data)
    }

    useEffect(() => {
        selectUser();
    }, []);

    useEffect(() => {
        if (isUpdate) {
            selectUser();
            setIsUpdate(false);
        }
    }, [isUpdate]);

    return {
        user,
        setUser,
        setIsUpdate
    }
}
