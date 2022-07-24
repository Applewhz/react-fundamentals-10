import React from "react";
import { Button } from "../../common/Button/Button";
import './CreateCourse.css';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { displayDurationInHoursAndMinutes } from '../../helpers/getCourseDuration'
import axios from 'axios'
import { Input } from "../../common/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import authorsAction from "../../store/authors/actions";
import coursesAction from "../../store/courses/actions";

export const CreateCourse = () =>{

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authors = useSelector((state) => state.authors.authorList)
    const [authorList, setAuthorList] = useState([]);
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [timeDuration , setTimeDuration] = useState(0)
    const [courseAuthorList , setCourseAuthorList] = useState([])
    const [selectedAuthorList , setSelectedAuthorList] = useState([])
    const [newAuthorName , setNewAuthorName] = useState('')
    const [courseCreated, setCourseCreated ] = useState(false)
    const createNewCourseStatus = useSelector((state) => state.courses.createNewCourseStatus)

    useEffect(() => {
        dispatch(authorsAction.getAuthorList())
    },[dispatch])

    useEffect(() => {
        setAuthorList(authors)
        setCourseAuthorList(authors)
    },[authors])

    useEffect(() => {
      setCourseAuthorList(getAuthorID(authorList))
    },[authorList])

    // useEffect(() => {
    //     setCourseCreated(createNewCourseStatus)
    //     // console.log('user created:', registrationStatus)
    // },[createNewCourseStatus])

    // useEffect(() => {
    //     setCourseAuthorList(props.authorList.map(data => data.id))
    //     setAuthorList(props.authorList)
    // },[props.authorList])

    const titleChangeHandler = (event) => {
        setTitle(event.target.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value)
    }

    const durationChangeHandler = (event) => {
        setTimeDuration(event.target.value)
    }

    const newAuthorHandler = (event) => {
            setNewAuthorName(event.target.value)
    }

    const getAuthorID = (authorListObject) => {
        let authorIDList = [];
        authorListObject.map(data => {
            return authorIDList.push(data.id)
        })
        return authorIDList;
    }

    const addNewAuthorHandler = (event) => {
        event.preventDefault();
        if(newAuthorName === '' || newAuthorName.trim().length < 2){
            return;
        } else {
            const newAuthor = {
                "name": newAuthorName,
                id: uuidv4(),
            }
            dispatch(authorsAction.postNewAuthor({name: newAuthor.name}))
            setNewAuthorName('')
        }
    }

    const checkAuthorId = (authorCode) => {  
        let authorName = 'Author ID not found!';
        authorList.forEach(author => {
          if(author.id === authorCode){
            return authorName = author.name;
          } 
        })
        return authorName; 
    }

    const addCourseAuthorHandler = (event) => {
        event.preventDefault();
        setSelectedAuthorList(prevSelectedAuthorList => {
            return (
                [...prevSelectedAuthorList, event.target.value]
            )
        })
        setCourseAuthorList(courseAuthorList.filter(data => data !== event.target.value))
    }

    const removeCourseAuthorHandler = (event) => {
        event.preventDefault();
        setCourseAuthorList(prevCourseAuthorList => {
            return (
                [...prevCourseAuthorList, event.target.value]
            )
        })
        setSelectedAuthorList(selectedAuthorList.filter(data => data !== event.target.value))
    }

    const displayAuthorsList = (authorList) => {
        return (
            authorList.map(data => {
               return (
                   <div className='AddAuthorSegment'>
                       <div className='AuthorName'>
                            <p>{checkAuthorId(data)}</p>
                       </div>
                       <div className='AuthorButton'>
                            <Button onClickFunction={addCourseAuthorHandler} title='Add Author' className='AuthorButton' value={data}/>
                       </div>
                   </div>
               )
            })
        )   
    }

    const displaySelectedAuthorsList = (selectedAuthorArray) => {
        if(selectedAuthorArray.length === 0){
            return (
                <div className='EmptyCourseAuthorSegment'>
                    <p>Author List is Empty</p>
                </div>
            )
        } else {
            return (
                selectedAuthorArray.map(data => {
                    return (
                        <div className='AddAuthorSegment'>
                            <div className='AuthorName'>
                                <p>{checkAuthorId(data)}</p>
                            </div>
                            <div className='AuthorButton'>
                            <Button onClickFunction={removeCourseAuthorHandler} title='Remove Author' className='AuthorButton' value={data}/>
                            </div>
                        </div>
                    )
                })
            ) 
        }
          
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(title === '' || description === '' || timeDuration === 0 || selectedAuthorList.length === 0){
            alert('Please fill in all fields!');
        } else {
            const today = new Date();
            const date = today.getDate() + '/' + parseInt(today.getMonth() + 1) + '/' + today.getFullYear();
            const newCourse = {
                id: uuidv4(),
                title: title,
                description: description,
                creationDate: date,
                duration: timeDuration,
                authors: selectedAuthorList,
            }
            dispatch(coursesAction.postNewCourse({
                title: newCourse.title,
                description: newCourse.description,
                duration: Number(newCourse.duration),
                authors: newCourse.authors
            }))
        }
        
    }

    return (
        <div className='Create'>
            <form onSubmit={submitHandler}>
                <div className='TopSegmentTitleAndButton'>
                    <div>
                        <h4>Title:</h4>
                        <input placeholder='Enter Title...' className='CreateCourseTitle' onChange={titleChangeHandler} />
                    </div>
                    <div className='CreateCourseButton'>
                        <Button title='Create Course' type='submit' />
                        {courseCreated ? navigate('/courses') : null}
                    </div>
                </div>
                <div className='Description'>
                    <h4>Description:</h4>
                    <textarea placeholder='Enter Description...' className='CreateCourseDescription' onChange={descriptionChangeHandler}/>
                </div>
                <div className='BottomSegment'>
                    <div className='BottomSegmentLeft'>
                        <div className='AddAuthor'>
                            <h2>Add Authors</h2>
                            <h4>Author name</h4>
                            <input type='text' placeholder='Enter Author Name' className='CreateCourseAddAuthor' onChange={newAuthorHandler} value={newAuthorName}/>
                            <Button title='Create Author' onClickFunction={addNewAuthorHandler}/>
                        </div>
                        <div className='Duration'>
                            <h2>Duration</h2>
                            <h4>Duration</h4>
                            <input type='number' placeholder='Enter duration in minutes...' onChange={durationChangeHandler} min='0' className='CreateCourseDuration'/>
                            <div className='DurationDisplay'>
                                <p>Duration :</p>
                                <h3>{displayDurationInHoursAndMinutes(timeDuration)}</h3>
                                <p>hours</p>
                            </div>
                        </div>
                    </div>
                    <div className='BottomSegmentRight'>
                        <div className='CourseAuthorsSegment'> 
                            <h2>Authors</h2>
                            {displayAuthorsList(courseAuthorList)}
                        </div>
                        <div className='CourseAuthorsSegment'>
                            <h2>Course Authors</h2>
                            {displaySelectedAuthorsList(selectedAuthorList)}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}