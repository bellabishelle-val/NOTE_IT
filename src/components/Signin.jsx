
import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Signin = () => {

  // Define the two hooks for capturing/storing the user's input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Declare the three additional hooks
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // below we have the useNavigate hook to redirect us to another page on successful login
  const navigate = useNavigate()
  
  // below is function to handle the signin action
  const handleSubmit = async(e) =>{
    // prevent site from reloading
    e.preventDefault()

    // update the loading hook with a message
    setLoading("Please wait while we authenticate your account....")

    try{
      // Create a formdata objcet that will hold email and password
      const formdata = new FormData()

      // Insert/append the email and password on the formData created
      formdata.append("email", email);
      formdata.append("password", password);

      // interact with axios for the response
      const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/signin", formdata);

      // set the loading hook back to default
      setLoading("");

      // check whether user exists as part of ur response from the API
      if(response.data.user){
        // if user is there, definitely details entered during signin are correct
        // setSuccess("Login Successful")
        // if it is successful let a person get redirected to another page

        // Store user details in local storage
         localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/")
      }
      else{
        // user is not found, that means the credentials entered on form are incorrect
        setError("Login failed. Please try again...")
      }

    }
    catch(error){
      // set loading back to default
      setLoading("")

      // update the error hook with a message
      setError("OOOPPSSSSS! Something Went Wrong. Try Again...")

    }
  }


  return (
    <div className='row justify-content-center mt-4'>
        <div className='col-md-6 card shadow p-4'>
          <h1 className='text-warning'>Sign In</h1>

          <h5 className="text-info">{loading}</h5>
          <h3 className="text-success">{success}</h3>
          <h4 className="text-danger">{error}</h4>

          <form onSubmit={handleSubmit}>
            <input type="email"
            placeholder='Enter email address here...'
            className='form-control'
            required
            value={email}
            onChange = {(e) => setEmail(e.target.value)} /> <br />

            {/* {email} */}

            <input type="password"
            placeholder='Enter password here...'
            className='form-control'
            required
            value={password}
            onChange = {(e) => setPassword(e.target.value)} /> <br />

            <input type="submit"
            value= "Sign In"
            className='btn btn-outline-info' /> <br />
          </form> <br /> <br />

          Already have an account? <Link to={'/signup'}>Register</Link>

        </div>
    </div>
  )
}

export default Signin

// how can you store user details into local storage