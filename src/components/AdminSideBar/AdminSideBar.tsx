import React from 'react'
import Logo from "../../assets/pinsoft-film-cehennemi-logo.png"
import { Link } from 'react-router-dom'
import { CiHome } from "react-icons/ci";
import { PiFilmSlate } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import { BiCommentDots } from "react-icons/bi";
import './AdminSideBar.scss'
const AdminSideBar = () => {
  return (
    <div className='admin-sidebar'>
      <img src={Logo} alt="logo" />
      <div className='admin-sidebar-content'>
        <Link to={'/admin'} className='admin-sidebar-link' >
        <CiHome  /> <p>Panel</p>
        </Link>
        <Link to={'/admin/movies'}  className='admin-sidebar-link' >
        <PiFilmSlate  /> <p>Filmler</p>
        </Link>
        <Link to={'/admin/users'}   className='admin-sidebar-link'>
        <FaRegUser  /> <p>Kullanıcılar</p>
        </Link>
        <Link to={'/admin/categories'}  className='admin-sidebar-link' >
        <TbCategoryPlus  /> <p>Kategoriler</p>
        </Link>
        <Link to={'/admin/comments'}  className='admin-sidebar-link' >
        <BiCommentDots  /> <p>Yorumlar</p>
        </Link>
      </div>
    </div>
  )
}

export default AdminSideBar
