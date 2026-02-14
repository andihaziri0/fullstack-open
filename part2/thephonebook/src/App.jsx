import { useState } from "react";
import { useEffect } from "react";
import Person from "./components/Person";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import personService from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((response) => {
      console.log("promise fullfilled");
      setPersons(response);
    });
  }, []);
  console.log("render", persons, "notes");

  const deletePerson = (id) => {
    console.log(`deleting person with ${id}`);
    const toDeletePerson = persons.find((person) => person.id === id);
    if (!window.confirm(`Delete ${toDeletePerson.name} ?`)) {
      return;
    }
    personService.deletePerson(id).then((deletedPerson) => {
      setPersons(persons.filter((person) => person.id != deletedPerson.id));
    });
  };

  let personsToShow = [];

  if (persons) {
    personsToShow = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const addPerson = (event) => {
    event.preventDefault();

    const personFound = persons.find((person) => person.name == newName);

    const personObject = {
      name: newName,
      number: newPhone,
    };

    if (personFound) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(personFound.id, personObject)
          .then((response) => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === personFound.id ? response : person
              )
            );
            setNewName("");
            setNewPhone("");
            setSuccessMessage(`Updated ${newName}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
      return;
    }

    personService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewPhone("");
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) => {
    console.log(event.target.value);
    setNewPhone(event.target.value);
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>

      {(successMessage || errorMessage) && (
        <Notification
          message={successMessage ? successMessage : errorMessage}
          isSuccess={successMessage ? true : false}
        />
      )}

      <Search handleSearch={handleSearch} />

      <h2>add a new</h2>

      <PersonForm
        newName={newName}
        newPhone={newPhone}
        addPerson={addPerson}
        handleNewName={handleNewName}
        handleNewPhone={handleNewPhone}
      />

      <h2>Numbers</h2>
      {personsToShow &&
        personsToShow.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            phone={person.number}
            deletePerson={() => deletePerson(person.id)}
          />
        ))}
    </div>
  );
};

export default App;
