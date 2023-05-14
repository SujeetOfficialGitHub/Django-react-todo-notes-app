import React, { useState } from 'react'
import {ImCancelCircle} from 'react-icons/im'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import InputBox from '../../ui/inputBox/InputBox'
import Modal from '../../ui/modal/Modal'
import { Form } from 'react-bootstrap'
import classes from './Login.module.css'
import ButtonBox from '../../ui/buttonBox/ButtonBox'
import { login } from '../../../app/features/authSlice'
import { AuthActions } from '../../../app/features/authSlice'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const [fieldError, setFieldError] = useState('');

  const dispatch = useDispatch();

  const {errors, loading, message} = useSelector(state => state.auth)

  const loginHandler = async(e) => {
    e.preventDefault()
    const enteredData = {email, password}
    try{
      await dispatch(login({enteredData})).unwrap();
      setEmail('');
      setPassword('');
      setFieldError('');
      dispatch(AuthActions.resetState());
      props.closeLoginFormHandler()
    }catch(error){
      console.log(error)
      if (error && error.non_field_errors){
        setFieldError(error.non_field_errors[0])
      }
    }

  }
  if (fieldError){
    setTimeout(() => {
        setFieldError('')
    }, 5000)
  };
  return (
    <Modal className={classes.login} onClick={props.closeLoginFormHandler}>
        <ImCancelCircle onClick={props.closeLoginFormHandler} className={classes['close-login-form']} />
        <h3 className={classes['login-form-heading']}>Please login here</h3>
        {!message && fieldError && <p className='fieldError'>{fieldError}</p>}
        {message && !fieldError && <p className='message'>{message}</p>}
        <Form className={classes['login-form']} onSubmit={loginHandler}>
            <InputBox
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              error={errors && errors.email ? errors.email[0] : false}
            />
            <InputBox
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              error={errors && errors.password ? errors.password[0] : false}
            />
            <Link className={classes['forgot-password-link']}>Forgot Password</Link>
            <ButtonBox
              type="submit"
              variant="secondary"
              className={`${classes['login-btn']} ${loading ? 'disabled': ''}`}
            >
              Login
            </ButtonBox>
        </Form>
        <div>
          <p className={classes['signup-link']}>Don't have an account <Link>Please Signup</Link></p>
        </div>
    </Modal>
  )
}

export default Login