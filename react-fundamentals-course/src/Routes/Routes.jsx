import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from '../components/Login/Login'
import Registration from '../components/Registration/Registration'
import CourseInfo from '../components/CourseInfo/CourseInfo'
import { Courses } from '../components/Courses/Courses'
import Home from '../components/Home/Home'
import { CreateCourse } from '../components/CreateCourse/CreateCourse'
import { Header } from '../components/Header/Header'
import PropTypes from 'prop-types'
import { Navigate, useLocation} from "react-router-dom";

export const ProtectedRoute = ({children}) => {
  let location = useLocation();
  if(!localStorage.getItem("token")){
    return <Navigate  to="/login" state={{ from: location }}  replace />;
  }
  return children;
};



const AppRoutes = ({courseList, authorList, addCourseHandler, addAuthorHandler}) => {
  return (
    <Router forceRefresh={true}>
        <Header />
      <Routes>
        <Route exact path='/' element={<Login />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Registration />}/>
        <Route exact path='/courses' element={
        <ProtectedRoute>
          <Courses courseList={courseList} authorList={authorList}/>
        </ProtectedRoute>
        }/>
        <Route path='/courses/add' element={
          <ProtectedRoute>
            <CreateCourse courseList={courseList} authorList={authorList} addCourseHandler={addCourseHandler} addAuthorHandler={addAuthorHandler}/>
          </ProtectedRoute>
        }/>
        <Route path='/courses/:id' element={
          <ProtectedRoute>
            <CourseInfo courseList={courseList} authorList={authorList} />
          </ProtectedRoute>
        }/>
        <Route path='/courseInfo' element={
          <ProtectedRoute>
            <CourseInfo />
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  )
}

AppRoutes.propTypes = {
  courseList: PropTypes.object,
  authorList: PropTypes.object,
  addCourseHandler: PropTypes.func,
  addAuthorHandler: PropTypes.func
}
export default AppRoutes