import React from "react";
import { Button } from "../../common/Button/Button";
import { formatDate } from "../../helpers/formatCreationDate";
import './CourseCard.css'; 

export const CourseCard = (props) => {

    return (
        <div className='CourseCardContainer'>
            <div className='LeftSide'>
                <h1 className='Title'>{props.title}</h1>
                <p className='Description'>{props.description}</p>
            </div>
            <div className='RightSide'>
                <div className='RightContents'>
                    <div className='RightSegments' style={{whiteSpace: 'nowrap'}}>
                        <h4 className='alternateTitle'>Authors: </h4>
                        <p style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>{props.authors}</p>
                    </div>
                    <div className='RightSegments'>
                        <h4 className='alternateTitle'>Duration: </h4>
                        <p>{props.duration}</p>
                    </div>
                    <div className='RightSegments'>
                        <h4 className='alternateTitle'>Created: </h4>
                        <p>{formatDate(props.creationDate)}</p>
                    </div>
                </div>
                <div className='ButtonContainer'>
                    <Button title='Show Course' />
                </div>
            </div>
        </div>
    )
}