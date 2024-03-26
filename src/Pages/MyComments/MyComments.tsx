import { useEffect, useState } from 'react';
import { Comments } from '../../Types/Types';
import './MyComments.scss'
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const MyComments = () => {
    const userIdToken = localStorage.getItem('userId') 
    const loggedInUser = userIdToken && parseFloat(userIdToken)
    console.log(loggedInUser);
    const[comments,setComments] = useState<Comments[]>([]);

    const filteredComments : Comments[] = comments.filter((comment) => comment.userId === loggedInUser)

    const getComments = async () =>{
        try{
            const response = await fetch("http://localhost:8080/api/comment")
            const data : Comments [] = await response.json();
            setComments(data);
        }catch(error){
            console.error("Yorumlar gelirken bir hata oluştu: ",error);
        }
    }
    const deleteCommentById = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/comment/${id}`, {
                method: "DELETE",
            })
            const data = response.json();
        } catch (error) {
            console.error("Yorum silinirken bir hata oluştu: ", error);

        } finally {
            getComments();
        }
    }
    useEffect(()=>{
        getComments();
    },[])
  return (
    <div className='my-comments'>
      <h3 className='comments-title'>Yorumlarım</h3>
      <Link to={"/"} className="back-to-home-btn">Anasayfaya Geri Dön</Link>
            <table className="table">
                <thead>
                    <tr className='text-blue-600'>
                        <th>Kullanıcı Adı</th>
                        <th>Film Id</th>
                        <th>Yorum</th>
                        <th>Yorum Tarihi</th>
                        <th>Aksiyon</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredComments.map((comment) => (
                        <tr key={comment.id}>
                            <td>{comment.userName}</td>
                            <td>{comment.movieId}</td>
                            <td>{comment.comment}</td>
                            <td>{comment.time}</td>
                            <td><button onClick={() => deleteCommentById(comment.id)}><FaTrash /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default MyComments
