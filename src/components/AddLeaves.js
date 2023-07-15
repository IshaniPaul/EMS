import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyAuthContext } from '../Context/AuthenticationContext'

function AddLeaves() {


  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [reason, setReason] = useState("")
  const [status, setStatus] = useState("")
  const navigate = useNavigate()
  const { change } = useMyAuthContext()

  const AddLeave = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:8060/leaves`, { startDate, endDate, reason, status }).then(() => {
      alert("posted Successfully")
    }).then(() => {
      change()
    }).then(() => {
      navigate("/leaves")
    }).catch((err) => {
      alert("something went wrong", err.message)
    })
  }
  return (
    <div className='fade'>
      <div className='AddContainer'>
        <form className='formContainer' onSubmit={AddLeave}>
          <h1>Add Leaves</h1>
          <label htmlFor='startdate'>Start Date : </label>
          <input name='startdate' id='startdate' type='date' value={startDate} onChange={e => setStartDate(e.target.value)} placeholder='select start date' required />
          <label htmlFor='enddate'>End Date : </label>
          <input name='enddate' id='enddate' type='date' value={endDate} onChange={e => setEndDate(e.target.value)} placeholder='select end date' required />
          <input type='text' value={reason} onChange={e => setReason(e.target.value)} placeholder='Enter the Reason' required autoComplete='off' />
          <input value={status} onChange={e => setStatus(e.target.value)} placeholder='Enter the status' required autoComplete='off' />
          <button className='postbtn'>post</button>
        </form>
      </div>
    </div>
  )
}

export default AddLeaves
