import React from 'react';
import {BiEdit} from 'react-icons/bi';
import {FaTrash} from 'react-icons/fa';
import { Card, Col } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import ButtonBox from '..//../components/ui/buttonBox/ButtonBox';

import classes from './TodoNote.module.css'
import { deleteTodoNote } from '../../app/features/todoNotesSlice';


const TodoNote = ({item, onPopulateDataToForm}) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
        
    const deleteNoteHandler = (slug) => {
        dispatch(deleteTodoNote({token, slug}))
    }
    return (
    <Col lg={4} md={4} sm={6} className='mt-4'>
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
                            type="button"
                            onClick={() => onPopulateDataToForm(item)}
                            className={classes['notes-edit']}
                            variant='warning'
                        ><BiEdit/></ButtonBox>
                        <ButtonBox 
                            type="button"
                            onClick={() => deleteNoteHandler(item.slug)}
                            className={classes['notes-delete']}
                            variant="danger"
                        ><FaTrash/></ButtonBox>
                    </div>
                </Card.Body>
            </Card>
            </Col>
  )
}

export default React.memo(TodoNote)

