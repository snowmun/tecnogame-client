import { Row, Container } from 'react-bootstrap';
import { Login } from "../../components/user/Login"

export const LoginPage = () => {

  return (
    <Container className='regcontrainer'>
      <Row className='mt-2 mb-2'>
        <Login />
      </Row>
    </Container >

  )
}
