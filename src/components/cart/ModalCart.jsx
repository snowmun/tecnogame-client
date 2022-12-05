
import { Modal, Alert, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { routes } from '../../routes/config-route'

export const ModalCart = ({ isOpen, close }) => {
    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header >
                <Modal.Title>Proceso de compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="info">
                    Para realizar la compra, primero debe iniciar sesión
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" as={NavLink} to={routes.login} onClick={close} >Iniciar sesión</Button>
                <Button variant="danger" onClick={close} >Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
}
