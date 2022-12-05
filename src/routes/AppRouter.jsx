import { Routes, Route } from 'react-router-dom';
// import { Layout } from '../components/layouts/layaout';
import { HomePage } from '../page/HomePage';
import { Products } from '../page/product/Products';
import { routes } from './config-route';
import { LoginPage } from '../page/user/LoginPage';
import { RegisterPage } from '../page/user/RegisterPage';
import NotFoundPages from '../page/errores/NotFoundPage';
import { ViewProduct } from '../page/product/ViewProduct';
import { CrearProducto } from '../page/administrador/product/CrearProducto';
import { CrearCategoria } from '../page/administrador/category/CrearCategoria';
import { CrearMarca } from '../page/administrador/mark/CrearMarca';
import { UserProvider } from '../context/UserProvider';
import { Header } from '../components/navbar/Header';
import { Footer } from '../components/navbar/Footer';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { UserAdminSetting } from '../page/administrador/userSetting/UserAdminSetting';
import { ProductProvider } from '../context/ProductProvider';
import { PayCart } from '../page/cart/PayCart';
import { Categorys } from '../page/categoria/Categorys';
import { CategoryProvider } from '../context/CategoryProvider';
import { DetailPay } from '../page/detalleCompra/DetailPay';
import { HistorialCompra } from '../page/historialCompra/HistorialCompra';

export const AppRouter = () => {
  return (
    <UserProvider>
      <ProductProvider>
        <CategoryProvider>
          <Header />
          <Routes>
            <Route path='/*' element={
              <PublicRoute>

                <Routes>

                  <Route path={routes.home} element={<HomePage />} />

                  {/* Rutas Producto */}
                  <Route path={routes.products} element={<Products />} />

                  <Route path={`${routes.viewProduct}/:id`} element={<ViewProduct />} />

                  {/* Rutas Categoría */}
                  <Route path={`${routes.categorys}/:id`} element={<Categorys />} />

                  {/* Rutas usuario */}
                  <Route path={routes.login} element={<LoginPage />} />
                  <Route path={routes.register} element={<RegisterPage />} />
                  <Route path={routes.detialPay} element={<DetailPay />} />

                  {/* Rutas carrito */}
                  <Route path={routes.payCart} element={<PayCart />} />

                  {/* Historial de compra */}
                  <Route path={routes.shopHistory} element={<HistorialCompra />} />
                  {/* Ventana de errores  */}
                  <Route exact path="/*" element={<NotFoundPages />} />

                </Routes>
              </PublicRoute>
            } />

            <Route path='admin/*' element={
              <PrivateRoute>
                <Routes>

                  {/* Productos */}
                  <Route path={routes.addProduct} element={<CrearProducto />} />

                  {/* Categoria */}
                  <Route path={routes.addCategory} element={<CrearCategoria />} />

                  {/* Rutas Marca */}
                  <Route path={routes.addMark} element={<CrearMarca />} />
                  {/* ruta admin user */}
                  <Route path={routes.userAdmin} element={<UserAdminSetting />} />

                </Routes>
              </PrivateRoute>
            } />

          </Routes>
          <Footer />
        </CategoryProvider>
      </ProductProvider>
    </UserProvider>
  )
}
