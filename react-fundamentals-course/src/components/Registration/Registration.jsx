import React from "react";
import { Button } from "../../common/Button/Button";
import { Input } from "../../common/Input/Input";
import { Header } from "../Header/Header";
import { useState } from "react";
import './Registration.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Registration = () => {

    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: ''
    })

    const emailHandler = (event) => {
        setUserDetails((prevState) => {
            return {...prevState, email: event.target.value}
        })
    }

    const passwordHandler = (event) => {
        setUserDetails((prevState) => {
            return {...prevState, password: event.target.value}
        })
    }

    const nameHandler = (event) => {
        setUserDetails((prevState) => {
            return {...prevState, name: event.target.value}
        })
    }

    const registrationCredentialCheck = (name, email, password) => {  
        const emailParams1 = '@';
        const emailParams2 = '.com';
        
        if( name !== '' && email.includes(emailParams1) && email.includes(emailParams2) && password.length >= 6){
            return true;
        } else {
            alert('Registration form is incomplete')
            return false;
        }
    }
    

    const postUserRegistrationDetails = async () => {
        axios
            .post('http://localhost:4000/register', userDetails)
            .then((response) => {
            console.log(response);
            navigate('/login');
            console.log(response.data.result);
            // localStorage.setItem('token', response.data.result);
            })
            .catch((error) => {
            console.log(error);
            alert('Sorry, Sign up failed. Please try again')
            });
    }

    const onSubmitRegistration = (event) => {
        event.preventDefault()
        if(registrationCredentialCheck(userDetails.name, userDetails.email, userDetails.password)){
            postUserRegistrationDetails()
        } else {
            alert('Please check input fields')
        }
    }

    return (
        <div>
            {/* <Header title='Login'/> */}
            <div className='Register'>
                <h2>Registration</h2>
                <form className='RegistrationForm' onSubmit={onSubmitRegistration}>
                    <div className='RegisterCredentials'>
                        <p>Name</p>
                        <Input placeholder='Enter Name'className='RegisterCredentialsInput' onChange={nameHandler}/>
                    </div>
                    <div className='RegisterCredentials'>
                        <p>Email</p>
                        <Input placeholder='Enter Email' className='RegisterCredentialsInput' onChange={emailHandler}/>
                    </div>
                    <div className='RegisterCredentials'>
                        <p>Password</p>
                        <Input placeholder='Enter Password'className='RegisterCredentialsInput' onChange={passwordHandler}/>
                    </div>
                    <div className='RegisterButton'>
                        <Button title='Register' type='submit' onClickFunction={onSubmitRegistration} />
                    </div>
                    <div className='ToRegistration'>
                        <p>If you already have an account, you can Login</p>
                        <Link to='/login' className='Link'>HERE</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration;