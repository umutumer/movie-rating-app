import { useEffect, useState } from "react";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar"
import AdminUserTable from "../../components/AdminUserTable/AdminUserTable"
import "./AdminUsers.scss"
import { User } from "../../Types/Types";

const AdminUsers = () => {
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
        <div>
            <AdminSideBar />
            <div className="admin-users-content">
                <h3>Kullanıcılar</h3>
                <AdminUserTable />
            </div>
        </div>
    )
  }else {
    return (
      <div className='authority'>
        <p className='authority-text'>404 Not Found Error !</p>
      </div>
    )
  }
}

export default AdminUsers
