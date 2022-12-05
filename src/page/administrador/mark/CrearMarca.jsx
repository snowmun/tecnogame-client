import { Container, Row} from 'react-bootstrap';
import { AddMark } from '../../../components/mark/AddMark';
import { MarcaListTable } from '../../../components/mark/MarcaListTable';
import { useGetMarks } from '../../../hooks';

export const CrearMarca = () => {

    const {mark, setMarca,setIsUpdate} = useGetMarks();

    const addMark = (newMark) =>{
        setMarca([...mark, newMark]);
    }

    const deleteMark = (deleteMark) =>{
        const newArray = mark.filter(c => c._id !== deleteMark);
        setMarca(newArray);
    }
    return (
        <Container className='regcontrainer'>
            <Row className='mt-2 mb-2'>
                <AddMark addMark={addMark}/>
                <MarcaListTable mark={mark} deleteMark={deleteMark} setIsUpdate={setIsUpdate}/>
            </Row>
        </Container >
    )
}
