import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
    // initialize hooks
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
    // below we prevent our site from reloading
    e.preventDefault()

    // update our loading hook with a message that will be displayed to users who are trying to register
    setLoading("Please wait as registration is in Progress....")

    try{
      // create a form data object that enable u to capture th four details entered on the form
      const formdata = new FormData();

      // insert four details in terms of key value pairs
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);

      // by use of axios, we can access the method post
      const response = await axios.post("https://varli.alwaysdata.net/api/signup", formdata)

      // set back loading hook to default
      setLoading("");

      // just in case everything goes on well, update the success hook with a message
      setSuccess(response.data.message)

      // CLEAR UR HOOKS
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      setTimeout(()=> {
        setSuccess("");
      }, 5000);


    }
    catch(error){
      // set the loading hook back to deault
      setLoading("");

      // update the error hook with message given back from response
      setError(error.message)

    }
  }

  return (
    <div className='row justify-content-center mt-4'>
        <div  className='card col-md-6 shadow p-4'>
          <h1 className='text-success'>Sign up</h1>

          <h5 className='text-warning'>{loading}</h5>
          <h3 className='text-success'>{success}</h3>
          <h4 className='text-danger'>{error}</h4>

          <form onSubmit={handleSubmit}>
            <input type="text"
            placeholder='Enter the username'
            className='form-control'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required /> <br />

            {/* {username}  */}

            <input type="email"
            placeholder='Enter the email address'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required /> <br /> 

            {/* {email} */}

            <input type="password"
            placeholder='Enter the password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required /> <br /> 

            {/* {password} */}

            <input type="phone"
            placeholder="Enter phone number"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} // remove non-digits and limit to 10
            pattern="\d{10}" // exactly 10 digits
            title="Phone number must be exactly 10 digits"
            required /> <br /> <br />

            {/* {phone} */}

            <input type="submit"
            value="Signup"
            className='btn btn-outline-info' /> <br /> <br />

            Already have an account? <Link to={'/signin'}>Sign in</Link>


          </form>

        </div>
    </div>
  )
}

export default Signup