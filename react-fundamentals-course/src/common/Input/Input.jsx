import React from "react";
import { Button } from "../Button/Button";
import './Input.css';

export const Search = (props) => {
    return (
        <div className='SearchBar'>
            <input type='text' placeholder={props.placeholder} onChange={props.onChange}/>
            <Button title='Search' onClickFunction={props.onClick}/>
        </div>
    )
}

export const Input = (props) => {
    return (
        <div>
            <input type='text' placeholder={props.placeholder} onChange={props.onChange} className='LoginCredentialsInput' required/>
        </div>
    )
}