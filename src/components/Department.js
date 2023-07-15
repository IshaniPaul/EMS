import React from 'react'
import './Department.css'
import { useMyAuthContext } from '../Context/AuthenticationContext'
import DepartmentCard from './DepartmentCard'
import { Link } from 'react-router-dom'
function Department() {
  const { departments, isAdmin } = useMyAuthContext()

  return (
    <>
      {isAdmin && <Link style={{ textDecoration: "none" }} to={"/addDepartment"}>  <button className='btn fadeCard'>Add Department</button></Link>}
      <div style={{ marginTop: "2rem" }} className='deptContainer fade'>
        {departments && departments.map && departments.map((val, key) => {
          return <div key={key}>
            <DepartmentCard val={val} />
          </div>
        })}
      </div>
    </>
  )
}

export default Department
