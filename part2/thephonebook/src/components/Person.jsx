const Person = ({ name, phone, deletePerson }) => (
  <li key={name}>
    {name} {phone}
    <button onClick={deletePerson}>delete</button>
  </li>
);

export default Person