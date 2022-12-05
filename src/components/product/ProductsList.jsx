import { useState } from 'react';
import { Col, Spinner, Table } from 'react-bootstrap';
import { useModal } from '../../hooks/useModal';
import { EditProduct } from '../product/EditProduct';
import { DeleteProduct } from '../product/DeleteProduct';

export const ProductsList = ({ data, isLoading, deleteProduct, mark, category, setIsUpdate }) => {

    const [isOpenEditarPM, openEditarPM, closeEditarPM] = useModal();
    const [isOpenDeletePM, openDeletePM, closeDeletePM] = useModal();

    const [value, setValue] = useState();


    return (
        <>
            <Col>
                {
                    (isLoading)
                        ? (<Spinner animation="border" />)
                        : <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className='text-center'>#</th>
                                    <th className='text-center'>Producto</th>
                                    <th className='text-center'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((pro, i) => (

                                    <tr key={pro._id}>
                                        <td className='text-center'>{i + 1}</td>
                                        <td className='text-center'>{pro.nombreProducto}</td>
                                        <td className='d-flex justify-content-around'>
                                            <button className='btn btn-primary' onClick={() => { setValue(pro); openEditarPM(); }}>Editar</button>
                                            <button className='btn btn-danger' onClick={() => { setValue(pro._id); openDeletePM(); }}>Borrar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                }
            </Col>



            <DeleteProduct
                isOpen={isOpenDeletePM}
                close={closeDeletePM}
                value={value}
                deleteProduct={deleteProduct}
            />
            {
                isOpenEditarPM ? <EditProduct
                    isOpen={isOpenEditarPM}
                    close={closeEditarPM}
                    value={value}
                    mark={mark}
                    category={category}
                    setIsUpdate={setIsUpdate}
                /> : null
            }

        </>
    )
}
