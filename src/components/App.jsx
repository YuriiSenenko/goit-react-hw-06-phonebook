import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import css from './App.module.css';

import Title from './Title';
import Form from './Form';
import Filter from './Filter';
import ContactList from './ContactList';

// import { addContact, deleteContact } from '../redux/contacts/slice';

// ініціалізую значення стора, якщо в локал є контакти
const initialState = JSON.parse(localStorage.getItem('contacts'));

export function App() {
  const [contacts, setContacts] = useState(initialState ?? []);
  const [filter, setFilter] = useState('');

  // const contacts = useSelector(state => state.contacts);
  // console.log(contacts);
  // const dispatch = useDispatch();
  // console.log(cont);

  //! Життєві цикли

  // Перевіряє чи змінився state і записує в localStorage
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Передає пропс в компонент форми
  const formSubmitHandler = (name, number, id) => {
    const normalizedName = name.toLowerCase();
    const contactItem = {
      id,
      name: name,
      number: number,
    };
    const filteredContacts = contacts.filter(
      searchContact => searchContact.name.toLowerCase() === normalizedName
    );

    if (filteredContacts.length > 0) {
      alert(`${name} is already in contacts`);
    } else {
      // тут треба задіспачити-----------------------------------------------
      // dispatch(addContact(contactItem));
      setContacts([contactItem, ...contacts]);
    }
  };

  const onDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLowerCase();

    const search = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return search;
  };

  const renderContacts = contacts => {
    return contacts.map(contact => (
      <li className={css.contact} key={contact.id}>
        {contact.name}: {contact.number}
        <button
          className={css.deleteBtn}
          onClick={() => onDeleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    ));
  };

  const visibleContacts = getVisibleContact();

  return (
    <div>
      <Title>Phonebook</Title>
      <Form onSubmit={formSubmitHandler} />

      <h2> Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        renderContacts={renderContacts}
        visibleContacts={visibleContacts}
      />
    </div>
  );
}
