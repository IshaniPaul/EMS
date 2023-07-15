import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMyAuthContext } from '../Context/AuthenticationContext';
function EmployeeCard({ val }) {
  const { isAdmin, change } = useMyAuthContext()
  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:8060/employees/${id}`).then(() => {
      alert("deleted")
    }).then(() => {
      change()
    }).catch(() => {
      console.log("error in deleting ");
    })

  }

  return (

    <table className="deptTable fade">
      <tr>
        <th>Employee Name</th>
        <td>{val?.name}</td>
      </tr>
      <tr>
        <th>Employee Designation</th>
        <td>{val?.designation}</td>
      </tr>
      <tr>
        <th>Employee Age</th>
        <td>{val?.age}</td>
      </tr>
      <tr>
        <th>Employee Email</th>
        <td>{val?.email}</td>
      </tr>
      <tr>
        <th>Employee Department</th>
        <td>{val?.department}</td>
      </tr>

      {isAdmin && <tr>
        <th>Action</th>
        <td>
          <IconButton style={{ color: "red" }} onClick={() => deleteEmployee(val?.id)}><DeleteIcon /></IconButton>
          <Link style={{ textDecoration: "none" }} to={`/updateEmployee/${val?.id}`}> <IconButton className="editButton" style={{ color: "orange" }}><EditIcon /></IconButton></Link>
        </td>
      </tr>}
    </table>

  )
}

export default EmployeeCard
