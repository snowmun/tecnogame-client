import { Button, Form, Modal, Row } from "react-bootstrap"
import { httpRequest, toast, waitMoment } from "../../helpers";
import { useForm } from "../../hooks/useForm"

export const Perfil = ({ isOpen, close, user, setUser }) => {

    const { wait, setWait } = waitMoment();

    const { onInputChange, formState } = useForm({
        nombreUser: user.nombreUser,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        fono: user.fono,
        _id: user._id,
        rol: user.rol,
    });


    const onSubmit = async (e) => {
        try {

            setWait(true);

            e.preventDefault();

            const resp = await httpRequest(`${import.meta.env.VITE_URL_UPDATE_USER}${formState._id}`, 'UPDATE', formState);

            if (resp.status !== 200) {
                setWait(false);
                const { data } = resp.response;

                toast('error', data.message || 'Error no controlado');

                return;
            }

            const { message, Data } = resp.data;

            setUser({
                logged: true,
                userData: Data
            });

            localStorage.setItem('user', JSON.stringify(Data));

            toast('success', message);

            close();

        } catch (error) {
            toast('error', error);
        }
    }

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header >
                <Modal.Title>Perfil</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label>Nombre usuario</Form.Label>
                        <Form.Control
                            name="nombreUser"
                            type="text"
                            value={formState.nombreUser}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="nombre"
                            type="text"
                            value={formState.nombre}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            name="apellido"
                            type="text"
                            value={formState.apellido}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                            name="correo"
                            type="text"
                            value={formState.correo}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label>Fono</Form.Label>
                        <Form.Control
                            name="fono"
                            type="text"
                            value={formState.fono}
                            onChange={onInputChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer >
                    <Button variant="secondary" onClick={close} >Cancelar</Button>
                    <Button type="submit" variant="primary" disabled={!!wait}>Actualizar Perfil </Button>
                </Modal.Footer>
            </Form>
        </Modal>

    )
}
