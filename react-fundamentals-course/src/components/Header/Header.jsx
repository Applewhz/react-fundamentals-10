import React from "react";
import { Logo } from "./components/Logo/Logo";
import { Button } from "../../common/Button/Button";
import './Header.css'; 
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react";

export const Header = () => {

    const navigate = useNavigate();
    const [userNameData, setUserNameData] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    
    useEffect(() => {
        setUserNameData(localStorage.name)
    }, [])

    useEffect(() => {
        setLoginStatus('Logout');
    }, [localStorage.name, userNameData])

    useEffect(() => {
        setUserNameData(localStorage.name)
    }, [loginStatus, localStorage.name, userNameData])

    const onClickHandler = (event) => {
        event.preventDefault()
        if(loginStatus === 'Logout'){
            localStorage.clear()
            setLoginStatus('Login');
            setUserNameData('');
            navigate('/login');
        } else {
            setLoginStatus('Logout');
        }
    }

    
    if(localStorage.length > 0){
        return (
            <div className='header'>
                <div className='logo'>
                    <Logo />
                </div>
                <div className='button'> 
                    <p className='userName'>{userNameData}</p>
                    {/* <Link to='./login'> */}
                        <Button title={loginStatus} onClickFunction={onClickHandler}/>
                    {/* </Link> */}
                </div>
            </div>        
        )
    } else {
        return (
            <div className='header'>
                <div className='logo'>
                    <Logo />
                </div>
            </div>        
        )
    }
}