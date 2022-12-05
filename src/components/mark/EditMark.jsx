import { useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from '../../hooks';
import { httpRequest, toast } from '../../helpers';

export const EditMark = ({ isOpen, close, value, setIsUpdate }) => {

  const { onInputChange, formState, onResetForm } = useForm({
    nombreMarca: value.nombreMarca,

  });

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();

      const resp = await httpRequest(`${import.meta.env.VITE_URL_UPDATE_MARK}${value._id}`, 'UPDATE', formState);

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

  useEffect(() => {
    if (!isOpen) {
      onResetForm();
    }
  }, [isOpen])


  return (

    <Modal show={isOpen} onHide={close}>
      <Modal.Header >
        <Modal.Title>Editar Marca</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleUpdate}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nombre Marca</Form.Label>
            <Form.Control
              className="mt-1"
              placeholder="Nombre Marca"
              name='nombreMarca'
              value={formState.nombreMarca}
              onChange={onInputChange}
              type="text"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer >
          <Button variant="secondary" onClick={close} >Cancelar</Button>
          <Button type="submit" variant="primary">Actualizar Marca </Button>
        </Modal.Footer>
      </Form>
    </Modal>

  )
}
