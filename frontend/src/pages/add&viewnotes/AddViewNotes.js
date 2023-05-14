import React, {useReducer, useState} from 'react';
import {Form} from 'react-bootstrap';

import ButtonBox from '../../components/ui/buttonBox/ButtonBox';
import InputBox from '../../components/ui/inputBox/InputBox'
import classes from './AddViewNotes.module.css'
import ContainerBox from '../../components/ui/ContainerBox'
import TodoNotes from '../../components/todonotes/TodoNotes';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoNotes, updateTodoNote } from '../../app/features/todoNotesSlice';

// Input type constants
const ENTERED_TITLE = 'ENTERED_TITLE'
const ENTERED_CATEGORY = 'ENTERED_CATEGORY'
const ENTERED_DESCRIPTION = 'ENTERED_DESCRIPTION'

const notesInitialState = {
    title: '',
    category: '',
    description: ''
}
const notesReducer = (state, action) => {
    switch (action.type) {
        case ENTERED_TITLE:
            return {...state, title: action.title}
        case ENTERED_CATEGORY:
            return {...state, category: action.category}
        case ENTERED_DESCRIPTION:
            return {...state, description: action.description}
        default:
            return state
    }
}
const AddViewNotes = () => {
    const [editId, setEditid] = useState(); 
    const [notesState, notesDispatch] = useReducer(notesReducer, notesInitialState, )

    const token = useSelector(state => state.auth.token)
    const {loading, message} = useSelector(state => state.todoNotes)
    const dispatch = useDispatch();

    const addNoteHandler = (e) => {
        e.preventDefault()
        if (!editId){
            dispatch(addTodoNotes({token, enteredData:notesState}))
        }else{
            dispatch(updateTodoNote({token, editId, enteredData:notesState }))
        }
        notesDispatch({'type': ENTERED_TITLE, title: ''})
        notesDispatch({'type': ENTERED_CATEGORY, "category": ''})
        notesDispatch({'type': ENTERED_DESCRIPTION, "description": ''})
    }
    const populateDataToForm = (item) => {
        setEditid(item.slug)
        notesDispatch({'type': ENTERED_TITLE, title: item.title})
        notesDispatch({'type': ENTERED_CATEGORY, "category": item.category_name})
        notesDispatch({'type': ENTERED_DESCRIPTION, "description": item.description})
        
    }
  return (
    <ContainerBox className={classes.container}>
        {/* Add todoNotes  */}
        <h1 className='text-center bg-secondary text-light p-2 m-3'>Add Notes</h1>
        <Form onSubmit={addNoteHandler} className={classes['add-note-form']}>
        {message && <p className='message'>{message}</p>}
            <InputBox 
                label = "Title"
                type = "text"
                value={notesState.title}
                onChange={(e) => notesDispatch({'type': ENTERED_TITLE, title: e.target.value})}
                placeholder = "Enter title"
                required
            />
            <InputBox 
                label = "Category"
                type = "text"
                value={notesState.category}
                onChange={(e) => notesDispatch({'type': ENTERED_CATEGORY, "category": e.target.value})}
                placeholder = "Enter category"
                required
            />
            <Form.Group className={`${classes.description} mb-3`} controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as={'textarea'} 
                    style={{ height: '100px' }} 
                    value={notesState.description}
                    onChange={(e) => notesDispatch({'type': ENTERED_DESCRIPTION, "description": e.target.value})}
                    placeholder="Write description here..." 
                    required
                />
            </Form.Group>

            <ButtonBox variant="secondary" type="submit" className={loading ? 'disabled': ''}>
                {!editId ? "Add Note" : "Update Note"}
            </ButtonBox>
        </Form>
        {/* Show todoNotes  */}
        <TodoNotes onPopulateDataToForm={populateDataToForm} />
    </ContainerBox>
  )
}

export default AddViewNotes


