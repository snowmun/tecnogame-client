import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { addCart } from '../../helpers/addCart';
import { httpRequest } from '../../helpers/httpRequest';

export const ViewProduct = () => {

  const { products, setProducts } = useContext(ProductContext);

  const [productDetail, setProductDetail] = useState({});

  const { id } = useParams();

  const detailProduct = async () => {
    const { data, status } = await httpRequest(`${import.meta.env.VITE_URL_GET_BY_PRODUCT}${id}`, 'GET');
    if (status === 200) {
      return setProductDetail(data.Data);
    }

    return setProductDetail({});
  }

  useEffect(() => {
    detailProduct();
  }, [])

  return (
    <Container>
      <Row className='mt-5'>
        {
          (productDetail) ?
            <>
              <Col className='col-6'>
                <div className="card">
                  <div className="card-body">
                    <img className="d-block w-50" src={(productDetail.img64) ? `data:image/${productDetail.extension};base64, ${productDetail.img64}` : ''} alt="IMG" />
                  </div>
                </div>
              </Col>
              <Col className='col-6'>
                <h2>{productDetail.nombreProducto}</h2>
                <h2>Stock: {productDetail.stock}</h2>
                {
                  (productDetail.stock > 0) &&
                  <div className='d-flex align-items-end'>
                    <Button onClick={() => addCart({ ...productDetail, cant: 1 }, products, setProducts)}>Agregar</Button>
                  </div>
                }

              </Col>
              <Col className='mt-3'>
                <h4>Caracteristicas</h4>
                {productDetail.descripcion}
              </Col>
            </>
            : ''
        }
      </Row>
    </Container>
  )
}
