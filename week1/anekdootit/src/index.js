import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = ({ title }) => (<h2>{title}</h2>)

const Button = ({ handleClick, text }) => (<button onClick={handleClick}>{text}</button>)

const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - min) + min))

const Anecdote = ({ text, votes }) => (<>{text}<br />has {votes} votes</>)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [score, setScore] = useState(new Array(anecdotes.length).fill(0))

  const handleClick = () => {
    setSelected(getRandomInt(0, anecdotes.length))
  }

  const highest = score.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

   const handleVoteClick= () => {
    const copy = Array.from(score);
    copy[selected] += 1
    setScore(copy)
  }
    
  return (
    <>
      <Title title='Anecdote of the day' />
      {anecdotes[selected]}<br />has {score[selected]} votes<br />

      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleClick} text='next anecdote' />

      <Title title='Anecdote with most votes' />
      <Anecdote text={anecdotes[score.indexOf(Math.max(...score))]} votes={score[highest]} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
