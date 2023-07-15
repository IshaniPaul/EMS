import React, { useEffect, useState } from 'react'
import './Home.css'
import { useMyAuthContext } from '../Context/AuthenticationContext'
import Card from './Card'



function Home() {
  const { allUsers, departmentCount, employeeCount, projectCount, leavesCount } = useMyAuthContext()

  const [adminCount, setAdminCount] = useState(0)

  useEffect(() => {
    const NumberOfAdmims = allUsers.filter((val) => val?.role === "admin")
    setAdminCount(NumberOfAdmims?.length)
  }, [allUsers])


  console.log(employeeCount);
  return (
    <>
      <div className='HomeContainer fade'>

        <div className="dashboard">
          <div>
            <div className="line">
              <p>Work Units</p>
              <div></div>
            </div>
            <div className="cardConatiner">
              <Card Count={employeeCount} Role={"Employees"} />
              <Card Count={adminCount} Role={"Admin"} />
              <Card Count={departmentCount} Role={"Departments"} />
              <Card Count={projectCount} Role={"Projects"} />
              <Card Count={leavesCount} Role={"Leaves"} />
             

            </div>
          </div>

         
        </div>

      

      </div>
    
    </>
  )
}

export default Home
