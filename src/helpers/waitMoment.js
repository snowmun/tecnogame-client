import { useState } from "react"


export const waitMoment = () => {

    const [wait, setWait] = useState();

    return {
        wait,
        setWait
    }
}
