import { Modal, Alert, Button } from 'react-bootstrap'
import { httpRequest, toast } from '../../helpers';

export const DeleteMark = ({ isOpen, close, value, deleteMark }) => {

    const handleDelete = async (id) => {

        try {

            const resp = await httpRequest(`${import.meta.env.VITE_URL_DELETE_MARK}${id}`, 'DELETE');

            if (resp.status !== 200) {

                const { data } = resp.response;

                close();

                toast('error', data.message || 'Error no controlado');
            }

            const { message } = resp.data;

            deleteMark(id);

            close();

            toast('success', message);

        } catch (error) {

            toast('success', error);

        }

    }


    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header >
                <Modal.Title>Eliminar Marca</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger">
                    ¿Estas Seguro que deseas eliminar esta Marca?
                    <br />
                    <b>Se eliminara permanentemente</b>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close} >Cancelar</Button>
                <Button variant="danger" onClick={() => { handleDelete(value) }} >Eliminar Marca</Button>
            </Modal.Footer>
        </Modal>
    )
}
