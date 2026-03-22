import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';


const Signin = () => {
  // Define the two hooks for capturing/storing the user's input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Declare the three additional hooks
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // below we have the useNavigate hook to redirect us to another page on successful login
  const navigate = useNavigate();

  // below is function to handle the signin action
  const handleSubmit = async(e) =>{
    // prevent site from reloading
    e.preventDefault();

    // update the loading hook with a message
    setLoading("Please wait while we authenticate your account....");

    try{
      // Create a formdata object that will hold email and password
      const formdata = new FormData();
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
        // Store user details in local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // if it is successful let a person get redirected to another page
        navigate("/");
      } else {
        // user is not found, that means the credentials entered on form are incorrect
        setError("Login failed. Please try again...");
      }

    } catch(error){
      // set loading back to default
      setLoading("");
      // update the error hook with a message
      setError("OOOPPSSSSS! Something Went Wrong. Try Again...");
    }
  }

  return (
    <div className="row justify-content-center align-items-center" style={{ minHeight: '90vh', backgroundColor: '#e9ecef' }}>
      <div className="col-md-8 card shadow-lg p-5 rounded-4" style={{ backgroundColor: '#f7f4f9', minHeight: '75vh' }}>

        {/* Page title */}
        <h1 className="text-center mb-5" style={{ fontSize: '4rem', fontFamily: "'Playfair Display', serif", fontWeight: 900, color: 'teal' }}>
          SIGN IN
        </h1>

        {/* Status messages */}
        <div className="text-center mb-4">
          <h5 className="text-warning" style={{ fontSize: '1.3rem' }}>{loading}</h5>
          <h3 className="text-success" style={{ fontSize: '1.3rem' }}>{success}</h3>
          <h4 className="text-danger" style={{ fontSize: '1.3rem' }}>{error}</h4>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
          {/* Email input */}
          <input type="email" placeholder="Enter your email..." className="form-control mb-4 p-3"
            style={{ fontSize: '1.4rem', borderRadius: '15px', border: '1px solid #20476e', fontFamily: "'Roboto', sans-serif'" }}
            required value={email} onChange={(e) => setEmail(e.target.value)} />

          {/* Password input */}
          <input type="password" placeholder="Enter your password..." className="form-control mb-5 p-3"
            style={{ fontSize: '1.4rem', borderRadius: '15px', border: '1px solid #20476e', fontFamily: "'Roboto', sans-serif'" }}
            required value={password} onChange={(e) => setPassword(e.target.value)} />

          {/* Signin Button using reusable Button component */}
          <div className="mb-4">
            <Button text="SIGN IN" type="submit" />
          </div>
        </form>
        <br />

        {/* Redirect to signup */}
        <div className="text-center mt-3">
          <span style={{ fontSize: '30px', fontFamily: "'Roboto', sans-serif'" }}>~Don't have an account?</span>
          <br /> <br />
          <div className="d-inline-block ml-2">
            <Link to={'/signup'} style={{ textDecoration: 'none' }}>
              <Button text="Sign Up" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Signin;