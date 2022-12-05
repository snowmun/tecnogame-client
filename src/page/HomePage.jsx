import { CarouselHome } from "../components/home/CarrouselHome"
import { Row, Container, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import imagen1 from '../img/home/imagen1.png';
import imagen2 from '../img/home/imagen2.png';
import imagen3 from '../img/home/imagen3.png';
import imagen4 from '../img/home/imagen4.png';
import imagen5 from '../img/home/imagen5.png';
import imagen6 from '../img/home/imagen6.png';
import '../css/HomePage.css'

export const HomePage = () => {

  return (
    <>
      <CarouselHome />
      <Container>
        <Row>
          <Col className='col-xs-12 col-sm-12  col-md-12 OfertaBarra'>
            <center >Estas Ofertas Son Para Ti <FontAwesomeIcon icon={faRocket} />{" "}</center>
          </Col>
          <Col className='col-xs-12 col-sm-4  col-md-2 '>
            <Col className='col-xs-12 col-sm-12  col-md-12 color thumbnail'>
              <img src={imagen1} alt="prueba" width='100%' height='100%' />
            </Col>
            <Col className='col-xs-12 col-sm-12  col-md-126 color' >
              <img src={imagen2} alt="prueba" width='100%' height='100%' />
            </Col>

          </Col>
          <Col className='col-xs-12 col-sm-4  col-md-2 '>
            <Col className='col-xs-12 col-sm-12  col-md-12 color' >
              <img src={imagen3} alt="prueba" width='100%' height='100%' />
            </Col>
            <Col className='col-xs-12 col-sm-12  col-md-12  color' >
              <img src={imagen4} alt="prueba" width='100%' height='100%' />
            </Col>
          </Col>
          <Col className='col-xs-12 col-sm-4  col-md-4 '>
            <img src={imagen5} alt="prueba" width='100%' height='100%' />
          </Col>
          <Col className='col-xs-12 col-sm-4  col-md-4 '>
            <img src={imagen6} alt="prueba" width='100%' height='100%' />
          </Col>
        </Row>
      </Container>


    </>

  )
}
