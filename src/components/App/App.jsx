import {useState, useEffect} from "react";
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import ContactFilter from '../ContactFilter/ContactFilter';
import { setLocalStorage, getLocalStorage } from '../../helpers/localStorageAPI';
import './App.css'

const LOCAL_STORAGE_KEY = 'data';

function App () {
  const [contacts, setContacts] = useState(() => getLocalStorage(LOCAL_STORAGE_KEY) ?? []);
  const [filter, setFilter] = useState(''); 
  
  useEffect(() => {
    setLocalStorage(LOCAL_STORAGE_KEY, contacts);
  }, [contacts]);
  
  const formSubmitHandler = data => {
    const isDuplicateName = duplicateNameCheck(data.name);
    
     if (isDuplicateName) { 
      return alert(`${data.name} is already in contacts!`)
    };
    
    setContacts(c => ([data, ...c]));
  };

  const onContactFilter = e => {
    const value = e.target.value;
    
    setFilter(value);
  };
  
  const getFilteredContacts = () =>
  (contacts.filter(({ name }) => (name.toLowerCase().includes(filter.toLowerCase())))
  );
  
  
  const onClickBtnDeliteContact = contactId => (
    setContacts(c => (c.filter(({id}) => id !== contactId)))    
  );
  
  const duplicateNameCheck = name => { 
    const normalizedAddedName = name.toLowerCase().trim();
    
    return contacts.find(({ name }) => (
      name.toLowerCase() === normalizedAddedName
    ))
  };  
  
    const filteredContacts = getFilteredContacts();
    
    return (
      <div className="Contacts-container">
        <h1 className="Title Hero-title">Phonebook</h1>
        <ContactForm submitHandler={formSubmitHandler} />
        
        <h2 className="Title Contact-title">Contacts:</h2>
      
        <ContactFilter value={filter} onContactFilter={ onContactFilter} />
        
        {filteredContacts.length !== 0 ?
          <ContactList
            contacts={filteredContacts}
            onClickDelite={onClickBtnDeliteContact} /> :
          <h2 className="Title Nothing-title">&#9785; you don`t have contacts!</h2>
        }
      </div>
    ); 
};

export default App;
