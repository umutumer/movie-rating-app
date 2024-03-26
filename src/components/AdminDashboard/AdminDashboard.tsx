import React, { useEffect, useState } from 'react'
import { BiCommentDots } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa'
import './AdminDashboard.scss'
import { Comments, User } from '../../Types/Types'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const [usersLenght,SetUserLength] = useState<User[]>();
  const [comments, setComments] = useState<Comments[]>([]);


    const getComments = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/comment")
            const data: Comments[] = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Yorumlar gelirken bir hata oluştu: ", error);

        }
    }
  const getusers =  async () =>{
    try {
      const response = await fetch("http://localhost:8080/api/users")
      if (response.ok) {
        const data = await response.json();
        SetUserLength(data)
      }
    } catch (error) {
      console.error(error);

    }
  }
  
  useEffect(() =>{
    getusers();
    getComments();
  },[])
  return (
    <div className='dashboard'>
      <Link to={"/admin/users"} className='dashboard-box' id='blue-box'>
      <FaRegUser  />
        <p>Toplam Üye</p>
        <p>{usersLenght?.length}</p>
      </Link>
      <Link to={"/admin/comments"} className='dashboard-box' id='purple-box' >
      <BiCommentDots  />
      <p>Toplam Yorumlar</p>
      <p>{comments?.length}</p>
      </Link>
    </div>
  )
}

export default AdminDashboard
