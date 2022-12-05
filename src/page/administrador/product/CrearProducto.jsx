

import { Row, Container, Col } from 'react-bootstrap';
import { FormProduct } from '../../../components/product/FormProduct';
import { ProductsList } from '../../../components/product/ProductsList';
import { useGetMarks, useGetProducts } from '../../../hooks';

export const CrearProducto = () => {

  //Lista de marcas
  const { mark } = useGetMarks();

  const { data, isLoading, setProduct, setIsUpdate } = useGetProducts();

  const newProduct = (products) => {
    setProduct({
      data: [...data, products],
      isLoading: false
    })
  }

  const deleteProduct = (id) => {

    const newData = data.filter(p => p._id !== id);

    setProduct({
      data: newData,
      isLoading: false
    });

  }

  return (
    <Container className='regcontrainer'>
      <Row className='mt-2 mb-2'>
        <Col className='col-xs-12 col-sm-12  col-md-6'>
          <FormProduct mark={mark} newProduct={newProduct} />
        </Col>
        <Col className='col-xs-12 col-sm-12  col-md-6 '>
          <ProductsList
            data={data}
            isLoading={isLoading}
            deleteProduct={deleteProduct}
            mark={mark}
            setIsUpdate={setIsUpdate}
          />
        </Col>

      </Row>
    </Container >
  )
}
