import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { singleTodoNote } from '../../app/features/todoNoteDetailSlice';
import ContainerBox from '../../components/ui/ContainerBox';
import classes from './Sing;eTodoNote.module.css'

const SingleTodoNote = () => {
    const {slug} = useParams();
    const token = useSelector(state => state.auth.token)
    const {singleTodoNoteItem} = useSelector(state => state.todoNoteDetail)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(singleTodoNote({token, slug}))
    }, [dispatch, slug, token])

  return (
    <ContainerBox className={classes['todo-note-detail']}>
        <dl>
            <dt>Title</dt>
            <dd >
                {singleTodoNoteItem.title}
            </dd>
            <dt>Category</dt>
            <dd >
                {singleTodoNoteItem.category_name}
            </dd>
            <dt>Description</dt>
            <dd >
                {singleTodoNoteItem.description}
            </dd>
        </dl>

    </ContainerBox>
  )
}

export default SingleTodoNote