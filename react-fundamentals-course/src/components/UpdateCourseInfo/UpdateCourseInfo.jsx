import React from "react"
import { Button } from "../../common/Button/Button"
import './UpdateCourseInfo.css'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import authorsAction from "../../store/authors/actions"
import coursesAction from "../../store/courses/actions"
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import { displayDurationInHoursAndMinutes } from '../../helpers/getCourseDuration'

export const UpdateCourseInfo = () =>{

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    
    const authors = useSelector((state) => state.authors.authorList)
    const courses = useSelector((state) => state.courses.courseList)
    const courseDetail = courses.find((course)=>course.id === id)

    const [courseData, setCourseData] = useState('')
    const [title , setTitle] = useState(courseDetail.title)
    const [description , setDescription] = useState(courseDetail.description)
    const [timeDuration , setTimeDuration] = useState(courseDetail.duration)
    const [selectedAuthorList , setSelectedAuthorList] = useState(courseDetail.authors)
    const [authorList, setAuthorList] = useState([])
    const [courseAuthorList , setCourseAuthorList] = useState([])
    const [newAuthorName , setNewAuthorName] = useState('')

    useEffect(() => {
        setAuthorList(authors);
    }, [authors])
    
    useEffect(() => {
        dispatch(coursesAction.getCourseDetail(id))
    }, [])

    useEffect(() => {
        setCourseAuthorList(getAuthorID(authorList))
      },[authorList])

    useEffect(() => {
        setCourseData(courseDetail);
    }, [courseDetail])

    const getAuthorID = (authorListObject) => {
        let authorIDList = [];
        authorListObject.map(data => {
            return authorIDList.push(data.id)
        })
        let updatedAuthorIDList = authorIDList.filter(data => !selectedAuthorList.includes(data))
        return updatedAuthorIDList;
    }

    const availableAuthors = authors.filter(
        (availableAuthor) => !courseAuthorList.includes(availableAuthor)
    )
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

    const deleteAuthorHandler = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        dispatch(authorsAction.deleteAuthor(event.target.value))
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
                        <Button onClickFunction={deleteAuthorHandler} title='Delete Author' className='AuthorButton' value={data}/>
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
                        <div className='SelectedAuthorButton'>
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
            return;
        } else {
            const updatedCourse = {
                title: title,
                description: description,
                duration: timeDuration,
                authors: selectedAuthorList,
            }  
            dispatch(coursesAction.updateCourse(id , {
                title: updatedCourse.title,
                description: updatedCourse.description,
                duration: Number(updatedCourse.duration),
                authors: updatedCourse.authors,
            })) 
            navigate('/courses') 
        }    
    }

    return (
        <div className='Create'>
            <form onSubmit={submitHandler}>
                <div className='TopSegmentTitleAndButton'>
                    <div>
                        <h4>Title:</h4>
                        <input placeholder='Enter Title...' className='CreateCourseTitle' onChange={titleChangeHandler} value={title}/>
                    </div>
                    <div className='CreateCourseButton'>
                        <Button title='Update' type='submit' />
                    </div>
                </div>
                <div className='Description'>
                    <h4>Description:</h4>
                    <textarea placeholder='Enter Description...' className='CreateCourseDescription' onChange={descriptionChangeHandler} value={description}/>
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
                            <input type='number' placeholder='Enter duration in minutes...' onChange={durationChangeHandler} min='0' className='CreateCourseDuration' value={timeDuration}/>
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
export default UpdateCourseInfo
