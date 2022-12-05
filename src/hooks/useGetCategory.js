import { useState, useEffect } from 'react';
import { httpRequest } from '../helpers/httpRequest';

export const useGetCategory = () => {

    const [category, setCategory] = useState([]);

    const [isUpdate, setIsUpdate] = useState(false);

    const listCategory = async () => {

        const resCategory = await httpRequest(import.meta.env.VITE_URL_ALL_CATEGORIES, 'GET');

        const { Data } = resCategory.data;

        setCategory(Data)
    }

    useEffect(() => {
        listCategory();
    }, []);

    useEffect(() => {
        if (isUpdate) {
            listCategory();
            setIsUpdate(false);
        }
    }, [isUpdate]);


    return {
        category,
        setCategory,
        setIsUpdate
    }
}
