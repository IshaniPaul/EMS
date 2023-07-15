import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMyAuthContext } from '../Context/AuthenticationContext'
function AddDepartment() {
  const navigate = useNavigate()
  const { change } = useMyAuthContext()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const post = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8060/departments", { name, description }).then(() => {
      alert("posted successfully")
    }).then(() => {
      change()
    }).then(() => {
      navigate("/department")
    }).catch(() => {
      console.log("error while adding department");
    })
  }
  return (
    <div className='addDeptContainer fade'>
      <form onSubmit={post} className='addFormContainer'>
        <h1>Add New Department</h1>
        <input value={name} onChange={e => setName(e.target.value)} type='text' placeholder='enter the name' required />
        <input value={description} onChange={e => setDescription(e.target.value)} type='text' placeholder='enter the description' required />
        <button className='postbtn'>Post</button>
      </form>
    </div>
  )
}

export default AddDepartment
