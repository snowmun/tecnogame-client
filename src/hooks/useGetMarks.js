import { useState, useEffect } from 'react'
import {httpRequest} from '../helpers/httpRequest';

export const useGetMarks = () => {
    const [mark, setMarca] = useState([]);

    const [isUpdate, setIsUpdate] = useState(false);

    const listMark = async () => {
       
        const resMark = await httpRequest(import.meta.env.VITE_URL_ALL_MARKS,'GET');

        const { Data } = resMark.data;

        setMarca(Data)
    }

    useEffect(() => {
      listMark();
    }, []);

    useEffect(() => {
        if(isUpdate){
            listMark();
            setIsUpdate(false);
        }
    }, [isUpdate]);
    

    return{
        mark,
        setMarca,
        setIsUpdate
    }
}
