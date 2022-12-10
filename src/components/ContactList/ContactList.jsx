import React from 'react';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { getContacts, getFilter } from '../../redux/selectors';

const ContactList = () => {
  const { contacts } = useSelector(getContacts);
  const { filter } = useSelector(getFilter);

  const dispatch = useDispatch();

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
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
    <ul className={css.contactsList}>{renderContacts(visibleContacts)}</ul>
  );
};
export default ContactList;

ContactList.propTypes = {
  renderContacts: PropTypes.func,
  visibleContacts: PropTypes.array,
};
