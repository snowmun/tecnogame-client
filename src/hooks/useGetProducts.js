import { useState, useEffect } from 'react';
import { httpRequest } from '../helpers/httpRequest';

export const useGetProducts = () => {

    const [product, setProduct] = useState({
        data: null,
        isLoading: true
    });

    const [isUpdate, setIsUpdate] = useState(false);

    const listProduct = async () => {

        setProduct({
            ...product,
            isLoading: true
        });

        const res = await httpRequest(import.meta.env.VITE_URL_ALL_PRODUCTS, 'GET');

        const { Data } = res.data;
        console.log(Data)
        setProduct({
            data: Data,
            isLoading: false
        });
    }

    useEffect(() => {
        listProduct();
    }, []);

    useEffect(() => {
        if (isUpdate) {
            listProduct();
            setIsUpdate(false);
        }
    }, [isUpdate]);


    return {
        data: product.data,
        isLoading: product.isLoading,
        setProduct,
        setIsUpdate
    }
        ;
}
