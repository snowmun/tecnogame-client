import { Link } from 'react-router-dom';
import { Container, Row, Card, Button, Col, Spinner } from 'react-bootstrap';
import { useGetProducts } from '../../hooks/useGetProducts';
import { routes } from '../../routes/config-route';
import { numberFormat } from '../../helpers'
import { addCart } from '../../helpers/addCart';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import '../../css/products.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export const Products = () => {

    const { products, setProducts } = useContext(ProductContext);

    const { data, isLoading } = useGetProducts();

    return (
        <>
            <Container className={(isLoading) ? 'd-flex justify-content-center' : ''}>
                {
                    (isLoading) ? (<Spinner animation="border" />)
                        : (
                            <Row className='mt-5 mb-2'>
                                {
                                    data.map(pro => (
                                        <Col key={pro._id} className='col-md-4 mt-2'>
                                            <Card className="productoCard" >
                                                <Link className="normal-text" to={`${routes.viewProduct}/${pro._id}`} >
                                                    <Card.Body>
                                                        <Card.Title> {pro.marcaId[0].nombreMarca}</Card.Title>
                                                        <h6 style={{ color: '#34E973', }} >{pro.categoriaId[0].nombreCategoria}</h6>
                                                        <p>{pro.nombreProducto}</p>
                                                        <p  ><b>ID: </b>{pro._id.toString().substring(0, 10)}</p>
                                                    </Card.Body>
                                                    <Card.Body>
                                                        <Card.Img variant="top" src={pro ? `${(pro.extension.length > 0) ? `data: image / ${pro.extension};base64, ${pro.img64}` : ''}` : ''} alt='IMG' />
                                                    </Card.Body>
                                                </Link>
                                                {
                                                    (pro.stock > 0) && <Card.Body>
                                                        <h3 className="demo-text" style={{ color: '#41CC64', }} >{numberFormat(parseInt(pro.precio))}</h3>
                                                        <FontAwesomeIcon className="iconoTienda" icon={faCartPlus} onClick={() => addCart({ ...pro, cant: 1 }, products, setProducts)} />
                                                        <p style={{ fontSize: "13px" }} >Precio Oferta Efectivo</p>
                                                    </Card.Body>
                                                }

                                            </Card>
                                        </Col>
                                    ))
                                }
                            </Row>
                        )
                }
            </Container>
        </>
    )
}
