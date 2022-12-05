import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import { NavDropdown, Button } from 'react-bootstrap';
import { routes } from '../../routes/config-route';
import { UserContext } from '../../context/UserContext';
import { ModalCart } from './ModalCart';
import { useModal } from '../../hooks/useModal';
import { numberFormat } from '../../helpers';



export const ListCart = () => {

    const [isOpen, open, close] = useModal();

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const { products, setProducts } = useContext(ProductContext);

    const calTotal = () => {
        let sum = 0;
        let total = 0;
        let cantidad = 0;
        for (const p of products) {
            cantidad += p.cant;
            sum = p.cant * parseInt(p.precio)
            total += sum;
        }

        return { total, cantidad };
    }

    const { total, cantidad } = calTotal();

    const handleDelete = (idProduct) => {

        const upProduct = products.filter(prod => prod._id !== idProduct);

        setProducts(upProduct);

        localStorage.setItem('products', JSON.stringify(upProduct));
    }

    const canPay = () => {
        (user.logged) ? navigate(routes.payCart) : open();
    }


    return (
        <>
            <NavDropdown
                id="nav-dropdown-dark-example"
                menuVariant="dark"
                title={`Producto(s) ${cantidad}`}>
                {
                    products.map(product => {

                        return < NavDropdown.Item key={product._id}>
                            {`Producto: ${product.nombreProducto} - Precio: ${numberFormat(parseInt(product.cant) * parseInt(product.precio))} - cantidad: ${product.cant}`}
                            <Button type="button" className=" btn btn-danger mt-2" onClick={() => handleDelete(product._id)}>X</Button>
                        </NavDropdown.Item>

                    })

                }
                <span>
                    Total: {numberFormat(total)}
                    {(products.length > 0)
                        ? <Button type="Button" className=" btn btn-primary mt-2" onClick={canPay}>Comprar</Button>
                        : ''}
                </span>



            </NavDropdown>

            {
                (isOpen)
                    ? <ModalCart isOpen={isOpen} close={close} />
                    : ''
            }
        </>
    )
}
