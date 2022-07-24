import React from "react";
import { Logo } from "./components/Logo/Logo";
import { Button } from "../../common/Button/Button";
import './Header.css'; 
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";

export const Header = () => {

    const navigate = useNavigate();
    const [userNameData, setUserNameData] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    
    useEffect(() => {
        localStorage.clear()
    }, [])

    useEffect(() => {
        localStorage.length > 0 ? setLoginStatus('Logout') : setLoginStatus('Login')
    }, [localStorage.name, userNameData])

    useEffect(() => {
        setUserNameData(localStorage.name)
    }, [loginStatus, localStorage.name, userNameData])

    const onClickHandler = (event) => {
        event.preventDefault()
        if(loginStatus === 'Logout'){
            console.log(localStorage)
            localStorage.clear()
            setLoginStatus('Login');
            setUserNameData('');
            navigate('/login');
        } else {
            localStorage.length > 0 ? setLoginStatus('Logout') : setLoginStatus('Login')
        }
    }

        return (
            <div className='header'>
                <div className='logo'>
                    <Logo />
                </div>
                <div className='button'> 
                    <p className='userName'>{userNameData}</p>
                    {localStorage.length > 0 &&
                        <Button title={loginStatus} onClickFunction={onClickHandler}/>
                    }
                </div>
            </div>        
        )
}