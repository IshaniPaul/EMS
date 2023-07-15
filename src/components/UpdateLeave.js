import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMyAuthContext } from '../Context/AuthenticationContext'

function UpdateLeave() {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [reason, setReason] = useState("")
  const [status, setStatus] = useState("")
  const { change } = useMyAuthContext()
  const { id } = useParams()
  const UpdateLeaves = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:8060/leaves/${id}`, { startDate, endDate, reason, status }).then(() => {
      alert("updated Successfully")
    }).then(() => {
      change()
    }).then(() => {
      navigate("/leaves")
    }).catch((err) => {
      alert("something went wrong", err.message)
    })
  }
  return (
    <div>
      <div className='AddContainer fade'>
        <form className='formContainer' onSubmit={UpdateLeaves}>
          <h1>Update Leaves</h1>
          <label htmlFor='startdate'>Start Date : </label>
          <input name='startdate' id='startdate' type='date' value={startDate} onChange={e => setStartDate(e.target.value)} placeholder='select start date' required />
          <label htmlFor='enddate'>End Date : </label>
          <input name='enddate' id='enddate' type='date' value={endDate} onChange={e => setEndDate(e.target.value)} placeholder='select end date' required />
          <input type='text' value={reason} onChange={e => setReason(e.target.value)} placeholder='Enter the Reason' required autoComplete='off' />
          <input value={status} onChange={e => setStatus(e.target.value)} placeholder='Enter the status' required autoComplete='off' />
          <button className='postbtn'>Update</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateLeave
