import './App.css';
import { Outlet } from 'react-router-dom'
import AppRoutes from './Routes/Routes';
import { useState, useEffect } from 'react';
import {mockedCoursesList, mockedAuthorsList} from './constants/MockedData'

function App() {
  const [courseList, setCourseList] = useState(mockedCoursesList);
  const [authorList, setAuthorList] = useState(mockedAuthorsList);

  useEffect(() => {
    setCourseList(courseList)
  },[courseList])

  useEffect(() => {
    setAuthorList(authorList)
  },[authorList])

  const addCourseHandler = (newCourse) => {
    
    setCourseList(prevCourseList => {
      return (
        [...prevCourseList, newCourse]
      )
    })
  }

  const addAuthorHandler = (newAuthor) => {
    setAuthorList(prevAuthorList => {
      return (
        [...prevAuthorList, newAuthor] 
      )
    })
    return authorList;
  }
  return (
    <div className="App">  
      <AppRoutes courseList={courseList} authorList={authorList} addCourseHandler={addCourseHandler} addAuthorHandler={addAuthorHandler}/>
      <Outlet />
    </div>
  );
}

export default App;