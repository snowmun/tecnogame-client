import { useContext } from 'react';
import { useState } from 'react';
import { Col, Spinner, Table } from 'react-bootstrap';
import { CategoryContext } from '../../context/CategoryContext';
import { useModal } from '../../hooks/useModal';
import { DeleteCategory } from './DeleteCategory';
import { EditCategory } from './EditCategory';


export const CategoryListTable = () => {

    const { categorys } = useContext(CategoryContext);

    const [value, setValue] = useState();

    const [isOpenDelete, openDelete, closeDelete] = useModal();

    const [isOpenEdit, openEdit, closeEdit] = useModal();

    const handleDelete = (id) => {

        setValue(id);

        openDelete();
    }

    const handleEdit = (category) => {

        setValue(category);

        openEdit();
    }

    return (
        <>
            <Col>
                {
                    (categorys.length === 0)
                        ? (<Spinner animation="border" />)
                        : <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className='text-center'>#</th>
                                    <th className='text-center'>Categoría</th>
                                    <th className='text-center'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorys.map((c, i) => (

                                    <tr key={c._id}>
                                        <td className='text-center'>{i + 1}</td>
                                        <td className='text-center'>{c.nombreCategoria}</td>
                                        <td className='d-flex justify-content-around'>
                                            <button className='btn btn-primary' onClick={() => handleEdit(c)}>Editar</button>
                                            <button className='btn btn-danger' onClick={() => handleDelete(c._id)}>Borrar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                }
            </Col>
            {
                (isOpenEdit)
                    ? <EditCategory
                        isOpen={isOpenEdit}
                        close={closeEdit}
                        value={value}
                    />
                    : null
            }
            <DeleteCategory
                isOpen={isOpenDelete}
                close={closeDelete}
                value={value}
            />
        </>

    )
}
