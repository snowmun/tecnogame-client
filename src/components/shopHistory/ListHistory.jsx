
import { useEffect, useState } from 'react'
import { Button, Col, Row, Spinner, Table } from 'react-bootstrap'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { numberFormat, toast } from '../../helpers';
import { httpRequest } from '../../helpers/httpRequest';
import { ModalDetail } from './ModalDetail';
import { useModal } from '../../hooks/useModal';

export const ListHistory = ({ user }) => {

    const [isOpen, open, close] = useModal();

    const [buy, setBuy] = useState({
        loading: true,
        data: []
    });

    const [modalProduct, setModalProduct] = useState([]);

    const getBuy = async () => {
        try {
            const { status, data } = await httpRequest(`${import.meta.env.VITE_HISTORY_BUY}${user.userData._id}`, 'GET');
            if (status === 200) {
                return setBuy({
                    loading: false,
                    data: data.Data
                })
            }
            toast('error', 'Error inesperado');
        } catch (error) {
            console.log(error)
            toast('error', error);
        }

    }


    const openModal = (products) => {
        open();
        setModalProduct(products);
    }
    useEffect(() => {
        getBuy();
    }, []);


    return (
        <Row className='mt-5'>
            <Col>
                <Table striped bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <th >#</th>
                            <th >Fecha de compra</th>
                            <th >Cantidada de productos</th>
                            <th >Valor compra</th>
                            <th >Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (buy.loading)
                                ? <tr className='text-center' key={1}>
                                    <td><Spinner animation="border" /></td>
                                    <td><Spinner animation="border" /></td>
                                    <td><Spinner animation="border" /></td>
                                    <td><Spinner animation="border" /></td>
                                    <td><Spinner animation="border" /></td>
                                    <td><Spinner animation="border" /></td>
                                </tr>
                                : (buy.data[0] === 'No hay compras')
                                    ? <tr className='text-center' key={1}>
                                        <td>No hay compras</td>
                                        <td>No hay compras</td>
                                        <td>No hay compras</td>
                                        <td>No hay compras</td>
                                        <td>No hay compras</td>
                                        <td>No hay compras</td>
                                    </tr>
                                    : buy.data.map(({ buy, products }, i) => (
                                        <tr className='text-center' key={buy.id}>
                                            <td>{i + 1}</td>
                                            <td>{buy.fechaCompra}</td>
                                            <td>{buy.cantProducts}</td>
                                            <td>{numberFormat(buy.valorCompra)}</td>
                                            <td><Button className='btn btn-info' onClick={() => openModal(products)}><FontAwesomeIcon icon={faCircleInfo} /></Button></td>

                                        </tr>

                                    ))


                        }
                        {/* {
                            (products.length > 0) && <tr key={2}><td className='d-flex justify-content-end'>Total: {numberFormat(pay.valorCompra)} </td></tr>
                        } */}
                    </tbody>
                </Table>
                <ModalDetail isOpen={isOpen} close={close} products={modalProduct} />
            </Col>
        </Row>
    )
}
