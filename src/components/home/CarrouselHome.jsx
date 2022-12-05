import {Carousel} from 'react-bootstrap';
import imagen4 from '../../img/Carousel/celulares.png';
import imagen2 from '../../img/Carousel/intelgaming.png';
import imagen3 from '../../img/Carousel/notebook.png';
import imagen1 from '../../img/Carousel/oferta.png';

export const CarouselHome = ()  =>{

  return (
    <>
     <Carousel >
        <Carousel.Item invert="200%"> 
          <img
            className="d-block w-100"
            src={imagen1}
            alt="First slide"
          />
        </Carousel.Item >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={imagen2}
            alt="Second slide"
        
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={imagen3}
            alt="Second slide"
        
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={imagen4}
            alt="Second slide"
      
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
}
