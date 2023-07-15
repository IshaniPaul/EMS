import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useMyAuthContext } from '../Context/AuthenticationContext'
function UpdateDepartment() {
  const navigate = useNavigate()
  const { change } = useMyAuthContext()
  const { id } = useParams()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const update = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:8060/departments/${id}`, { name, description }).then(() => {
      alert("updated successfully")
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
      <form onSubmit={update} className='addFormContainer'>
        <h1>Update Department</h1>
        <input value={name} onChange={e => setName(e.target.value)} type='text' placeholder='enter the name' required />
        <input value={description} onChange={e => setDescription(e.target.value)} type='text' placeholder='enter the description' required />
        <button className='postbtn'>Update</button>
      </form>
    </div>
  )
}

export default UpdateDepartment
