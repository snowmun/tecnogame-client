import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { httpRequest, numberFormat } from "../../helpers";
import { addCart } from "../../helpers/addCart";
import { routes } from "../../routes/config-route";

export const Categorys = () => {

    const { id } = useParams();

    const { products, setProducts } = useContext(ProductContext);

    const [productsCategory, setProductsCategory] = useState([]);

    const getProducts = async () => {

        try {
            const resp = await httpRequest(`${import.meta.env.VITE_URL_GET_PRODUCTS_BY_CATEGORY}${id}`, 'GET');

            const { Data } = resp.data;

            setProductsCategory(Data);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {

        getProducts();

    }, [id]);

    return (
        <Container className={(productsCategory) ? 'd-flex justify-content-center' : ''}>
            {
                (productsCategory.length === 0) ? (<Spinner animation="border" />)
                    : (productsCategory[0] === 'No hay datos')
                        ? <span>No hay datos</span>
                        :
                        <Row className='mt-2 mb-2'>
                            {
                                productsCategory.map(pro => (
                                    <Col key={pro._id} className='col-md-4 mt-2'>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Body>
                                                <Card.Title> {pro.nombreProducto}</Card.Title>
                                                <strong >STOCK:<label className='fw-normal'>{pro.stock}</label></strong>
                                            </Card.Body>
                                            <Card.Img variant="top" src={pro ? `${(pro.extension.length > 0) ? `data: image / ${pro.extension};base64, ${pro.img64}` : ''}` : ''} alt='IMG' />
                                            <Card.Body>
                                                <label>{numberFormat(parseInt(pro.precio))}</label>
                                            </Card.Body>
                                            <Button className='m-1' variant="primary" onClick={() => addCart({ ...pro, cant: 1 }, products, setProducts)}>Agregar</Button>
                                            <Link className='m-1 btn btn-primary' to={`${routes.viewProduct}/${pro._id}`} >Ver detalle</Link>
                                        </Card>
                                    </Col>
                                ))
                            }

                        </Row>

            }


        </Container>
    )
}
