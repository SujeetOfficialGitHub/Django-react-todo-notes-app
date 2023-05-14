import React from 'react'
import {createPortal} from 'react-dom'
import classes from './Modal.module.css'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick}/>
}

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={`${classes.content} ${props.className}`}>{props.children}</div>
        </div>
    )
}
const portalElement = document.getElementById('overlay')

const Modal = (props) => {
    return (
        <>
        {createPortal(<Backdrop onClick={props.onClick}/>, portalElement)}
        {createPortal(<ModalOverlay className={props.className}>{props.children}</ModalOverlay>, portalElement)}
        </>
    )
}

export default Modal