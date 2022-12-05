
import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ListHistory } from '../../components/shopHistory/ListHistory';
import { UserContext } from '../../context/UserContext';

export const HistorialCompra = () => {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user.logged) navigate('/')
    }, []);

    return (
        <Container >
            <ListHistory user={user} />
        </Container>
    )
}
