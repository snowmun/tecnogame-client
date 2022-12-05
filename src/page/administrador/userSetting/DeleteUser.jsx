import {Modal,Alert,Button} from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import {httpRequest, toast} from '../../../helpers';

export const DeleteUser = ({isOpen,close,value,deleteUser}) => {

    const handleDelete = async(id) =>{

        try {

            const resp = await httpRequest(`${import.meta.env.VITE_URL_DELETE_USER}${id}`,'DELETE');

            if(resp.status !== 200){
                const {data} =  resp.response;
                close();
                toast('error',data.message || 'Error no controlado');
            }

            const {message} = resp.data;
            deleteUser(id);
            close();
            toast('success',message);
            
        } catch (error) {
            toast('error',error);
        }
        
    }

    return (

        <Modal show={isOpen} onHide={close}>
            <Modal.Header > 
                <Modal.Title>Eliminar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger">
                ¿Estas Seguro que deseas eliminar este Usuario? 
                <br/>
                <b>Se eliminara permanentemente</b>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close} >Cancelar</Button>
                <Button variant="danger" onClick={() =>{handleDelete(value)}} >Eliminar Producto</Button>
            </Modal.Footer>
            <ToastContainer />
        </Modal>
        
    )
}
