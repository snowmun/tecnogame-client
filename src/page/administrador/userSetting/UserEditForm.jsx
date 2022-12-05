import { useEffect } from 'react';
import { Modal, Form, Button, Col, Card, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useForm } from '../../../hooks';
import { httpRequest, toast } from '../../../helpers';

export const UserEditForm = ({ isOpen, close, value, setIsUpdate }) => {

    const { onInputChange, formState, onResetForm } = useForm({
        nombreUsuario: value.nombreUsuario,
        rol: value.rol,
        nombre: value.datosPersoId[0].nombre,
        apellido: value.datosPersoId[0].apellido,
        rut: value.datosPersoId[0].rut,
        fono: value.datosPersoId[0].fono,
        correo: value.datosPersoId[0].correo,
        datosPersoId: value.datosPersoId[0]._id
    });
    useEffect(() => {
        if (!isOpen) {
            onResetForm()
        }
    }, [isOpen])

    const handleUpdate = async (e) => {
        try {
            e.preventDefault();

            const resp = await httpRequest(`${import.meta.env.VITE_URL_UPDATE_USER}${value._id}`, 'UPDATE', formState);

            if (resp.status !== 200) {

                const { data } = resp.response;

                toast('error', data.message || 'Error no controlado');

                return;
            }

            const { message } = resp.data;

            setIsUpdate(true);

            close();

            toast('success', message);

        } catch (error) {

            toast('error', error);

        }
    }
    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header >
                <Form onSubmit={handleUpdate} >
                    <Modal.Title>Editar Usuasrio</Modal.Title>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm="6">
                            <Form.Control name="nombreUsuario" type="text" placeholder="Ingrese Nombre Usuario" value={formState.nombreUsuario} onChange={onInputChange} required />
                        </Col>
                        <Col sm="6">
                            <Form.Control name="correo" type="email" placeholder="Ingrese correo" value={formState.correo} onChange={onInputChange} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Col sm="12">
                            <Form.Control name="rut" type="text" placeholder="Ingrese su rut" value={formState.rut} onChange={onInputChange} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Col sm="12">
                            <Form.Control name="fono" type="number" placeholder="Ingrese su fono" value={formState.fono} onChange={onInputChange} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Col sm="12">
                            <Form.Control name="nombre" type="text" placeholder="Ingrese Nombre" value={formState.nombre} onChange={onInputChange} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Col sm="12">
                            <Form.Control name="apellido" type="text" placeholder="Ingrese apellido" value={formState.apellido} onChange={onInputChange} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Col sm="12">
                            <Form.Select onChange={onInputChange} name="rol" value={formState.rol}>
                                <option value="1" > Cliente </option>
                                <option value="2" > Administrador </option>

                            </Form.Select>
                        </Col>
                    </Form.Group>
                    {/* <Form.Group as={Row} className="mb-3" >
                        <Col sm="12">
                        <Form.Control onChange={onInputChange} name="contrasena" type="password" placeholder="Contraseña" value={formState.contrasena} />
                        </Col>
                    </Form.Group> */}
                    <Form.Group >
                        <Button type="submit" className="RegisterBoton mt-2" variant="success"  >Editar Usuario</Button>
                    </Form.Group>
                </Form>
                <ToastContainer />
            </Modal.Header>
        </Modal>

    )
}