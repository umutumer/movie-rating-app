import React, { useState } from 'react'
import Logo from '../../assets/pinsoft-film-cehennemi-logo.png'
import { Link } from 'react-router-dom'
import { FaUser ,FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import './RegisterForm.scss'


const RegisterForm = () => {
    const [username,setUsername] = useState<string>();
    const [mail,setMail] = useState<string>();
    const [password,setPassword] = useState<string>();
    const [rePassword,setRepassword] = useState<string>();
    const [base64Image,setBase64Image] = useState<string>();
    console.log(base64Image);
    

    const registerUser = async(e: React.SyntheticEvent<EventTarget>) =>{
        e.preventDefault();
        if (!username || !mail || !password || !rePassword || !base64Image) {
            console.error('Lütfen tüm alanları doldurun.');
            return;
          }
        try{
            const formData = {
                username:username,
                email:mail,
                password:password,
                base64image:base64Image
            }
            if (password === rePassword) {
                const response = await fetch("http://localhost:8080/api/register",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify(formData)
            })
             if (response.ok) {
                const data = await response.json();
                window.location.href = 'http://localhost:3000/login'
                console.log(data);
                
             }
            } else{
                alert("Şifreler Aynı Değil")
            }
        }catch(error){
            console.error("Register hatası:" , error);
            
           }
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          const file = files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            const image = reader.result as string;
            setBase64Image(image);
          };
          reader.readAsDataURL(file);
        }
      };
  return (
    <div className='register-form-container'>
    <img src={Logo} alt="Pinsoft Logo" className='register-form-Logo' />
    <form className='register-form'>
        <div className='register-form-element'>
        <FaUser className='register-form-icon' />
            <input type="text" placeholder='Kullanıcı Adı' className='register-form-input' onChange={(e) =>setUsername(e.target.value)} />
        </div>
        <div className='register-form-element'>
        <IoIosMail  className='register-form-icon' />
            <input type="text" placeholder='E Mail' className='register-form-input'onChange={(e) =>setMail(e.target.value)} />
        </div>
        <div className='register-form-element'>
        <FaLock  className='register-form-icon' />
            <input type="password" placeholder='Şifre' className='register-form-input' onChange={(e) =>setPassword(e.target.value)} />
        </div>
        <div className='register-form-element'>
        <FaLock  className='register-form-icon' />
            <input type="password" placeholder='Şifre Tekrar' className='register-form-input' onChange={(e) =>setRepassword(e.target.value)} />
        </div>
        <input type="file" className="file-input  file-input-xs max-w-xs my-3 md:w-[300px] w-[250px] h-[50px] border-none" onChange={(e) => handleFileChange(e)}  />
        <button className='register-form-input' id='register-form-submit' onClick={registerUser} >Kayıt Ol</button>
    </form>
    <Link to={'/login'} style={{color:"gray",margin:"10px",textDecoration:"underline"}}>Giriş Yap</Link>
</div>
  )
}

export default RegisterForm
