import React from 'react'
import './Leaves.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMyAuthContext } from '../Context/AuthenticationContext'
function Leaves() {
  const { leaves, isAdmin, change } = useMyAuthContext()

  const deleteLeave = (id) => {

    axios.delete(`http://localhost:8060/leaves/${id}`).then(() => {
      alert("deleted Successfully")
    }).then(() => {
      change()
    }).catch((err) => {
      console.log(err.data);
    })
  }
  return (
    <>
      {isAdmin && <Link style={{ textDecoration: "none" }} to={"/addLeaves"}>  <button className='btn fadeCard'>Add Leave</button></Link>}
      <div className='leaveContainer fade'>
        {leaves && leaves.map && leaves.map((val, key) => {
          return <table className="deptTable">
            <tr>
              <th>Leave Id</th>
              <td>{val?.id}</td>
            </tr>
            <tr>
              <th>Leave startDate</th>
              <td>{val?.startDate?.slice?.(0, 10)}</td>
            </tr>
            <tr>
              <th>Leave EndDate</th>
              <td>{val?.endDate?.slice?.(0, 10)}</td>
            </tr>
            <tr>
              <th>Leave Reason</th>
              <td>{val?.reason}</td>
            </tr>
            <tr>
              <th>Leave Status</th>
              <td>{val?.status}</td>
            </tr>
            {isAdmin &&
              <tr>
                <th>Action</th>
                <td>
                  <IconButton style={{ color: "red" }} onClick={() => deleteLeave(val?.id)}><DeleteIcon /></IconButton>
                  <Link style={{ textDecoration: "none" }} to={`/updateLeave/${val?.id}`}> <IconButton className="editButton" style={{ color: "orange" }}><EditIcon /></IconButton></Link>
                </td>
              </tr>}
          </table>
        })}
      </div>
    </>
  )
}

export default Leaves
