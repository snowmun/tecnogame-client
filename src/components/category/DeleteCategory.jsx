import { useContext } from 'react';
import { Modal, Alert, Button } from 'react-bootstrap'
import { CategoryContext } from '../../context/CategoryContext';
import { httpRequest, toast } from '../../helpers';


export const DeleteCategory = ({ isOpen, close, value }) => {

    const { categorys, setCategory } = useContext(CategoryContext);

    const handleDelete = async (id) => {

        try {

            const resp = await httpRequest(`${import.meta.env.VITE_URL_DELETE_CATEGORY}${id}`, 'DELETE');

            if (resp.status !== 200) {

                const { data } = resp.response;

                close();

                toast('error', data.message || 'Error no controlado');
            }

            const { message } = resp.data;

            setCategory(categorys.filter(cate => cate._id !== id));

            close();

            toast('success', message);

        } catch (error) {

            toast('error', error);

        }

    }


    return (

        <Modal show={isOpen} onHide={close}>
            <Modal.Header >
                <Modal.Title>Eliminar Categoría</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger">
                    ¿Estas Seguro que deseas eliminar esta categoría?
                    <br />
                    <b>Se eliminara permanentemente</b>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close} >Cancelar</Button>
                <Button variant="danger" onClick={() => { handleDelete(value) }} >Eliminar Categoría</Button>
            </Modal.Footer>
        </Modal>

    )
}
