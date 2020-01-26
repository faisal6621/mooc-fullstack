import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const addGood = () => setGood(good + 1)
    const addNeutral = () => setNeutral(neutral + 1)
    const addBad = () => setBad(bad + 1)

    return (
        <div>
            <h1>give feedback</h1>
            <div>
                <Button onClick={addGood} text="good" />
                <Button onClick={addNeutral} text="neutral" />
                <Button onClick={addBad} text="bad" />
            </div>
            <h2>statistics</h2>
            <div>
                <p>good {good}</p>
                <p>neutral {neutral}</p>
                <p>bad {bad}</p>
            </div>

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
