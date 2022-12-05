
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { routes } from '../../routes/config-route';
import logo from '../../img/tecnogamelogo.png';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { ListCart } from '../cart/ListCart';
import { CategoryContext } from '../../context/CategoryContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModal } from '../../hooks/useModal';
import { Perfil } from '../user/Perfil';
import { CambiarContra } from '../user/CambiarContra';
import { ToastContainer } from 'react-toastify';

export const Header = () => {

  let rolUser = 1;

  const [isOpenPerfil, openPerfil, closePerfil] = useModal();

  const [isOpenPass, openPass, closePass] = useModal();

  const { user, setUser } = useContext(UserContext);

  const { categorys } = useContext(CategoryContext);


  if (user.userData) {

    rolUser = user.userData.rol;

  }

  const logout = () => {

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    setUser({
      logged: false
    });
  }

  useEffect(() => {

  }, [user.logged]);


  return (

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={NavLink} to="/" ><img src={logo}
        width="40"
        height="40"
        className="d-inline-block align-top"
        alt="" /> TecnoGamer
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to={routes.home} >Inicio</Nav.Link>
          <Nav.Link as={NavLink} to={routes.products}>Productos</Nav.Link>
          {(user.logged && rolUser == 2) ?
            <NavDropdown
              id="nav-dropdown-dark-example"
              menuVariant="dark"
              title='Administrador'>
              <NavDropdown.Item as={NavLink} to={`/admin${routes.addCategory}`} >Agregar Categorias</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={`/admin${routes.addMark}`} >Agregar Marcas</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={`/admin${routes.addProduct}`} >Agregar Productos</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={`/admin${routes.userAdmin}`} >Administrador de Usuario</NavDropdown.Item>
            </NavDropdown>
            : ''
          }
          <NavDropdown
            id="nav-dropdown-dark-example"
            menuVariant="dark"
            title='Categoria'>
            {
              (categorys.length > 0)
                ? categorys.map(cat => (<NavDropdown.Item key={cat._id} as={NavLink} to={`${routes.categorys}/${cat._id}`} >{cat.nombreCategoria}</NavDropdown.Item>))
                : ''
            }
          </NavDropdown>
          <ListCart />
        </Nav>
        {
          (user.logged) && <NavDropdown
            className='me-5'
            id="nav-dropdown"
            menuVariant="dark"
            title='Mi cuenta'>
            <NavDropdown.Item onClick={openPerfil}>Perfil</NavDropdown.Item>
            <NavDropdown.Item onClick={openPass}>Cambiar contraseña</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to={routes.shopHistory}>Historial de compra</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        }
        <Nav>
          {(!user.logged) ? <Nav.Link as={NavLink} to={routes.login} >Iniciar Sesion</Nav.Link> : ''}
          {(!user.logged) ? <Nav.Link as={NavLink} to={routes.register} >Registrarse</Nav.Link> : ''}
        </Nav>


      </Navbar.Collapse>
      {(isOpenPerfil) && <Perfil isOpen={isOpenPerfil} close={closePerfil} user={user.userData} setUser={setUser} />}
      {(isOpenPass) && <CambiarContra isOpen={isOpenPass} close={closePass} user={user.userData} />}
      <ToastContainer />
    </Navbar >

  )
}
