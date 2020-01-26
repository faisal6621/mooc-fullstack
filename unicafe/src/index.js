import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const getTotal = () => good + neutral + bad
    const getAverage = () => (good - bad) / getTotal()
    const getPositive = () => (good / getTotal()) * 100

    if (getTotal() === 0) {
        return (
            <div>
                <h2>statistics</h2>
                <p>No feedback given</p>
            </div>
        )
    } else {
        return (
            <div>
                <h2>statistics</h2>
                <p>good {good}</p>
                <p>neutral {neutral}</p>
                <p>bad {bad}</p>
                <p>all {getTotal()}</p>
                <p>average {getAverage()}</p>
                <p>positive {getPositive()} %</p>
            </div>
        )
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const addGood = () => setGood(good + 1)
    const addNeutral = () => setNeutral(neutral + 1)
    const addBad = () => setBad(bad + 1)

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={addGood} text="good" />
            <Button onClick={addNeutral} text="neutral" />
            <Button onClick={addBad} text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
