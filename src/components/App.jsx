// import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from '../redux/contactsSlice';
import { addFilter } from '../redux/filterSlice';
import { getContacts, getFilter } from '../redux/selectors';
import css from './App.module.css';

import Title from './Title';
import Form from './Form';
import Filter from './Filter';
import ContactList from './ContactList';

export function App() {
  const { contacts } = useSelector(getContacts);
  const { filter } = useSelector(getFilter);

  const dispatch = useDispatch();

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
      dispatch(addContact(contactItem));
    }
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const changeFilter = e => {
    dispatch(addFilter(e.currentTarget.value));
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
