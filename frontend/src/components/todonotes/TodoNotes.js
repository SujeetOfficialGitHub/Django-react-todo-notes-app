import React, { useEffect} from 'react';
import { Row } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { allTodoNotes } from '../../app/features/todoNotesSlice';
import ContainerBox from '../../components/ui/ContainerBox'
import TodoNote from './TodoNote';

const TodoNotes = ({onPopulateDataToForm}) => {
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
            <TodoNote key={item.id} item={item} onPopulateDataToForm={onPopulateDataToForm} />
        ))}
    </Row>
    </ContainerBox>
  )
}

export default TodoNotes