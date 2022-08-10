import React from 'react'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import {Courses} from '../Courses.jsx'
import { CourseCard } from '../../CourseCard/CourseCard.jsx'
import { Provider } from 'react-redux'
import store from '../../../store/index'
import { mockedAuthorsList } from '../../../constants/MockedData'
import { BrowserRouter } from 'react-router-dom'
import { displayDurationInHoursAndMinutes } from '../../../helpers/getCourseDuration'
import axios from "axios";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

const BASE_URL = 'http://localhost:4000/'

const fetchCourses = async () => {
  try {
    return await axios.get(`${BASE_URL}/courses/all`);
  } catch (e) {
    return [];
  }
};

const mockedCourseList = [
  {
    id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
    title: 'Mock course title',
    description: 'Mock course description',
    creationDate: '08/03/2021',
    duration: 160,
    authors: [
      '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
      'f762978b-61eb-4096-812b-ebde22838167',
    ],
  },
]
const mockInitialStore = {
  ...store,
  user: {
    isAuth: true,
    name: 'tester',
    email: 'testemail@email.com',
    token: 'Mock token here',
    role: 'user',
  },
  courses: mockedCourseList,
  author: mockedAuthorsList,
}
afterEach(cleanup)

const getCourses = (mockStore) => {
  return (
    <Provider store={mockStore}>
        <Router>
            <Courses />
        </Router>
    </Provider>
  )
}

describe('Display Courses', () => {
  it('renders Header component', async () => {
    const mockCourseStore = ({
      ...store
    })
    mockCourseStore.getState().courses.courseList = mockedCourseList
    localStorage.setItem('token', 'mock token')
    const {getByTestId, debug, getByText} = render(getCourses(mockCourseStore))
    await waitFor(() => {
      expect(mockCourseStore.getState().courses.courseList).toHaveLength(1)
    })
    // debug()
    localStorage.clear()
  })
})

// jest.mock("axios");

// describe("fetchCourses", () => {
//   describe("when API call is successful", () => {
//     it("should return users list", async () => {
//       // given
//       const courses = mockedCourseList
//       axios.get.mockResolvedValueOnce(courses);

//       // when
//       const result = await fetchCourses();

//       // then
//       expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/courses/all`);
//       expect(result).toEqual(courses);
//     });
//   });
//   describe("when API call fails", () => {
//     it("should return empty course list", async () => {
//       // given
//       const message = "Network Error";
//       axios.get.mockRejectedValueOnce(new Error(message));

//       // when
//       const result = await fetchCourses();

//       // then
//       expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/courses/all`);
//       expect(result).toEqual([]);
//     });
//   });
// });