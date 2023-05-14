import React from 'react'
import {Button} from 'react-bootstrap'
import classes from './ButtonBox.module.css'
const ButtonBox = (props) => {
  const {children, className, variant, type, onClick} = props
  return (
    <Button
      type={type || "button"}
      onClick={onClick}
      className={`${className} ${classes['btn']}`}
      variant={variant}
    >
      {children}
    </Button>
  )
}

export default ButtonBox