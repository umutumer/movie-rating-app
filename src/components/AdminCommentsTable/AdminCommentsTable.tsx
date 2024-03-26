import { useEffect, useState } from 'react'
import './AdminCommentsTable.scss'
import { Comments, Movies } from '../../Types/Types';
import { FaTrash } from 'react-icons/fa';

const AdminCommentsTable = () => {
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
    useEffect(() => {
        getComments();
    }, [])

    return (
        <div className='admin-comments'>
            <h3>Yorumlar</h3>
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
                    {comments.map((comment) => (
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

export default AdminCommentsTable
