import {toast as Toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const toast = (state, messaje) => {
    Toast[state](messaje,{
        autoClose:2000,
        pauseOnHover: false,
    });
}