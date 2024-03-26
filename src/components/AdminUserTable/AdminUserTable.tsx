import { useEffect, useState } from 'react'
import './AdminUserTable.scss'
import { User } from '../../Types/Types';
import { FaEdit } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

const AdminUserTable = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<string>();
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  console.log(status);

  const [selectedId, setSelectedId] = useState<number>();

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users")
      const data: User[] = await response.json();
      setUsers(data)
    } catch (error) {
      console.error("Kullanıcılar gelirken bir hata oluştu:", error);

    }
  }
  const changeUserStatus = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/status/${selectedId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "PUT",
        body: JSON.stringify({action:status})
      });
      const data = await response.text();
      console.log(data);
  
    } catch (error) {
      console.error("Statü güncellenirken bir hata oluştu:", error);
    }finally{
      setModalVisibility(false)
      getUsers();
    }
  }
  const handleChangeModalVisibility = (id: number) => {
    setSelectedId(id);
    setModalVisibility(!modalVisibility)
  }
  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div>
      {modalVisibility && (
        <div className='user-modal'>
          <div className='modal-container'>
            <h4 style={{marginBottom:"20px"}}>Statüyü Değiştir</h4>
            <select name="" id="" style={{backgroundColor:"#19181f",width:"100px",padding:"3px 5px",borderRadius:"5px"}} onChange={(e) => setStatus(e.target.value)} >
              <option value="activate">Aktif</option>
              <option value="deactivate">Pasif</option>
            </select>
            <button onClick={() => setModalVisibility(false)} style={{position:"absolute",top:"5px",right:"5px",fontSize:"x-large"}} className='text-red-600'><MdCancel /></button>
            <button className='bg-green-600  py-1 px-5 absolute bottom-3 rounded-md' onClick={changeUserStatus}>Onayla</button>
          </div>
        </div>
      )}
      <table className="table">
        <thead>
          <tr className='text-blue-600'>
            <th>Kullanıcı Adı</th>
            <th>E-Posta</th>
            <th>Rol</th>
            <th>Statü</th>
            <th>Aksiyon</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role.name}</td>
              <td>{user.account_active ? "Aktif" : "Pasif"}</td>
              <td><button onClick={() => handleChangeModalVisibility(user.id)}><FaEdit /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminUserTable
