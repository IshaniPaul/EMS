import React from 'react'
import './Employee.css'
import { useMyAuthContext } from '../Context/AuthenticationContext'
import EmployeeCard from './EmployeeCard'
import { Link } from 'react-router-dom'
function Employee() {
  const { employees, isAdmin } = useMyAuthContext()

  return (
    <>
      {isAdmin && <Link to={"/addEmployee"} style={{ textDecoration: "none" }}> <button className='btn fadeCard'>Add New Employee</button></Link>}
      <div className='empcontainer fade'>

        {employees && employees.map && employees.map((val, key) => {
          return <div key={key}>
            <EmployeeCard val={val} />
          </div>
        })}
      </div>
    </>
  )
}

export default Employee
