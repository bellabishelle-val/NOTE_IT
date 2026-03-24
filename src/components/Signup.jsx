import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from './Button';


const Signup = () => {
  // initialize hooks for form input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // define the three states an application will move to
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // below is a function that will handle the submit action
  const handleSubmit = async(e) =>{
    // prevent our site from reloading on form submit
    e.preventDefault();

    // update loading hook with message that will be displayed while registration is in progress
    setLoading("Please wait as registration is in Progress....");

    try{
      // create a form data object to capture the four details entered on the form
      const formdata = new FormData();

      // insert the four details in terms of key-value pairs
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);

      // by use of axios, we can access the method post
      const response = await axios.post("https://varli.alwaysdata.net/api/signup", formdata);

      // set back loading hook to default
      setLoading("");

      // if everything goes well, update the success hook with a message
      setSuccess(response.data.message);

      // clear our input hooks
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      // remove success message after 5 seconds
      setTimeout(()=> setSuccess(""), 5000);

    } catch(error){
      // set loading hook back to default
      setLoading("");

      // update the error hook with message given back from response
      setError(error.message);
    }
  }

  return (
    <div className='row justify-content-center align-items-center' style={{ minHeight: '90vh', backgroundColor: '#e9ecef' }}>
      <div className='col-md-8 card shadow-lg p-5 rounded-4' style={{ backgroundColor: '#f0f7ff', minHeight: '75vh' }}>

        {/* Page title */}
        <h1 className='mb-5 text-center' style={{ fontSize: '4rem', fontFamily: "'Merriweather', serif", fontWeight: '900', color: 'darkcyan', letterSpacing: '2px' }}>
          SIGN UP
        </h1>

        {/* Status messages */}
        <div className='text-center mb-4'>
          <h5 className='text-warning' style={{ fontSize: '1.3rem' }}>{loading}</h5>
          <h3 className='text-success' style={{ fontSize: '1.3rem' }}>{success}</h3>
          <h4 className='text-danger' style={{ fontSize: '1.3rem' }}>{error}</h4>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
          {/* Username input */}
          <input
            type="text"
            placeholder='Enter your username...'
            className='form-control mb-3 p-3'
            style={{ fontSize: '1.4rem', borderRadius: '15px', border: '1px solid #264361', fontFamily: "'Roboto', sans-serif", color: '#682727' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Email input */}
          <input
            type="email"
            placeholder='Enter your email...'
            className='form-control mb-3 p-3'
            style={{ fontSize: '1.4rem', borderRadius: '15px', border: '1px solid #264361', fontFamily: "'Roboto', sans-serif", color: '#333' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password input */}
          <input
            type="password"
            placeholder='Enter your password...'
            className='form-control mb-3 p-3'
            style={{ fontSize: '1.4rem', borderRadius: '15px', border: '1px solid #264361', fontFamily: "'Roboto', sans-serif", color: '#aa2a2a' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Phone input */}
          <input
            type="phone"
            placeholder='Enter your phone number...'
            className='form-control mb-5 p-3'
            style={{ fontSize: '1.4rem', borderRadius: '15px', border: '1px solid #264361', fontFamily: "'Roboto', sans-serif", color: '#333' }}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            pattern="\d{10}"
            title="Phone number must be exactly 10 digits"
            required
          />

          {/* Signup Button using reusable Button component */}
          <div className="mb-4" style={{ width: '33%', textAlign: 'center' }}>
            <Button text="SIGN UP" type="submit" />
          </div>
        </form>
        <br /> <br />

        {/* Redirect to signin */}
        <div className='text-center mt-3'>
          <span style={{ fontSize: '30px', fontFamily: "'Roboto', sans-serif" }}>~Already have an account?</span>
          <br /> <br />
          <div className="d-inline-block ml-2">
            <Link to={'/signin'} style={{ textDecoration: 'none' }}>
              <Button text="Sign In" variant='secondary' />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Signup;