import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from '../components/Login/Login'
import Registration from '../components/Registration/Registration'
import CourseInfo from '../components/CourseInfo/CourseInfo'
import { Courses } from '../components/Courses/Courses'
import { CreateCourse } from '../components/CreateCourse/CreateCourse'
import { Header } from '../components/Header/Header'

const AppRoutes = (props) => {
  return (
    <Router forceRefresh={true}>
        <Header />
      <Routes>
        <Route exact path='/' element={<Login />}/>
        <Route path='/login' element={<Login />}/>
        <Route exact path='/courses' element={<Courses courseList={props.courseList} authorList={props.authorList}/>}/>
        <Route path='/courses/add' element={<CreateCourse courseList={props.courseList} authorList={props.authorList} addCourseHandler={props.addCourseHandler} addAuthorHandler={props.addAuthorHandler}/>}/>
        <Route path='/courses/:id' element={<CourseInfo courseList={props.courseList} authorList={props.authorList} />}/>
        <Route path='/register' element={<Registration />}/>
        <Route path='/courseInfo' element={<CourseInfo />}/>
      </Routes>
    </Router>
  )
}

export default AppRoutes