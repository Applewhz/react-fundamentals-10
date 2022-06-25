import React from "react";
import { Logo } from "./components/Logo/Logo";
import { Button } from "../../common/Button/Button";
import './Header.css'; 

export const Header = (props) => {

    return (
        <div className='header'>
            <div className='logo'>
                <Logo />
            </div>
            <div className='button'> 
                <p className='userName'>{props.userName}</p>
                <Button title='Logout' nameDisplay='userName'/>
            </div>
        </div>        
    )
}