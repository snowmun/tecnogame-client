import React from 'react'
import { Form, Button, Col, Card, Row } from 'react-bootstrap';
import { useForm } from '../../../hooks';
import { ToastContainer } from 'react-toastify';
import { httpRequest, toast } from '../../../helpers';

export const UserAdminForm = ({ newUser }) => {

  const { onInputChange, formState, onResetForm } = useForm({
    nombre: '',
    apellido: '',
    correo: '',
    rut: '',
    fono: '',
    contrasena: '',
    tipoUsuario: 'Seleccione',
  });

  const handleSubmit = async (e) => {
    try {

      e.preventDefault();
      const resp = await httpRequest(import.meta.env.VITE_URL_CREATE_USER, 'CREATE', formState);

      if (resp.status !== 200) {

        const { data } = resp.response;

        return toast('error', data.message || 'Error no controlado');
      }

      const { data } = resp;

      newUser(data.Data)

      toast('success', `${data.message}, su nombre usuario ha sido enviado al correo registrado`);

      onResetForm();

      // await httpRequest(import.meta.env.VITE_URL_EMAIL, 'CREATE', { correo: formState.correo });

      setTimeout(() => {
        // resetear form 

      }, 2600);

    } catch (error) {
      toast('error', error);
    }
  }
  return (
    <Col className='mt-2'>
      <Card id="cardregister" style={{ maxWidth: '400px' }} className=" mx-auto p-2 ">
        <h3 className='regtitle'>Registro de Usuarios</h3>
        <Form className='Formregister' onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Col sm="6">
              <Form.Control onChange={onInputChange} name="nombre" type="text" placeholder="Nombre" value={formState.nombre} />
            </Col>
            <Col sm="6">
              <Form.Control onChange={onInputChange} type="text" name="apellido" placeholder="Apellido" value={formState.apellido} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" >
            <Col sm="12">
              <Form.Control autoComplete="true" onChange={onInputChange} name="correo" type="email" placeholder="Correo" value={formState.correo} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" >
            <Col sm="12">
              <Form.Control onChange={onInputChange} name="rut" type="text" placeholder="Rut" value={formState.rut} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" >
            <Col sm="12">
              <Form.Control onChange={onInputChange} name="fono" type="text" placeholder="Fono" value={formState.fono} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" >
            <Col sm="12">
              <Form.Select onChange={onInputChange} name="tipoUsuario" value={formState.tipoUsuario}>
                <option value="Seleccione" disabled  > Seleccione Tipo de Usuario </option>
                <option value="1" > Cliente </option>
                <option value="2" > Administrador </option>

              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" >
            <Col sm="12">
              <Form.Control onChange={onInputChange} name="contrasena" type="password" placeholder="Contraseña" value={formState.contrasena} />
            </Col>
          </Form.Group>
          <Form.Group >
            <Button type="submit" className="RegisterBoton mt-2" variant="success"  >Registrar Usuario</Button>
          </Form.Group>
        </Form>
      </Card>
    </Col>

  )
}

