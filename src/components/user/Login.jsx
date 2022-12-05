import { useContext } from 'react';
import { Form, Button, Col, Card, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { httpRequest, toast, waitMoment } from '../../helpers';
import { useForm } from '../../hooks';

export const Login = () => {

    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    const { onInputChange, formState } = useForm({
        nombreUsuario: '',
        contrasena: ''
    });

    const { wait, setWait } = waitMoment();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setWait(true);

            const resp = await httpRequest(import.meta.env.VITE_URL_LOGIN, 'CREATE', formState);

            if (resp.status !== 200) {
                setWait(false);
                const { data } = resp.response;

                toast('error', data.message || 'Error no controlado');

                return;
            }

            const { data } = resp;

            const respToken = await httpRequest(import.meta.env.VITE_CREATE_TOKEN, 'CREATE', { apiKey: data.Data.rol === 2 ? import.meta.env.VITE_APIKEY_ADMIN : import.meta.env.VITE_APIKEY_USER });

            const { token } = respToken.data.Data;

            localStorage.setItem('token', token);

            localStorage.setItem('user', JSON.stringify(data.Data));

            setUser({ logged: true, userData: data.Data });

            navigate('/', { replace: true });

            toast('success', data.message);
        } catch (error) {
            toast('error', error);
        }
    }

    return (
        <Col className='mt-2'>
            <Card id="cardregister" style={{ maxWidth: '400px' }} className=" mx-auto p-2 ">
                <h3 className='regtitle'>Inicio sesion</h3>
                <Form className='Formregister' onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" >
                        <Col sm="12">
                            <Form.Control autoComplete="true" onChange={onInputChange} name="nombreUsuario" type="text" placeholder="Nombre usuario" value={formState.nombreUsuario} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Col sm="12">
                            <Form.Control onChange={onInputChange} name="contrasena" type="password" placeholder="Contraseña" value={formState.contrasena} required />
                        </Col>
                    </Form.Group>
                    <Form.Group >
                        <Button type="submit" className="RegisterBoton mt-2" variant="success" disabled={!!wait} >Iniciar sesión</Button>
                    </Form.Group>
                </Form>
            </Card>
        </Col>
    )
}
