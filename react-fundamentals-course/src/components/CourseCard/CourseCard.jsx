import React, {useEffect, useState} from "react"
import { Button } from "../../common/Button/Button"
import { formatDate } from "../../helpers/formatCreationDate"
import './CourseCard.css'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import coursesAction from "../../store/courses/actions"
import { useNavigate } from 'react-router-dom';

export const CourseCard = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const role = useSelector((state) => state.user.role);
    const [userRole, setuserRole] = useState("");

    useEffect(() => {
        setuserRole(role);
      }, [role]);

    const deleteHandler = (event) => {
        event.preventDefault()
        dispatch(coursesAction.deleteCourse(props.id))
    }

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
                    <div>
                        <Link to={`/courses/${props.id}`}>
                            <Button title='Show Course' />
                        </Link>
                    </div>
                    {userRole === 'admin' && (
                        <>
                         <Link to={`/courses/update/${props.id}`}>
                            <div className='EditAndDeleteButtonContainer'> 
                                <FontAwesomeIcon icon={faPen} />  
                            </div>
                            </Link> 
                            <div className='EditAndDeleteButtonContainer'>
                                <FontAwesomeIcon icon={faTrash} onClick={deleteHandler}/>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}