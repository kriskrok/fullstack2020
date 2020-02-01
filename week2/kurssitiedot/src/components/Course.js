import React from 'react'

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )}

const Header = ({ name }) => (<h2>{name}</h2>)

const Content = ({ parts }) => (
  <div>
    {parts.map(part => 
      <Part part={part} key={part.id} />
    )}
  </div>
)

const Part = ({ part }) => ( <p>{part.name} {part.exercises}</p> )

const Total = ({ parts }) => (
    <p>
      <strong>total of {total(parts)} exercises</strong>
    </p>
  )

const total = (parts) => (parts.reduce( (sum, part) => sum + part.exercises, 0))

export default Course
