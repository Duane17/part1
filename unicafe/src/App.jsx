import { useState } from 'react'

const Header = ({ text }) => {
  return(
    <h1>{text}</h1>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}{text === 'positive' ? '%' : ''}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} />
      </tbody>
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedback = (type) => {
    if (type === 'good') {
      setGood(good + 1)
    } else if (type === 'neutral') {
      setNeutral(neutral + 1)
    }else if (type === 'bad') {
      setBad(bad + 1)
    }
  }

  const total = good + neutral + bad
  const average = total ? (good - bad) / total : 0
  const positive = total ? (good / total) * 100: 0

  return (
    <>
    <div>
        <Header text='give feedback' />
        <Button handleClick={() => handleFeedback('good')} text='good' />
        <Button handleClick={() => handleFeedback('neutral')} text='neutral' />
        <Button handleClick={() => handleFeedback('bad')} text='bad' />
      </div>
      <div>
        <Header text='statistics' />
        <Statistics 
           good={good} 
           neutral={neutral} 
           bad={bad} 
           total={total} 
           average={average} 
           positive={positive} 
         />      
      </div>
    </>
  )
}

export default App