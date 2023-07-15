import React from 'react'
import './Department.css'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMyAuthContext } from '../Context/AuthenticationContext'
function DepartmentCard({ val }) {
  const { isAdmin, change } = useMyAuthContext()
  const deleteDepartment = (id) => {
    axios.delete(`http://localhost:8060/departments/${id}`).then(() => {
      alert("deleted")
    }).then(() => {
      change()
    }).catch(() => {
      console.log("error in deleting ");
    })

  }
  return (
    // <div className='deptCard'>
    <table className="deptTable fade">
      <tr>
        <th>Department</th>
        <td>{val?.name}</td>
      </tr>
      <tr>
        <th>Description</th>
        <td>{val?.description}</td>
      </tr>
      {isAdmin && <tr>
        <th>Action</th>
        <td>
          <IconButton class="deleteButton" style={{ color: "red" }} onClick={() => deleteDepartment(val?.id)}><DeleteIcon /></IconButton>
          <Link style={{ textDecoration: "none" }} to={`/updateDepartment/${val?.id}`}><IconButton className="editButton" style={{ color: "orange" }}><EditIcon /></IconButton></Link>
        </td>
      </tr>}
    </table>

    /* <p>Department : {val?.name}</p>
   <p>Description : {val?.description}</p>
   <IconButton style={{color:"red"}} onClick={()=>deleteDepartment(val?.id)}><DeleteIcon/></IconButton>
   <Link style={{textDecoration:"none"}} to={`/updateDepartment/${val?.id}`}> <IconButton style={{color:"orange"}}><EditIcon/></IconButton></Link> */
    // </div>
  )
}

export default DepartmentCard
