import React from 'react';

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

export default Course
