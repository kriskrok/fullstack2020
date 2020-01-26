import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = ({ title }) => (<h2>{title}</h2>)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (<>{text} {value}</>)

const Statistics = ({ answers }) => {
  let amount = Object.values(answers).reduce((prev, curr) => prev + curr)
  if (amount <= 0) {
    return (
      <div>
        <Title title='statistics' />
        No feedback given
        </div>
    )
  }
  let positive = answers.good / amount * 100
  let average = (-1 * answers.bad + answers.good) / amount
  
  return (
    <div>
      <Title title='statistics' />
      <StatisticLine text='good' value={answers.good} /><br />
      <StatisticLine text='neutral' value={answers.neutral} /><br />
      <StatisticLine text='bad' value={answers.bad} /><br />
      <StatisticLine text='all' value={amount} /><br />
      <StatisticLine text='average' value={Number.isNaN(average) ? 0 : average} /><br />
      <StatisticLine text='positive' value={Number.isNaN(positive) ? 0 : positive } /> &#37;<br />
    </div>
  )
}

const App = () => {
  const [answers, updateAnswers] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const increaseGood = () => (updateAnswers({ ...answers, good: answers.good +1}))
  const increaseNeutral = () => (updateAnswers({ ...answers, neutral: answers.neutral +1}))
  const increaseBad = () => (updateAnswers({ ...answers, bad: answers.bad +1}))
  
  return (
    <React.Fragment>
      <Title title='Give feedback' />
      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral'/>
      <Button handleClick={increaseBad} text='bad'/>
      <Statistics answers={answers} />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
