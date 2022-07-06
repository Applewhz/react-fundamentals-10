import React from 'react';
import { Button } from "../../common/Button/Button";
import { Input } from "../../common/Input/Input";
import { useState } from "react";
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
    
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({
        'email': '',
        'password': '',
    });

    // localStorage.clear()
    const emailHandler = (event) => {
        setLoginDetails((prevState) => {
            return {...prevState, email: event.target.value}
        })
    }

    const passwordHandler = (event) => {
        setLoginDetails((prevState) => {
            return {...prevState, password: event.target.value}
        })
    }

    const postLoginDetails = async () => {
        axios
          .post('http://localhost:4000/login', loginDetails)
          .then((response) => {
            console.log(response);
            console.log(response.data.result);
            localStorage.setItem('token', response.data.result.replace('Bearer', '').trim());
            localStorage.setItem('name', response.data.user.name)
            console.log(localStorage.token)
            localStorage.token ? navigate('/courses') : null;
          })
          .catch((error) => {
            console.log('over here error')
            console.log(error);
          });
    }

    const loginHandler = (event) => {
        event.preventDefault()
        postLoginDetails()
    }

    return (
        <div>
            <div className='Login'>
                <h2>Login</h2>
                <form className='LoginForm' onSubmit={loginHandler}>
                    <div className='LoginCredentials'>
                        <p>Email</p>
                        <Input placeholder='Enter Email' className='LoginCredentialsInput' onChange={emailHandler}/>
                    </div>
                    <div className='LoginCredentials'>
                        <p>Password</p>
                        <Input placeholder='Enter Password'className='LoginCredentialsInput' onChange={passwordHandler} type="password"/>
                    </div>
                <div className='LoginButton'>
                    <Button title='Login' type='submit'/>
                </div>
                </form>
                <div className='ToRegistration'>
                    <p>If you do not have an account, you can Register</p>
                    <Link to='/register' className='Link'>HERE</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;