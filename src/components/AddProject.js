import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyAuthContext } from '../Context/AuthenticationContext'

function AddProject() {
  const [name, setName] = useState("")
  const { change } = useMyAuthContext()
  const navigate = useNavigate()
  const post = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8060/projects", { name }).then(() => {
      alert("posted successfully")
    }).then(() => {
      change()
    }).then(() => {
      navigate("/projects")
    }).catch(() => {
      alert("error while posting")
    })
  }
  return (
    <div className='fade'>
      <div className='AddContainer'>
        <form className='formContainer' onSubmit={post}>
          <h1>Add New Project</h1>
          <input value={name} onChange={e => setName(e.target.value)} placeholder='Enter the name' required autoComplete='off' />

          <button className='postbtn'>post</button>
        </form>
      </div>
    </div>
  )
}

export default AddProject
