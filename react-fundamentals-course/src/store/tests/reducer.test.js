import rootReducer from '../rootReducer'
import coursesReducer from '../courses/reducer'

test('should return the initial state', () => {
  expect(coursesReducer(undefined, { type: undefined })).toEqual(
    {"courseDetail": [], "courseList": [], "createNewCourseStatus": false, "error": null, "isDeleted": false, "isUpdated": true, "loading": false}
  )
})

// const mockedState = {
//     user: {
//       isAuth: true,
//       name: 'Test Name',
//     },
//     courses: [],
//     authors: [],
//   };
  
//   const mockedStore = {
//       getState: () => mockedState,
//       subscribe: jest.fn(),
//       dispatch: jest.fn(),
//   };

// test('should return updated course state', () => {
//     expect(mockedStore(undefined, { type: undefined })).toEqual(
//       {"courses": [], "authors": []} 
//     )
//   })