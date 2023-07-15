import React, { useState } from 'react'
import axios from 'axios'
import './Employee.css'
import { useNavigate } from 'react-router-dom'
import { useMyAuthContext } from '../Context/AuthenticationContext'
function AddEmployee() {
  const [name, setName] = useState("")
  const [designation, setDesignation] = useState("")
  const [age, setAge] = useState()
  const [salary, setSalary] = useState()
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")
  const { change } = useMyAuthContext()
  const navigate = useNavigate()
  const post = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8060/employees/createEmployee", {
      name, designation, age, salary, email, department
    }).then(() => {
      alert("posted successfully")
    }).then(() => {
      change()
    }).then(() => {
      navigate("/employee")
    }).catch((err) => {
      console.log(err.message);
    })
  }

  return (
    <div className='AddContainer fade'>
      <form className='formContainer' onSubmit={post}>
        <h1>Add New Employee</h1>
        <input value={name} onChange={e => setName(e.target.value)} placeholder='Enter the name' required autoComplete='off' />
        <input value={designation} onChange={e => setDesignation(e.target.value)} placeholder='Enter the designation' required autoComplete='off' />
        <input type='number' min={0} value={age} onChange={e => setAge(e.target.value)} placeholder='Enter the age' required autoComplete='off' />
        <input type='number' min={0} value={salary} onChange={e => setSalary(e.target.value)} placeholder='Enter the salary' required autoComplete='off' />
        <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter the email' required autoComplete='off' />
        <input value={department} onChange={e => setDepartment(e.target.value)} placeholder='Enter the department' required autoComplete='off' />
        <button className='postbtn'>post</button>
      </form>
    </div>
  )
}

export default AddEmployee
