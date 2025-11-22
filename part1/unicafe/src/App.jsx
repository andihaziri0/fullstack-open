import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticsLine = (props) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </>
  );
};

const Statistics = (props) => {
  const renderStats = () => {
    if (props.all === 0) {
      return <p>No feedback yet</p>;
    }
    return (
      <>
        <table>
          <StatisticsLine text={"good"} value={props.good} />
          <StatisticsLine text={"neutral"} value={props.neutral} />
          <StatisticsLine text={"bad"} value={props.bad} />
          <StatisticsLine text={"average"} value={props.average} />
          <StatisticsLine text={"positive"} value={props.positive} />
        </table>
      </>
    );
  };

  return <>{renderStats()}</>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);

  const handleNeutral = () => setNeutral(neutral + 1);

  const handleBad = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h1>give feedback</h1>

      <Button onClick={handleGood} text={"good"} />
      <Button onClick={handleNeutral} text={"neutral"} />
      <Button onClick={handleBad} text={"bad"} />

      <h1>Statistics</h1>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        positive={positive}
        all={all}
      />
    </>
  );
};

export default App;
