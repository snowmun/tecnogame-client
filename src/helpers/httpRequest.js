import axios from 'axios';

export const httpRequest = async (url = '', accion = 'GET', body = {}) => {

    const token = localStorage.getItem('token') || '';

    try {
        switch (accion) {
            case 'GET':

                return await axios.get(url);

            case 'CREATE':

                return await axios.post(url, body, { headers: { token, 'Content-Type': 'application/json' } });

            case 'UPDATE':

                return await axios.put(url, body, { headers: { token, 'Content-Type': 'application/json' } });

            case 'DELETE':

                return await axios.delete(url, { headers: { token } });

            default:

                return await axios.get(url);
        }
    } catch (error) {
        return error
    }
}
