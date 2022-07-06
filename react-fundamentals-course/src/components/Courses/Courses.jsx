import React from "react";
import { CourseCard } from "../CourseCard/CourseCard";
import { useState, useEffect } from "react";
import { Search } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { CreateCourse } from "../CreateCourse/CreateCourse";
import { displayDurationInHoursAndMinutes } from '../../helpers/getCourseDuration';
import './Courses.css';
import { Link, useNavigate } from 'react-router-dom'
// import {mockedCoursesList, mockedAuthorsList} from '../../constants/MockedData'


export const Courses = (props) => {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [courseList, setCourseList] = useState(props.courseList);
    const [displayCourseList, setDisplayCourseList] = useState(props.courseList);
    const [authorList, setAuthorList] = useState(props.authorList)

    // const getAllCourseData = async() => {
    //     axios.get('http://localhost:4000/courses/all').then(res => {
    //         setCourseList(res.data.result);
    //         setDisplayCourseList(res.data.result);
    //         console.log(res.data.result)
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }

    // const getAllAuthorsData = async() => {
    //     axios.get('http://localhost:4000/authors/all').then(res => {
    //         setAuthorList(res.data.result);
    //         console.log(res.data.result)
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }

    // useEffect(() => {
    //     getAllCourseData();
    //     getAllAuthorsData();
    // },[])
    
    // useEffect(() => {
    //     getAllCourseData()
    // },[])


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
        authorList.forEach(author => {
          if(author.id === authorCode){
            return authorName = author.name;
          } 
        })
        return authorName; 
    }

    const searchHandler = (event) => {
        setSearchTerm(event.target.value)
        console.log(event.target.value)
    }

    const searchSubmitHandler = (event) => {
        console.log('coming here?')
        event.preventDefault();
        setDisplayCourseList(courseList.filter((value) => {
            if(searchTerm === ''){
                return value;
            } else if(value.title.toLowerCase().includes(searchTerm.toLowerCase()) || value.id.includes(searchTerm)){
                return value;
            } else {
                return;
            }
        }))
    }

    const displayCourses = () => {
        return displayCourseList.map((data, key) => 
        <div key={data.id}>
            <CourseCard 
                 title={data.title} 
                 description={data.description} 
                 creationDate={data.creationDate} 
                 duration={displayDurationInHoursAndMinutes(data.duration)} 
                 authors={getAuthorName(data.authors)}
                 id={data.id}
             /> 
        </div>
             
         )       
     }

    // useEffect(() => {
    //     setCourseList(props.courseList)
    // },[props.courseList])
    
    // if(showAddCourseScreen){
    //     return (
    //         <div>
    //             <CreateCourse authorList={props.authorList} addNewCourseHandler={addNewCourseHandler} addNewAuthorHandler={addNewAuthorHandler}/>
    //         </div>
    //     )
    // } else {
        return (
            <div className='Body'>
              <div className='BodyHeader'>
                  <Search placeholder='Enter Course Name....' onChange={searchHandler} onClick={searchSubmitHandler}/>
                  <div className='AddCourseButton'>
                        <Link to='/courses/add'>
                            <Button title='Add New Course' />
                        </Link>
                  </div>
              </div>
              {displayCourses()}
            </div>
        )
    // }
}