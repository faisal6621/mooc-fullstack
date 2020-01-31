import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ course }) =>
    <h1>{course}</h1>

const Part = ({ part }) =>
    <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) =>
    parts.map(part => <Part key={part.id} part={part} />)

const Total = ({ parts }) => {
    const total = parts.map(part => part.exercises).reduce((a, b) => a + b, 0)
    return (<b>total of {total} exercises</b>)
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            { name: 'Fundamentals of React', exercises: 10, id: 1 },
            { name: 'Using props to pass data', exercises: 7, id: 2 },
            { name: 'State of a component', exercises: 14, id: 3 },
            { name: 'Redux', exercises: 11, id: 4 },
        ]
    }

    return (
        <Course course={course} />
    )
}
ReactDOM.render(<App />, document.getElementById('root'));
