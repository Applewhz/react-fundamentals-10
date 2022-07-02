import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './CourseInfo.css';
import { displayDurationInHoursAndMinutes } from '../../helpers/getCourseDuration';

const CourseInfo = (props) => {

    const [courseListData, setCourseListData] = useState(props.courseList);
    const [courseData, setCourseData] = useState('');
    const [authorList, setAuthorList] = useState(props.authorList);
    const { id } = useParams()

    console.log(courseListData)
    useEffect(() => {
        setCourseListData(props.courseList)
        setAuthorList(props.authorList);
    },[props.courseList, props.authorList])


    const getCourseData = () => {
        let currentCourse = {}
        courseListData.forEach(course => {
            if(course.id === id) {
                return currentCourse = course 
            } else {
                return
            }
        })
        setCourseData(currentCourse)
    }


    useEffect(() => {
        getCourseData()
    },[])

    const displayAuthorName = () => {
        const authorsArray = [];
        if(courseData.authors === undefined){
            return (
                <p>is Loading</p>
            )
        } else {
            courseData.authors.map(authorCode => {
            return authorsArray.push(checkAuthorId(authorCode)) 
            })
        
        }

        return authorsArray.map(data => {
            return (
                <p>{data}</p>
            )
        })  
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

    return (
        <div>
            <div className='courseInfo'>
                <div className='courseInfoTopSegment'>
                    <div className='Back'>
                            <h3>{`<`}</h3>
                            <Link to='/courses' className='Link'>Back To Courses</Link>
                    </div>
                    <div className='courseInfoTitle'>
                        <h1>{courseData.title}</h1>
                    </div>
                </div>
                <div className='courseInfoBottomSegment'>
                    <div className='courseInfoBottomSegmentLeft'>
                        <h3>{courseData.description}</h3>
                    </div>
                    <div className='courseInfoBottomSegmentRight'>
                        <div className='courseInfoID'>
                            <div>
                                <h4>ID:</h4>
                            </div>
                            <div>
                                <p>{courseData.id}</p>
                            </div>
                        </div>
                        <div className='courseInfoDuration'>
                            <h4>Duration :</h4>
                            <p>{displayDurationInHoursAndMinutes(courseData.duration)} hours</p>
                        </div>
                        <div className='courseInfoCreated'>
                            <h4>Created :</h4>
                            <p>{courseData.creationDate}</p>
                        </div>
                        <div className='courseInfoAuthor'>
                            <h4>Author :</h4>
                            <p>{displayAuthorName()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default CourseInfo;