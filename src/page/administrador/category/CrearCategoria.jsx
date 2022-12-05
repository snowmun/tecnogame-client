import { Container, Row } from 'react-bootstrap';
import { AddCategory } from '../../../components/category/AddCategory';
import { CategoryListTable } from '../../../components/category/CategoryListTable';

export const CrearCategoria = () => {

  return (
    <Container className='regcontrainer'>
      <Row className='mt-2 mb-2'>
        <AddCategory />
        <CategoryListTable />
      </Row>
    </Container >
  )
}
