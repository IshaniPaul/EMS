
import './App.css';
import { useMyAuthContext } from './Context/AuthenticationContext';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import AddEmployee from './components/AddEmployee';
import Department from './components/Department';
import Employee from './components/Employee';
import Home from './components/Home';
import Leaves from './components/Leaves';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UpdateEmployee from './components/UpdateEmployee';
import AddDepartment from './components/AddDepartment';
import UpdateDepartment from './components/UpdateDepartment';
import UpdateLeave from './components/UpdateLeave';
import AddProject from './components/AddProject';
import AddLeaves from './components/AddLeaves';

function App() {
  const { isAdmin } = useMyAuthContext()
  return (

    <Router>

      <Routes>

        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <ProtectedRoutes>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index path='/' element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          
            <Route path="/employee" element={<Employee />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/department" element={<Department />} />
            <Route path='/addEmployee' element={isAdmin ? <AddEmployee /> : <h1 className='Norights'>you don't have admin rights</h1>} />
            <Route path='/updateEmployee/:id' element={isAdmin ? <UpdateEmployee /> : <h1 className='Norights'>you don't have admin rights</h1>} />
            <Route path="/addDepartment" element={isAdmin ? <AddDepartment /> : <h1 className='Norights'>you don't have admin rights</h1>} />
            <Route path='/updateDepartment/:id' element={isAdmin ? <UpdateDepartment /> : <h1 className='Norights'>you don't have admin rights</h1>} />
            <Route path='updateLeave/:id' element={isAdmin ? <UpdateLeave /> : <h1 className='Norights'>you don't have admin rights</h1>} />
            <Route path='/addProject' element={isAdmin ? <AddProject /> : <h1 className='Norights'>you don't have admin rights</h1>} />
            <Route path='/addLeaves' element={isAdmin ? <AddLeaves /> : <h1 className='Norights'>you don't have admin rights</h1>} />

          </Route>
        </Routes>
      </ProtectedRoutes>

    </Router>

  );
}

export default App;
