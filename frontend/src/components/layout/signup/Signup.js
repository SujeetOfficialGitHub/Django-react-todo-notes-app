import React, { useState } from 'react'
import {ImCancelCircle} from 'react-icons/im'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import InputBox from '../../ui/inputBox/InputBox'
import Modal from '../../ui/modal/Modal'
import { Form } from 'react-bootstrap'
import classes from './Signup.module.css'
import ButtonBox from '../../ui/buttonBox/ButtonBox'
import { signup } from '../../../app/features/authSlice'
import { AuthActions } from '../../../app/features/authSlice'

const Signup = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const [fieldError, setFieldError] = useState('');

    const dispatch = useDispatch()

    const {errors, loading, message} = useSelector(state => state.auth)

    const loginHandler = async(e) => {
        e.preventDefault();
        // User Input frontend Validation 
        if (password === cPassword){
            if (name.trim().length<=2){
                setFieldError('Name must be greater than 2 character')
            }else if(email.trim().length < 10){
                setFieldError("Please enter currect email")
            }else if(password.trim().length<=5){
                setFieldError('Password must be 6 character')
            }else if(acceptTerms === false){
                setFieldError('Please accept terms')
            }else{
                const enteredData = {name, email, password, password2:cPassword, tc:acceptTerms}
                try{
                    await dispatch(signup({enteredData})).unwrap()
                    setName('');
                    setEmail('');
                    setPassword('');
                    setCPassword('');
                    dispatch(AuthActions.resetState());
                    props.closeSignupFormHandler()
                }catch(error){
                    if (error && error.non_field_errors){
                        setFieldError(error.non_field_errors[0])
                    }
                    console.log(error)
                }
            }
        }else{
            setFieldError('Fassword and Confirm Password does not match')
        }
    }

    // Clear field error after 5seconds
    if (fieldError){
        setTimeout(() => {
            setFieldError('')
        }, 5000)
    }

  return (
    <Modal className={classes.signup} onClick={props.closeSignupFormHandler}>
        <ImCancelCircle onClick={props.closeSignupFormHandler} className={classes['close-signup-form']} />
        <h3 className={classes['signup-form-heading']}>Please signup here</h3>
        {!message && fieldError && <p className='fieldError'>{fieldError}</p>}
        {message && !fieldError && <p className='message'>{message}</p>}

        <Form className={classes['signup-form']} onSubmit={loginHandler}>
            <InputBox
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              error={errors && errors.name ? errors.name[0] : false}
            />
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
            <InputBox
              label="Confirm Password"
              type="password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              placeholder="Enter your confirm password"
              error={errors && errors.password2 ? errors.password2[0] : false}
            />
            <div className={classes['accept-terms']}>
                <input 
                    type="checkbox" 
                    value={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}    
                />
                <label htmlFor="terms">Accept Terms</label>
            </div>

            <ButtonBox
              type="submit"
              variant="secondary"
              className={`${classes['signup-btn']} ${loading ? 'disabled': ''}`}
            >
              Sign up
            </ButtonBox>
        </Form>
        <div>
          <p className={classes['login-link']}>Already have an account <Link>Please Login</Link></p>
        </div>
    </Modal>
  )
}

export default Signup