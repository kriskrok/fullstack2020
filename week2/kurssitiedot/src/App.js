import React from 'react'
import Course from './components/Course'

const Courses = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      <div>
        {courses.map(course => ( <Course key={course.id} course={course} /> ))}
      </div>
    </>
  )
}

const App = ({ courses }) => {
  return (
    <React.Fragment>
      <Courses courses={courses} />
    </React.Fragment>
  )
}

export default App
