import { Button, Modal, Table } from "react-bootstrap"
import { numberFormat } from "../../helpers"

export const ModalDetail = ({ isOpen, close, products }) => {

    console.log(products)
    return (
        <Modal show={isOpen} onHide={close} size="lg">
            <Modal.Header >
                <Modal.Title>Detalle de compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table responsive="md">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Producto</th>
                            <th>Precio unitario</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((p, i) => (
                                <tr key={p._id}>
                                    <td>{i + 1}</td>
                                    <td>{p.productoId[0].nombreProducto}</td>
                                    <td>{numberFormat(p.productoId[0].precio)}</td>
                                    <td>{numberFormat(p.valor)}</td>
                                    <td>{p.cantidad}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer >
                <Button variant="secondary" onClick={close} >Cancelar</Button>
                <Button type="submit" variant="primary">Actualizar contraseña </Button>
            </Modal.Footer>
        </Modal>
    )
}
