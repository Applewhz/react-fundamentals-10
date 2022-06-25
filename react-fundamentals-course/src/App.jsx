import './App.css';
import { Header } from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { useState, useEffect } from 'react';
import { mockedCoursesList, mockedAuthorsList } from './constants/MockedData'

function App() {
  const [courseList, setCourseList] = useState(mockedCoursesList);
  const [authorsList, setAuthorsList] = useState(mockedAuthorsList);

  useEffect(() => {
    return setCourseList(courseList)
  },[courseList])

  useEffect(() => {
    setAuthorsList(authorsList)
  },[authorsList])

  const addCourseHandler = (newCourse) => {
    
    setCourseList(prevCourseList => {
      return (
        [...prevCourseList, newCourse]
      )
    })
  }

  const addAuthorHandler = (newAuthor) => {
    setAuthorsList(prevAuthorList => {
      return (
        [...prevAuthorList, newAuthor] 
      )
    })
    return authorsList;
  }

  return (
    <div className="App">  
        <Header userName='userName'/>
        <div>
          <Courses courseList={courseList} authorsList={authorsList} addCourse={addCourseHandler} addAuthor={addAuthorHandler}/>
        </div>
    </div>
  );
}

export default App;