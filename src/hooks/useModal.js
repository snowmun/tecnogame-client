import { useState }  from 'react'

export const useModal = () => {
    
    const [isOpen,setIsOpen] = useState();

    const open= () =>setIsOpen(true);

    const close= () =>setIsOpen(false);

    return [isOpen,open,close]
}


