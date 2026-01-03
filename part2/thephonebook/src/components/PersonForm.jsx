const PersonForm = ({
  newName,
  newPhone,
  addPerson,
  handleNewName,
  handleNewPhone,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handleNewName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNewPhone} value={newPhone}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
