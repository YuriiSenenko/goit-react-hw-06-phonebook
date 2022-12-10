import Title from './Title';
import Form from './Form';
import Filter from './Filter';
import ContactList from './ContactList';

export function App() {
  return (
    <div>
      <Title>Phonebook</Title>
      <Form />
      <h2> Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
}
