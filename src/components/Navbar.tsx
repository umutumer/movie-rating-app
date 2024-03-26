import React, { useState } from 'react'
import './Navbar.scss';
import { IoMdArrowDropup } from "react-icons/io";
import Logo from  "../assets/pinsoft-film-cehennemi-logo.png"
const Navbar = () => {
    const [modalVisibility,setModalVisibility] = useState(null);
    const handleOpenModal = () =>{
        setModalVisibility(!modalVisibility)
    }
    return (
        <div className='navbar' >
            <img src={Logo} alt='navbar-logo' className='navbar-logo'/>
            <input type="text" placeholder='Search any movies' className='navbar-search' />
            <div className='user-container'>
            <button onClick={() => handleOpenModal()}>
            <img src="https://cdn.pixabay.com/photo/2021/06/04/10/29/man-6309459_1280.jpg" alt="user-logo" className='user-logo' />
            </button>
            {modalVisibility &&(
                <div className={`user-modal ${modalVisibility ? 'show' : ''}`}>
                    <p>Hesabım</p>
                    <p>Yorumlarım</p>
                    <IoMdArrowDropup className='modal-arrow' />
                </div>
            )}
            </div>
        </div>
    )
}

export default Navbar
