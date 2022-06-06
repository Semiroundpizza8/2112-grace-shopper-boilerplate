import React from 'react'
import { createOrders } from '../axios-services/orders';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteCart, getMyCartProductbyUserId } from '../axios-services/cart';
const Order = (props) => {
    const { loggedIn, setLoggedIn } = props;
    const [state,setState] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipcode,setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const history = useHistory();
    const userId = localStorage.getItem("userId");
    const handleSubmit = async (event) => {
        event.preventDefault();
        const order = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            street: street,
            city: city,
            state:state,
            zipcode: zipcode,
            country:country,
            phone:phone
        }
        console.log(order)
        const newOrder = await createOrders(order);
        if(newOrder) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setStreet('');
        setCity('');
        setZipCode('');
        setCountry('');
        setPhone('');
        setState('');
        setLoggedIn(!!localStorage.getItem("token"))
        history.push('/checkout');
        //removing localstorage
        if(userId) {
            const myCartList = await getMyCartProductbyUserId(userId);
            (myCartList.map((item) => {
                deleteCart(item.id);
            }));
        }else {
            const removeActiveCart = localStorage.removeItem("ActiveCart");
            const removeActiveCartWProducts = localStorage.removeItem("ActiveCartWProducts")
        }
        
        }
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
    const updateState = (event) => {
        setState(event.target.value)
    }
    const updateCountry = (event) => {
        setCountry(event.target.value)
    }
    const updatePhone =(event) => {
        setPhone(event.target.value)
    }
  return (
    <div>
        <div className='Register'>
            <form>
                <input className='textBoxRegister' type = 'text' placeholder = "FirstName" value = {firstName} onChange = {updateFirstName} />
                <input className='textBoxRegister' type = 'text' placeholder = "LastName" value = {lastName} onChange = {updateLastName} />
                <input className='textBoxRegister' type = 'text' placeholder = "Email" value = {email} onChange = {updateEmail} />
                <input className='textBoxRegister' type = 'text' placeholder = "Street" value = {street} onChange = {updateStreet} />
                <input className='textBoxRegister' type = 'text' placeholder = "City" value = {city} onChange = {updateCity} />
                <input className='textBoxRegister' type = 'text' placeholder = "State" value = {state} onChange = {updateState} />
                <input className='textBoxRegister' type = 'text' placeholder = "Zipcode" value = {zipcode} onChange = {updateZipcode} />
                <input className='textBoxRegister' type = 'text' placeholder = "Country" value = {country} onChange = {updateCountry} />
                <input className='textBoxRegister' type = 'text' placeholder = "Phone" value = {phone} onChange = {updatePhone} />

                <button className='Btn_Register' onClick={(event) => { handleSubmit(event) }}>Checkout</button>
                
            </form>
        </div>
    </div>
  )
}

export default Order