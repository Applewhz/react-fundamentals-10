import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from '../components/Login/Login'
import Registration from '../components/Registration/Registration'
import CourseInfo from '../components/CourseInfo/CourseInfo'
import { Courses } from '../components/Courses/Courses'
import { CreateCourse } from '../components/CreateCourse/CreateCourse'
import { Header } from '../components/Header/Header'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import UpdateCourseInfo from '../components/UpdateCourseInfo/UpdateCourseInfo'

export const ProtectedRoute = ({ children }) => {
  let location = useLocation()
  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }
  return children
}

export const ProtectedAdminRoute = ({ children }, role) => {
  let location = useLocation()
  if (!role === 'admin') {
    return <Navigate to='/courses' state={{ from: location }} replace />
  } 
  return children
}

const AppRoutes = ({role}) => {
  const courseUpdateStatus = useSelector((state) => state.courses.isUpdated)

  const [updateStatus, setUpdateStatus] = useState(courseUpdateStatus)

  useEffect(() => {
    setUpdateStatus(courseUpdateStatus)
  }, [courseUpdateStatus])

  console.log('OVER HERE >>>>> ' , updateStatus)

  return (
    <Router forceRefresh={true}>
      <Header />
      <Routes>
        <Route exact path='/' element={<Login />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Registration />}/>
        <Route exact path='/courses' element={
        <ProtectedRoute>
          <Courses />
        </ProtectedRoute>
        }/>
        <Route path='/courses/add' element={
          <ProtectedRoute>
            <ProtectedAdminRoute role={role}>
              <CreateCourse />
            </ProtectedAdminRoute>
          </ProtectedRoute>
        }/>
        <Route path='/courses/:id' element={
          <ProtectedRoute>
            {updateStatus ? <CourseInfo /> : <UpdateCourseInfo />}
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

export default AppRoutes