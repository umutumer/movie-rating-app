import React, { useEffect, useState } from 'react'
import './Navbar.scss';
import { IoMdArrowDropup } from "react-icons/io";
import Logo from "../../assets/pinsoft-film-cehennemi-logo.png"
import { User } from '../../Types/Types';
import { Link } from 'react-router-dom';

interface SearchProps {
    setSearchTerm: (term: string) => void;
}



const Navbar: React.FC<SearchProps> = ({ setSearchTerm }) => {
    const [modalVisibility, setModalVisibility] = useState(false);
    const handleOpenModal = () => {
        setModalVisibility(!modalVisibility)
    }
    const [userId, setUserId] = useState<number>();
    const [loggedInUser, setLoggedInUser] = useState<User | undefined>();
    console.log(userId);
    



    const getUserById = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`)
            if (response.ok) {
                const data : User = await response.json();
                setLoggedInUser(data)
            }
        } catch (error) {
            console.error(error);

        }
    }
    const logout = () =>{
        localStorage.setItem('userId',"")
        localStorage.setItem('userToken',"")
        setLoggedInUser(undefined);
        setModalVisibility(false)
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
    return (
        <div className='navbar' >
            <img src={Logo} alt='navbar-logo' className='navbar-logo' />
            <input type="text" placeholder='Search any movies' className='navbar-search' onChange={(e) => setSearchTerm(e.target.value)} />
            <div className='user-container'>
                {loggedInUser && loggedInUser.base64image ? (
                    <button onClick={() => handleOpenModal()}>
                        <img src={loggedInUser.base64image} alt={loggedInUser.username} className='user-logo' />
                    </button>
                ) : (
                    <button onClick={() => handleOpenModal()}>
                        <p style={{ marginRight: "20px" }}>{loggedInUser?.username}</p>
                    </button>
                )}
                {!loggedInUser &&(
                    <Link to={"/login"} style={{ marginRight: "20px" }}>Giriş Yap</Link>
                )}
                {modalVisibility && (
                    <div className={`navbar-user-modal ${modalVisibility ? 'show' : ''}`}>
                        <Link to={'/personal-information'}>Hesabım</Link> <br />
                        <Link to={'/my-comments'}>Yorumlarım</Link> <br />
                        {loggedInUser?.role.name === "admin" &&(
                            <Link to={'/admin'}>Admin</Link>
                        )}
                        <button onClick={logout}>Çıkış Yap</button>
                        <IoMdArrowDropup className='modal-arrow' />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
