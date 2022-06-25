import React from "react";
import { CourseCard } from "../CourseCard/CourseCard";
import { useState, useEffect } from "react";
import { Search } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { CreateCourse } from "../CreateCourse/CreateCourse";
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
    
    const durationConversionToHoursMinutes = (durationInMinutes) => {
        let convertedDuration = '';
        let outputHours = '';
        let outputMinutes = '';
        const hours = Math.floor(durationInMinutes/60);
        const minutes = durationInMinutes % 60;
        if(hours < 10){
            outputHours = `0${hours}` ;
        } else {
            outputHours = `${hours}`;
        }
        if(minutes < 10){
            outputMinutes = `0${minutes}`
        } else {
            outputMinutes = `${minutes}`
        }
        convertedDuration = `${outputHours}:${outputMinutes}`;
        return convertedDuration;
    }
    const [searchTerm, setSearchTerm] = useState('');
    // const [searchList, setSearchList] = useState(props.courseList);
    const [courseList, setCourseList] = useState(props.courseList)

    const searchHandler = (event) => {
        event.preventDefault();
        setCourseList(props.courseList.filter((value) => {
            if(searchTerm === ''){
                return value;
            } else if(value.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || value.id.includes(searchTerm)){
                return value;
            } else {
                // eslint-disable-next-line array-callback-return
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
        // console.log(courseData);
        
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
        console.log(authorData);
        props.addAuthor(authorData)              
    }

    const displayCourses = (courseList) => {
        return (
            courseList.map((data) => (
                <CourseCard 
                    title={data.title} 
                    description={data.description} 
                    creationDate={data.creationDate} 
                    duration={durationConversionToHoursMinutes(data.duration)} 
                    authors={getAuthorName(data.authors)} 
                />
            ))
        )
    }

    useEffect(() => {
        setCourseList(props.courseList)
        console.log(courseList)
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