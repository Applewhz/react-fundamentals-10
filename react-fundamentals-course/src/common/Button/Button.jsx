import React from "react";
import './Button.css';

export const Button = (props) => {
        return (
        <div>
            <button onClick={props.onClickFunction} value={props.value} type={props.type}>{props.title}</button>
        </div>
        )
}

// export const updateButton = (props) => {
//     return (
//     <div>
//         <button onClick={props.onClickFunction} value={props.value} type={props.type}>{props.title}</button>
//     </div>
//     )
// }

// export const Button = (props) => {
//     return (
//     <div>
//         <button onClick={props.onClickFunction} value={props.value} type={props.type}>{props.title}</button>
//     </div>
//     )
// }