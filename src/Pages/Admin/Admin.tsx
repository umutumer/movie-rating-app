
import { useEffect, useState } from 'react'
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard'

import './Admin.scss'
import { User } from '../../Types/Types'
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar'
const Admin = () => {
  const [userId, setUserId] = useState<number>();
  const [loggedInUser, setLoggedInUser] = useState<User>();
  

  const admin = loggedInUser?.role.name === "admin";

  const getUserById = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`)
      if (response.ok) {
        const data = await response.json();
        setLoggedInUser(data)
      }
    } catch (error) {
      console.error(error);

    }
  }
  
  useEffect(() => {
    const storedData = localStorage.getItem('userId');
    if (storedData && typeof storedData === 'string') {
      const parsedUserId = parseInt(storedData, 10);
      if (!isNaN(parsedUserId)) {
        setUserId(parsedUserId);
      }
    }
    getUserById();
  }, [userId]);
  if (admin) {
    return (
      <div className='admin'>
        <AdminSideBar />
        <div className='dashboard-content'>
          <AdminDashboard />
        </div>
      </div>
    )
  } else {
    return (
      <div className='authority'>
        <p className='authority-text'>404 Not Found Error !</p>
      </div>
    )
  }
}

export default Admin
