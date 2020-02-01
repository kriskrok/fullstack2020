import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = ({ name }) => (<h1>{name}</h1>)

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part part={part} key={part.id} />
      )}
    </div>
  )
}

const Part = ({ part }) => {
  return (
  <p>
    {part.name} {part.exercises}
  </p>
)}

const Total = ({ parts }) => {
  return (
    <p>
      <strong>total of {total(parts)} exercises</strong>
    </p>
  )
}

const total = (parts) => (parts.reduce( (sum, part) => sum + part.exercises, 0))

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <React.Fragment>
      <Course course={course} />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
