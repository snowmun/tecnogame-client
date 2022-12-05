import { useEffect, useState } from "react";
import { httpRequest } from "./httpRequest"

export const validToken = () => {

    const [logged, setLogged] = useState();

    const isValid = async () => {

        const resp = await httpRequest(import.meta.env.VITE_VALID_TOKEN, 'CREATE');

        if (resp.hasOwnProperty('response')) {

            if (resp.status !== 200) {
                localStorage.clear();
                setLogged(false);
                return;
            }
        }

        setLogged(true);
    }

    useEffect(() => {
        isValid();
    }, []);

    return {
        logged
    }
}
