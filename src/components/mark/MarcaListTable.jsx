import { useState } from 'react';
import { Col, Spinner, Table } from 'react-bootstrap';
import { useModal } from '../../hooks/useModal';
import { DeleteMark } from './DeleteMark';
import { EditMark } from './EditMark';

export const MarcaListTable = ({ mark, deleteMark, setIsUpdate }) => {

    const [value, setValue] = useState();

    const [isOpenDelete, openDelete, closeDelete] = useModal();

    const [isOpenEdit, openEdit, closeEdit] = useModal();


    const handleEdit = (mark) => {

        setValue(mark);

        openEdit();
    }

    const handleDelete = (id) => {

        setValue(id);

        openDelete();
    }

    return (
        <>
            <Col>
                {
                    (mark.length === 0)
                        ? (<Spinner animation="border" />)
                        : <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className='text-center'>#</th>
                                    <th className='text-center'>Marca</th>
                                    <th className='text-center'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mark.map((m, i) => (

                                    <tr key={m._id}>
                                        <td className='text-center'>{i + 1}</td>
                                        <td className='text-center'>{m.nombreMarca}</td>
                                        <td className='d-flex justify-content-around'>
                                            <button className='btn btn-primary' onClick={() => handleEdit(m)}>Editar</button>
                                            <button className='btn btn-danger' onClick={() => handleDelete(m._id)}>Borrar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                }

            </Col>
            {
                (isOpenEdit)
                    ? <EditMark
                        isOpen={isOpenEdit}
                        close={closeEdit}
                        value={value}
                        setIsUpdate={setIsUpdate}
                    />
                    : null
            }
            <DeleteMark
                isOpen={isOpenDelete}
                close={closeDelete}
                value={value}
                deleteMark={deleteMark}
            />
        </>
    )
}
