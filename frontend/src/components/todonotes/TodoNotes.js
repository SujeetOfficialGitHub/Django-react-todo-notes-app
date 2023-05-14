import React, { useEffect} from 'react';
import {BiEdit} from 'react-icons/bi';
import {FaTrash} from 'react-icons/fa';
import { Card, Row, Col } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { allTodoNotes } from '../../app/features/todoNotesSlice';
import ButtonBox from '..//../components/ui/buttonBox/ButtonBox';
import ContainerBox from '../../components/ui/ContainerBox'
import classes from './TodoNotes.module.css'

const TodoNotes = () => {
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allTodoNotes({token}))
    }, [dispatch, token])

    const {todoNotesList, loading} = useSelector(state => state.todoNotes)
  return (
    <ContainerBox>
        <Row>
        {loading && <h1 className='text-center'>Loading...</h1>}
        <h1 className='text-center bg-secondary text-light p-2 mt-5'>Notes List</h1>
        {!loading && todoNotesList && todoNotesList.map((item) => (
            <Col key={item.id} lg={4} md={4} sm={6} className='mt-4'>
            <Card>
                <Card.Body>
                    <Card.Title className={classes['notes_title']}>
                        {item.title && item.title.length>50 ? item.title.substring(0, 50)+"..." : item.title}
                    </Card.Title>
                    <Card.Subtitle className={classes['notes_category']}>
                        Category - {item.category_name && item.category_name.length>20 ? item.category_name.substring(0,20)+"..." : item.category_name}
                    </Card.Subtitle>
                    <Card.Text className={classes['notes_description']}>
                        {item.description && item.description.length>100 ? item.description.substring(0, 100)+"..." : item.description}
                    </Card.Text>
                    <Card.Link href="#" className={classes['notes_view']}>View</Card.Link>
                    <div className={classes['notes-action']}>
                        <ButtonBox 
                            className={classes['notes-edit']}
                            variant='warning'
                        ><BiEdit/></ButtonBox>
                        <ButtonBox 
                            className={classes['notes-delete']}
                            variant="danger"
                        ><FaTrash/></ButtonBox>
                    </div>
                </Card.Body>
            </Card>
            </Col>
        ))}
    </Row>
    </ContainerBox>
  )
}

export default TodoNotes