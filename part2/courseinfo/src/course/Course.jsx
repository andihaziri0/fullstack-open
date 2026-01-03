const Header = (props) => {
  console.log("Header: ", props);

  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  console.log("Part: ", props);

  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  console.log("Content: ", parts);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.nrExercises}</p>;
};

const Course = ({ course }) => {
  const nrExercises = course.parts
    .map((part) => part.exercises)
    .reduce((a, b) => a + b, 0);

  return (
    <>
      <Header course={course.name} />

      <Content parts={course.parts} />

      <Total nrExercises={nrExercises} />
    </>
  );
};


export default Course;