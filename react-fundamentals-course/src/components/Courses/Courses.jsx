import React from "react";
import { CourseCard } from "../CourseCard/CourseCard";
import { useState, useEffect } from "react";
import { Search } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { CreateCourse } from "../CreateCourse/CreateCourse";
import { displayDurationInHoursAndMinutes } from '../../helpers/getCourseDuration';
import './Courses.css';


export const Courses = (props) => {

    const getAuthorName = (authorCodeArray) => {
        const authorsArray = [];
        let authorsArrayCounter = 1;
        authorCodeArray.forEach(authorCode => {
          if(authorsArrayCounter !== authorCodeArray.length){
            authorsArray.push(checkAuthorId(authorCode) + ', ') 
            authorsArrayCounter++;
          } else {
            authorsArray.push(checkAuthorId(authorCode))
          }
        })
        return authorsArray;
    }
    
    const checkAuthorId = (authorCode) => {  
        let authorName = 'Author ID not found!';
        props.authorsList.forEach(author => {
          if(author.id === authorCode){
            return authorName = author.name;
          } 
        })
        return authorName; 
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [courseList, setCourseList] = useState(props.courseList)

    const searchHandler = (event) => {
        event.preventDefault();
        setCourseList(props.courseList.filter((value) => {
            if(searchTerm === ''){
                return value;
            } else if(value.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || value.id.includes(searchTerm)){
                return value;
            } else {
                return;
            }
        }))
    }

    const [showAddCourseScreen, setShowAddCourseScreen] = useState(false)

    const addNewCourseHandler = (enteredNewCourseData) => {
        const courseData = {
            ...enteredNewCourseData,
            id: Math.random().toString()
        }
        if(showAddCourseScreen === false){
            setShowAddCourseScreen(true)
        } else {
            setShowAddCourseScreen(false)
            props.addCourse(courseData)
        }               
    }

    const addNewAuthorHandler = (enteredNewAuthorData) => {
        const authorData = {
            id: Math.random(100).toString(),
            ...enteredNewAuthorData,
        }
        props.addAuthor(authorData)              
    }

    const displayCourses = (courseList) => {
        return (
            courseList.map((data) => (
                <CourseCard 
                    title={data.title} 
                    description={data.description} 
                    creationDate={data.creationDate} 
                    duration={displayDurationInHoursAndMinutes(data.duration)} 
                    authors={getAuthorName(data.authors)} 
                />
            ))
        )
    }

    useEffect(() => {
        setCourseList(props.courseList)
    },[props.courseList])
    
    if(showAddCourseScreen){
        return (
            <div>
                <CreateCourse authorsList={props.authorsList} addNewCourseHandler={addNewCourseHandler} addNewAuthorHandler={addNewAuthorHandler}/>
            </div>
        )
    } else {
        return (
            <div className='Body'>
              <div className='BodyHeader'>
                  <Search placeholder='Enter Course Name....' setState={setSearchTerm} onClickFunction={searchHandler}/>
                  <div className='AddCourseButton'>
                        <Button title='Add New Course' onClickFunction={addNewCourseHandler}/>
                  </div>
              </div>
              {displayCourses(courseList)}
            </div>
        )
    }
}