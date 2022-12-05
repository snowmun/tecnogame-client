import { useMemo } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap"
import { httpRequest, toast } from "../../helpers";
import { useForm } from "../../hooks/useForm"


export const CambiarContra = ({ isOpen, close, user }) => {

    const { formState, onInputChange } = useForm({
        lastPass: '',
        newPass: '',
        repitePass: '',
    });

    const onSubmit = async (e) => {
        try {
            e.preventDefault();

            if (formState.newPass !== formState.repitePass) {
                return toast('error', 'Las contraseña no son iguales');
            }

            const resp = await httpRequest(`${import.meta.env.VITE_URL_UPDATE_USER_PASS}${user._id}`, 'UPDATE', formState);

            if (resp.status !== 200) {
                //setWait(false);
                const { data } = resp.response;

                toast('error', data.message || 'Error no controlado');

                return;
            }

            const { data } = resp;

            close();

            toast('success', data.message);

        } catch (error) {
            console.log(error)
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
                        <Form.Label>Contraseña Actual</Form.Label>
                        <Form.Control
                            name="lastPass"
                            type="password"
                            value={formState.lastPass}
                            onChange={onInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label>Nueva contraseña</Form.Label>
                        <Form.Control
                            name="newPass"
                            type="password"
                            value={formState.newPass}
                            onChange={onInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label>Repita Contraseña</Form.Label>
                        <Form.Control
                            name="repitePass"
                            type="password"
                            value={formState.repitePass}
                            onChange={onInputChange}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer >
                    <Button variant="secondary" onClick={close} >Cancelar</Button>
                    <Button type="submit" variant="primary">Actualizar contraseña </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
