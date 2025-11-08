import { useState } from "react";

const Header = (props) => {
  console.log("Header: ", props);

  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  console.log("Part: ", props);

  return (
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  console.log("Content: ", props);
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
      {/* {props.parts} */}
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.nrExercises}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const nrExercises =
    course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />


      {/* <Content
        parts={[
          <Part key="p1" part={parts[0].name} exercises={parts[0].exercises} />,
          <Part key="p2" part={parts[1].name} exercises={parts[1].exercises} />,
          <Part key="p3" part={parts[2].name} exercises={parts[2].exercises} />
        ]}
      /> */}

      <Total nrExercises={nrExercises} />
    </div>
  );
};

export default App;
