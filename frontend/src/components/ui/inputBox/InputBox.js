import React from 'react'
import { Form } from 'react-bootstrap'
import classes from './InputBox.module.css'
const InputBox = (props) => {
  const {label, type, value, onChange, placeholder, required, error} = props
  return (
    <Form.Group className={`${classes['input-box']} mb-5`} controlId={label}>
        <Form.Label>{label}</Form.Label>
        <Form.Control  
          type={type || "text"}
          value={value}
          onChange={onChange} 
          placeholder={placeholder} 
          required={required}
        />
        {error && <Form.Text className="text-danger fs-4 text-capitalize">
          {error}
        </Form.Text>}
    </Form.Group>
  )
}

export default InputBox