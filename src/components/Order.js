import React from 'react'

const Order = () => {
  return (
    <div>
        <div className='Register'>
            <form onSubmit={ handleSubmit }>
                <input className='textBoxRegister' type = 'text' placeholder = "First Name" value = {firstname} onChange = {updatefirstname} />
                <input className='textBoxRegister' type = 'text' placeholder = "Last Name" value = {lastname} onChange = {updatelastname} />
                <input className='textBoxRegister' type = 'text' placeholder = "Register Username" value = {email} onChange = {email} />
                <input className='textBoxRegister' type = 'text' placeholder = "Register Password" value = {street} onChange = {street} />
                <input className='textBoxRegister' type = 'text' placeholder = "Register Email" value = {city} onChange = {city} />
                <input className='textBoxRegister' type = 'text' placeholder = "Register Email" value = {zipcode} onChange = {zipcode} />
                <input className='textBoxRegister' type = 'text' placeholder = "Register Email" value = {country} onChange = {country} />
                <input className='textBoxRegister' type = 'text' placeholder = "Register Email" value = {phone} onChange = {phone} />
                <Link to="/Shop">
                    <button className='Btn_Register'> Submit Customer Details </button>
                </Link> 
            </form>
        </div>
    </div>
  )
}

export default Order