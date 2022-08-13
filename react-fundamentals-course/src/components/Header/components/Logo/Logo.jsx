import React from "react";
import CourseLogo from './courseLogo.png';
import './Logo.css';

export const Logo = () => {
    
    return( 
            <div className='logo' data-testid='header-logo'>
                <img src={CourseLogo} alt='courseLogo'/>
            </div>
    )
}