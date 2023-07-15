import React, { useState } from 'react'
import './Leaves.css'
import { useMyAuthContext } from '../Context/AuthenticationContext'
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import './Projects.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
function Projects() {
  const { projects, isAdmin, change } = useMyAuthContext()
  const [updateid, setUpdateId] = useState()
  const [updateForm, setUpdateForm] = useState(false)
  const [projectName, setProjectName] = useState("")
  const deleteProject = (id) => {
    axios.delete(`http://localhost:8060/projects/${id}`).then(() => {
      alert("deleted")
    }).then(() => {
      change()
    }).catch((err) => {
      console.log(err.message)
    })
  }
  const updateProject = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:8060/projects/${updateid}`, { name: projectName }).then(() => {
      setUpdateForm(false)
    }).then(() => {
      change()
    }).then(() => {
      alert("updated successfully")
    }).catch((err) => {
      console.log(err.message)
    })
  }
  return (

    <>{isAdmin && <Link style={{ textDecoration: "none" }} to={"/addProject"}>  <button className='btn fadeCard'>Add Project</button></Link>}
      <div className='projectContainer fade'>
        {!updateForm && projects && projects.map && projects.map((val, key) => {
        
          return <table key={val?.id} className="deptTable">
            <tbody>
              <tr>
                <th>Project Name</th>
                <td>{val?.name}</td>
              </tr>
              {isAdmin && <tr>
                <th>Action</th>
                <td>
                  <IconButton style={{ color: "red" }} onClick={() => deleteProject(val?.id)}><DeleteIcon /></IconButton>
                  <IconButton onClick={() => { setUpdateForm(true); setUpdateId(val?.id) }} className="editButton" style={{ color: "orange" }}><EditIcon /></IconButton>
                </td>
              </tr>}
            </tbody>

          </table>
        })}

        {isAdmin && updateForm && <form className='updateForm' onSubmit={updateProject}>

          <input placeholder='Enter Project Name' className='name' value={projectName} onChange={e => setProjectName(e.target.value)} required type='text' />
          <button className='updateButton' type='submit'>update</button>
        </form>}

      </div>
    </>
  )
}

export default Projects
