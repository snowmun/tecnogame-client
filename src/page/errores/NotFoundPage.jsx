import React from 'react';
import './NotFoundPage.css';
// import routes from '../../route/routes'
import { Link } from 'react-router-dom';

const NotFoundPage =()=> {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
          <div className="container-fluid">
              <br/>
              <br/>
              <br/>
              <div className="text-center">
                  <div className="error mx-auto" data-text="404">404</div>
                  <p className="lead text-gray-800 mb-5">Page Not Found</p>
                  <p className="text-gray-500 mb-0"> Parece que encontraste un error en la matrix...</p>
                  <Link to="/">&larr; Volver al Home </Link>
              </div>
          </div>
         
      </div>
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
            <div className="copyright text-center my-auto">
                <span>Copyright &copy; TecnoGamer 2022</span>
            </div>
        </div>
      </footer>
    </div>

  );
}

export default  NotFoundPage