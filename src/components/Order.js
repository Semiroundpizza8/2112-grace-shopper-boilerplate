import React from 'react'
import { createOrders } from '../axios-services/orders';
import { useState } from 'react';

const Order = (props) => {
    const { loggedIn, setLoggedIn } = props;
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipcode,setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        event.target.reset();
        const order = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            street: street,
            city: city,
            zipcode: zipcode,
            phone:phone
        }
        console.log(order)
        await createOrders(order);
        setFirstName('');
        setLastName('');
        setEmail('');
        setStreet('');
        setCity('');
        setZipCode('');
        setCountry('');
        setPhone('');
        setLoggedIn(!!localStorage.getItem("token"))
    };

    const updateFirstName = (event) => {
        setFirstName(event.target.value)
    }
    const updateLastName = (event) => {
        setLastName(event.target.value)
    }
   
    const updateEmail =(event) => {
        setEmail(event.target.value)
    }
    const updateStreet =(event) => {
        setStreet(event.target.value)
    }
    const updateZipcode = (event) => {
        setZipCode(event.target.value)
    }
    const updateCity =(event) => {
        setCity(event.target.value)
    }
    const updateCountry = (event) => {
        setCountry(event.target.value);
    }
    const updatePhone =(event) => {
        setPhone(event.target.value)
    }
  return (
    <div>
        <div className='Register'>
            <form onSubmit={ handleSubmit}>
                <input className='textBoxRegister' type = 'text' placeholder = "FirstName" value = {firstName} onChange = {updateFirstName} />
                <input className='textBoxRegister' type = 'text' placeholder = "LastName" value = {lastName} onChange = {updateLastName} />
                <input className='textBoxRegister' type = 'text' placeholder = "Email" value = {email} onChange = {updateEmail} />
                <input className='textBoxRegister' type = 'text' placeholder = "Street" value = {street} onChange = {updateStreet} />
                <input className='textBoxRegister' type = 'text' placeholder = "City" value = {city} onChange = {updateCity} />
                <input className='textBoxRegister' type = 'text' placeholder = "Zipcode" value = {zipcode} onChange = {updateZipcode} />
                <input className='textBoxRegister' type = 'text' placeholder = "Country" value = {country} onChange = {updateCountry} />
                <input className='textBoxRegister' type = 'text' placeholder = "Phone" value = {phone} onChange = {updatePhone} />
                <button className='Btn_Register'> Submit </button>
                
            </form>
        </div>
    </div>
  )
}

export default Order