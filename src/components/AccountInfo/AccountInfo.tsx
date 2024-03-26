
import { useEffect, useState } from 'react';
import './AccountInfo.scss'
import { User } from '../../Types/Types';
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";



const AccountInfo = () => {
    const [userId, setUserId] = useState<number>();
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);
    const [editImgModal, setEditImgModal] = useState<boolean>(false);
    console.log(userId);


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

    const changeModalVisibility = () => {
        setModalVisibility(!modalVisibility)
    }
    const handleEditImgModal = () =>{
        setEditImgModal(!editImgModal)
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
        <div className='account-info'>
            <div className='account-image'>
                <img src={loggedInUser?.base64image} alt="" />
                <button className='img-btn' onClick={() => handleEditImgModal()}><FaPlusCircle /></button>
            </div>
            <div>
                <p> <span style={{ color: "rgb(46, 88, 255)" }}> Kullanıcı Adı : </span>{loggedInUser?.username}</p>
                <p> <span style={{ color: "rgb(46, 88, 255)" }}>E-posta :</span> {loggedInUser?.email}</p>
                <p> <span style={{ color: "rgb(46, 88, 255)" }}>Hesap Yetkisi :</span> {loggedInUser?.role.name}</p>
            </div>
            <button className='edit-btn' onClick={() => changeModalVisibility()}><FaEdit /></button>
            {modalVisibility && (
                <form className='account-information-edit'>
                    <input type="text" value={loggedInUser?.username} />
                    <input type="text" value={loggedInUser?.email} />
                    <input type="text" value={loggedInUser?.password} />
                    <input type="submit" value={"Değişiklikleri Kaydet"} id="account-edit-btn" />
                    <button className='edit-btn' onClick={() => changeModalVisibility()}><MdCancel /></button>
                </form>
            )}
            {editImgModal && (
                <form className='account-information-edit'>
                <input type="file" />
                <input type="submit" value={"Resmi Kaydet"} id="account-edit-btn" />
                <button className='edit-btn' onClick={() => handleEditImgModal()}><MdCancel /></button>
            </form>
            )}
        </div>
    )
}

export default AccountInfo
