import './App.css'
import { Outlet } from 'react-router-dom'
import AppRoutes from './Routes/Routes'
import { useState, useEffect } from 'react'
import {mockedCoursesList, mockedAuthorsList} from './constants/MockedData'
import { useSelector } from 'react-redux'


function App() {
  const role = useSelector((state) => state.user.role)
  const [courseList, setCourseList] = useState(mockedCoursesList)
  const [authorList, setAuthorList] = useState(mockedAuthorsList)
  const [userRole, setuserRole] = useState("")

  useEffect(() => {
      setuserRole(role);
  }, [role])

  // useEffect(() => {
  //   setCourseList(courseList)
  // },[courseList])

  // useEffect(() => {
  //   setAuthorList(authorList)
  // },[authorList])

  // const addCourseHandler = (newCourse) => {
    
  //   setCourseList(prevCourseList => {
  //     return (
  //       [...prevCourseList, newCourse]
  //     )
  //   })
  // }

  // const addAuthorHandler = (newAuthor) => {
  //   setAuthorList(prevAuthorList => {
  //     return (
  //       [...prevAuthorList, newAuthor] 
  //     )
  //   })
  //   return authorList;
  // }
  return (
    <div className="App">  
      <AppRoutes role={userRole}/>
      <Outlet />
    </div>
  );
}

export default App;