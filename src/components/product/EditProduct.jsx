import { useContext, useEffect, useRef } from 'react';
import { Modal, Form, Button, Col, Card, Row } from 'react-bootstrap';
import { useForm } from '../../hooks';
import { CategoryList } from '../category/CategoryList';
import { MarkList } from './MarkList';
import { fileBase64, httpRequest, toast } from '../../helpers';
import { CategoryContext } from '../../context/CategoryContext';

export const EditProduct = ({ isOpen, close, value, mark, setIsUpdate }) => {

    const { categorys } = useContext(CategoryContext);

    const { onInputChange, formState, onResetForm } = useForm({
        nombreProducto: value.nombreProducto,
        stock: value.stock,
        precio: value.precio,
        descripcion: value.descripcion,
        categoriaId: value.categoriaId[0]._id,
        marcaId: value.marcaId[0]._id,
        img: value.img64
    });

    const img = useRef();

    useEffect(() => {
        if (!isOpen) {
            onResetForm()
        }
    }, [isOpen])

    const handleUpdate = async (e) => {
        try {
            e.preventDefault();

            formState.extension = value.extension;

            if (img.current.files[0]) {

                const img64 = await fileBase64(img.current.files[0]);

                const imgName = await httpRequest(import.meta.env.VITE_URL_UPLOAD, 'CREATE', { img64 });

                if (imgName.status !== 200) {

                    const { data } = imgName.response;

                    toast('error', data.message || 'Error no controlado');

                    return;
                }
                const { Data } = imgName.data;

                formState.img = Data.bas64;

                formState.extension = Data.extension;
            }

            const resp = await httpRequest(`${import.meta.env.VITE_URL_UPDATE_PRODUCT}${value._id}`, 'UPDATE', formState);

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
                <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Col className="mt-3">
                <Card id="cardregister" style={{ maxWidth: '400px' }} className=" mx-auto p-2 ">
                    <Form onSubmit={handleUpdate} >
                        <Form.Group as={Row} className="mb-3">
                            <Col sm="12">
                                <Form.Control
                                    name="nombreProducto"
                                    type="text"
                                    placeholder="Ingrese un Producto"
                                    value={formState.nombreProducto}
                                    onChange={onInputChange}
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm="12">
                                <Form.Control
                                    type="number"
                                    name="stock"
                                    placeholder="Ingrese Stock"
                                    value={formState.stock}
                                    onChange={onInputChange}
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Col sm="12">
                                <Form.Control
                                    autoComplete="true"
                                    name="precio"
                                    type="text"
                                    placeholder="Ingrese Precio"
                                    value={formState.precio}
                                    onChange={onInputChange}
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Col sm="12">
                                <Form.Control
                                    as='textarea'
                                    name="descripcion"
                                    type="text"
                                    placeholder="Descripción"
                                    value={formState.descripcion}
                                    onChange={onInputChange}
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Col sm="12">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select name="categoriaId" onChange={onInputChange} value={formState.categoriaId}>
                                    <option value="Seleccione" disabled> Seleccione </option>
                                    {
                                        categorys.map(c => (<CategoryList key={c._id} category={c} />))
                                    }
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Col sm="12">
                                <Form.Label>Marca</Form.Label>
                                <Form.Select name="marcaId" onChange={onInputChange} value={formState.marcaId} >
                                    <option value="Seleccione" disabled> Seleccione </option>
                                    {
                                        mark.map(m => (<MarkList key={m._id} mark={m} />))
                                    }
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Col sm="12">
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control
                                    type='file'
                                    onChange={onInputChange}
                                    name="img64"
                                    ref={img}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group >
                            <Button type="submit" className="RegisterBoton mt-2" variant="success"  >Actualizar Producto</Button>
                        </Form.Group>
                    </Form>
                </Card>
            </Col>
        </Modal>

    )
}
