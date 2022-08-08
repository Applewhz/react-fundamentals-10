import React from 'react'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import {Courses} from '../Courses.jsx'
import { CourseCard } from '../../CourseCard/CourseCard.jsx'
import { Provider } from 'react-redux'
import store from '../../../store/index'
import { mockedAuthorsList } from '../../../constants/MockedData'
import { BrowserRouter } from 'react-router-dom'
import { displayDurationInHoursAndMinutes } from '../../../helpers/getCourseDuration'
import { formatDate } from '../../../helpers/formatCreationDate'

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
    mockedAuthorsList.forEach(author => {
      if(author.id === authorCode){
        return authorName = author.name;
      } 
    })
    return authorName; 
}

const displayCourses = () => {
    return mockedCourseList.map((data) => 
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

const getCourses = (mockStore) => {
    // console.log('here ',mockedCourseList[0].id, mockedCourseList[0].title, mockedCourseList[0].description, 
    // mockedCourseList[0].creationDate, displayDurationInHoursAndMinutes(mockedCourseList[0].duration), getAuthorName(mockedCourseList[0].authors))
  return (
    <BrowserRouter>
      <Provider store={mockStore}>
        <Courses displayCourses={displayCourses()}/>
      </Provider>
    </BrowserRouter>
  )
}
describe('Course', () => {
  it('renders Course card info', async () => {
    dispatch(coursesAction.getCourseList())
    const { getByText, getAllByText, getByRole, debug} = render(
        getCourses(mockInitialStore)
    )
    await waitFor(() => {
      getByText(mockedCourseList[0].title)
    })
    // getByText(mockedCourseList[0].description)
    // getByText(displayDurationInHoursAndMinutes(mockedCourseList[0].duration))
    // getByText(formatDate(mockedCourseList[0].creationDate))
    // getByText(getAuthorName(mockedCourseList[0].authors))
    // expect(getAuthorName(mockedCourseList[0].authors)).toHaveLength(2)
    // debug()
  })
})