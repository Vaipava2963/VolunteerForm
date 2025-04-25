import React, { useState } from 'react';

import './form.css';
interface Volunteer {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
}
 
const VolunteerForm: React.FC = () => {
  const [volunteer, setVolunteer] = useState<Volunteer>({
    id: 0,
    name: '',
    email: '',
    contactNumber: '',
    address: ''
  });
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVolunteer({ ...volunteer, [name]: value });
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/volunteers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(volunteer)
    });
    if (response.ok) {
      alert('Volunteer added successfully!');
    }
  };
 
  return (
    <center>
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label>Volunteer Id:</label></td>
            <td><input type="number" name="id" value={volunteer.id} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>Name:</label></td>
            <td><input type="text" name="name" value={volunteer.name} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>Assigned Project:</label></td>
            <td><input type="text" name="email" value={volunteer.email} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>Availability:</label></td>
            <td><input type="text" name="contactNumber" value={volunteer.contactNumber} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td><label>Skills:</label></td>
            <td><input type="text" name="address" value={volunteer.address} onChange={handleChange} required /></td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'center' }}>
              <button type="submit">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    </center>
  );
};
 
export default VolunteerForm;
