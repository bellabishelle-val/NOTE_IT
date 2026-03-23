import React, { useState } from 'react'
import Loader from './Loader'
import axios from 'axios'
import Button from './Button'  // Import your reusable Button component

const Addproducts = () => {
  const [product_name, setProductName] = useState("")
  const [product_description, setProductDescription] = useState("")
  const [product_cost, setProductCost] = useState("")
  const [product_photo, setProductPhoto] = useState("")

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formdata = new FormData()
      formdata.append("product_name", product_name)
      formdata.append("product_description", product_description)
      formdata.append("product_cost", product_cost)
      formdata.append("product_photo", product_photo)

      const response = await axios.post("https://varli.alwaysdata.net/api/add_product", formdata)

      setLoading(false)
      setSuccess(response.data.message)

      setProductName("")
      setProductDescription("")
      setProductCost("")
      setProductPhoto("")

      setTimeout(() => setSuccess(""), 5000)

    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <div
      className='row justify-content-center align-items-center'
      style={{ minHeight: '90vh', backgroundColor: '#e9ecef' }}
    >
      <div
        className='col-md-8 card shadow-lg p-5 rounded-4'
        style={{ backgroundColor: '#f0f7ff', minHeight: '75vh' }}
      >

        {/* Page Title */}
        <h1
          className='mb-5 text-center'
          style={{
            fontSize: '3.5rem',
            fontFamily: "'Merriweather', serif",
            fontWeight: '900',
            color: 'darkcyan',
            letterSpacing: '2px'
          }}
        >
          ADD STATIONERY
        </h1>

        {/* Status Messages */}
        <div className='text-center mb-4'>
          {loading && <Loader />}
          <h3 className='text-success'>{success}</h3>
          <h4 className='text-danger'>{error}</h4>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>

          <input
            type="text"
            placeholder='Enter the stationery name...'
            className='form-control mb-3 p-3'
            style={{
              fontSize: '1.4rem',
              borderRadius: '15px',
              border: '1px solid #264361'
            }}
            required
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
          />

          <input
            type="text"
            placeholder='Enter the stationery description...'
            className='form-control mb-3 p-3'
            style={{
              fontSize: '1.4rem',
              borderRadius: '15px',
              border: '1px solid #264361'
            }}
            required
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder='Enter the price of stationery...'
            className='form-control mb-3 p-3'
            style={{
              fontSize: '1.4rem',
              borderRadius: '15px',
              border: '1px solid #264361'
            }}
            required
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
          />

          <label className='mb-2' style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Stationery Photo
          </label>

          <input
            type="file"
            className='form-control mb-4 p-2'
            style={{
              borderRadius: '10px',
              border: '1px solid #264361'
            }}
            required
            accept='image/*'
            onChange={(e) => setProductPhoto(e.target.files[0])}
          />

          {/* Submit Button */}
          <div className='mb-4' style={{ width: '50%', textAlign: 'center' }}>
            <Button text="ADD STATIONERY" type="submit" />
          </div>

        </form>
      </div>
    </div>
  )
}

export default Addproducts