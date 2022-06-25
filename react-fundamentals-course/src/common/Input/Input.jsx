import React from "react";
import { Button } from "../Button/Button";
import './Input.css';

export const Search = (props) => {
    return (
        <div className='SearchBar'>
            <input type='text' placeholder={props.placeholder} onChange={(event) => {props.setState(event.target.value)}}/>
            <Button title='Search' onClickFunction={props.onClickFunction}/>
        </div>
    )
}