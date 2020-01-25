import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = ({ title }) => (<h2>{title}</h2>)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Part = ({ name, value }) => (<>{name} {value}</>)

const Statistics = (tila) => {
  return (
    <div>
      <Title title='statistics' />
      <Part name='good' value={tila.good} /><br />
      <Part name='neutral' value={tila.neutral} /><br />
      <Part name='bad' value={tila.bad} /><br />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good +1)
  const increaseNeutral = () => setNeutral(neutral +1)
  const increaseBad = () => setBad(bad +1)
  

  return (
    <React.Fragment>
      <Title title='Give feedback' />
      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral'/>
      <Button handleClick={increaseBad} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
