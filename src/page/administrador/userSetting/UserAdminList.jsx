import { useState } from 'react';
import { Col, Spinner, Table } from 'react-bootstrap';
import { useModal } from '../../../hooks/useModal';
import { DeleteUser } from './DeleteUser';
import { UserEditForm } from './UserEditForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

export const UserAdminList = ({ data, setIsUpdate, deleteUser }) => {

    const [isOpenEditarPM, openEditarPM, closeEditarPM] = useModal();
    const [isOpenDeletePM, openDeletePM, closeDeletePM] = useModal();
    const [value, setValue] = useState();

    return (
        <>
            <Col>
                {
                    (data.length === 0) ? (<Spinner animation="border" />)
                        :
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className='text-center'>#</th>
                                    <th className='text-center'>Usuarios</th>
                                    <th className='text-center' >Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user, i) => (
                                    <tr key={user._id}>
                                        <td className='text-center'>{i + 1}</td>
                                        <td className='text-center'>{user.nombreUsuario || user.nombreUser}</td>
                                        <td className='d-flex justify-content-around'>
                                            <button className='btn btn-warning' onClick={() => { setValue(user); openEditarPM(); }}><FontAwesomeIcon icon={faEdit} /></button>
                                            <button className='btn btn-danger' onClick={() => { setValue(user._id); openDeletePM(); }}><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                }
            </Col>

            <DeleteUser
                isOpen={isOpenDeletePM}
                close={closeDeletePM}
                value={value}
                deleteUser={deleteUser}
            />
            {isOpenEditarPM ?
                <UserEditForm
                    isOpen={isOpenEditarPM}
                    close={closeEditarPM}
                    value={value}
                    setIsUpdate={setIsUpdate}
                /> : null}
        </>
    )
}

