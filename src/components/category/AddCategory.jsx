import { Link } from 'react-router-dom';
import { Form, Button, Col, Card, Row } from 'react-bootstrap';
import { useForm } from '../../hooks';
import { httpRequest, toast, waitMoment } from '../../helpers';
import { useContext } from 'react';
import { CategoryContext } from '../../context/CategoryContext';


export const AddCategory = () => {


  const { categorys, setCategory } = useContext(CategoryContext);

  const { onInputChange, formState, onResetForm } = useForm({
    nombreCategoria: ''
  });

  const { wait, setWait } = waitMoment();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setWait(true);

      const resp = await httpRequest(import.meta.env.VITE_URL_CREATE_CATEGORY, 'CREATE', formState);

      if (resp.status !== 200) {

        const { data } = resp.response;

        toast('error', data.message || 'Error no controlado');

        onResetForm();

        setWait(false);

        return;
      }

      const { data } = resp;

      setCategory([...categorys, data.Data]);

      onResetForm();

      toast('success', data.message);

      setWait(false);

    } catch (error) {

      toast('error', error);

    }

  }


  return (
    <Col>
      <Card id="cardregister" style={{ maxWidth: '400px' }} className=" mx-auto p-2 ">
        <h3 className='regtitle'>Registro</h3>
        <Form className='Formregister' onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Col sm="12">
              <Form.Control onChange={onInputChange} name="nombreCategoria" type="text" placeholder="Ingrese una categoría" value={formState.nombreCategoria} required />
            </Col>
          </Form.Group>
          <Form.Group>
            <Link to="/" className="linkInicio">&larr; Volver Al Inicio</Link>
          </Form.Group>
          <Form.Group>
            <Button type="submit" className="RegisterBoton mt-2" variant="primary" disabled={!!wait} >Crear</Button>
          </Form.Group>
        </Form>
      </Card>
    </Col>

  )
}
