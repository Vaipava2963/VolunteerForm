import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './form.css';

interface Contact {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch('http://localhost:5000/volunteers');
      const data = await response.json();
      setContacts(data);
    };
    fetchContacts();
  }, []);

  const deleteContact = async (id: number) => {
    const response = await fetch(`http://localhost:5000/volunteers/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      alert('Contact deleted successfully!');
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  const editContact = async (id: number) => {
    setEditing(id);
  };

  const saveContact = async (contact: Contact) => {
    const response = await fetch(`http://localhost:5000/volunteers/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    });
    if (response.ok) {
      alert('Contact updated successfully!');
      setContacts(contacts.map(c => c.id === contact.id ? contact : c));
      setEditing(null);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (searchTerm === '') {
      return contact;
    }
    return contact.id.toString().includes(searchTerm);
  });

  return (
    <div>
    <center>
      <h2>Volunteer List</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search by ID"
        id='searchInput'
      />
      </center>
      <table id="contactTable" {...{ border: 1 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Skills</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map(contact => (
            <tr key={contact.id}>
              {editing === contact.id ? (
                <td colSpan={5}>
                  <form onSubmit={e => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const updatedContact: Contact = {
                      id: contact.id,
                      name: formData.get('name') as string,
                      email: formData.get('email') as string,
                      contactNumber: formData.get('contactNumber') as string,
                      address: formData.get('address') as string
                    };
                    saveContact(updatedContact);
                  }}>
                    <input type="text" name="name" defaultValue={contact.name} />
                    <input type="text" name="email" defaultValue={contact.email} />
                    <input type="text" name="contactNumber" defaultValue={contact.contactNumber} />
                    <input type="text" name="address" defaultValue={contact.address} />
                    <button type="submit">Save</button>
                  </form>
                </td>
              ) : (
                <>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.contactNumber}</td>
                  <td>{contact.address}</td>
                  <td>
                    <button onClick={() => deleteContact(contact.id)}>Delete</button>
                    <button onClick={() => editContact(contact.id)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;

