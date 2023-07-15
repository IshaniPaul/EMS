import React, { useState } from 'react'
import axios from 'axios'
import './Employee.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useMyAuthContext } from '../Context/AuthenticationContext'
function UpdateEmployee() {

  const { id } = useParams()
  const [name, setName] = useState("")
  const [designation, setDesignation] = useState("")
  const [age, setAge] = useState()
  const navigate = useNavigate()
  const [salary, setSalary] = useState()
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")
  const { change } = useMyAuthContext()
  const UpdateEmployee = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:8060/employees/${id}`, { name, designation, age, salary, email, department }).then(() => {
      alert("updated")
    }).then(() => {
      change()
    }).then(() => {
      navigate("/employee")
    }).catch(() => {
      console.log("error while updating");
    })
  }


  return (
    <div className='AddContainer fade'>
      <form className='formContainer' onSubmit={UpdateEmployee}>
        <h1>Update Employee</h1>
        <input value={name} onChange={e => setName(e.target.value)} placeholder='Enter the name' required autoComplete='off' />
        <input value={designation} onChange={e => setDesignation(e.target.value)} placeholder='Enter the designation' required autoComplete='off' />
        <input type='number' min={0} value={age} onChange={e => setAge(e.target.value)} placeholder='Enter the age' required autoComplete='off' />
        <input type='number' min={0} value={salary} onChange={e => setSalary(e.target.value)} placeholder='Enter the salary' required autoComplete='off' />
        <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter the email' required autoComplete='off' />
        <input value={department} onChange={e => setDepartment(e.target.value)} placeholder='Enter the department' required autoComplete='off' />
        <button className='postbtn'>Update</button>
      </form>
    </div>
  )
}

export default UpdateEmployee
