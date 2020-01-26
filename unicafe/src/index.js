import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Buttons = ({ goodClick, neutralClick, badClick }) => {
    return (
        <div>
            <Button onClick={goodClick} text="good" />
            <Button onClick={neutralClick} text="neutral" />
            <Button onClick={badClick} text="bad" />
        </div>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
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
                <table className="statistics">
                    <tbody>
                        <Statistic text="good" value={good} />
                        <Statistic text="neutral" value={neutral} />
                        <Statistic text="bad" value={bad} />
                        <Statistic text="all" value={getTotal()} />
                        <Statistic text="average" value={getAverage()} />
                        <Statistic text="positive" value={getPositive()} />
                    </tbody>
                </table>
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
            <Buttons goodClick={addGood} neutralClick={addNeutral} badClick={addBad} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
