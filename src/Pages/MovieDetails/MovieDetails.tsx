import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Comments, Movies, User } from "../../Types/Types";
import './MovieDetails.scss';
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const MovieDetails = () => {
    const { id } = useParams();
    console.log(id);
    const [movie, SetMovie] = useState<Movies>();
    const [comment, setComment] = useState<string>();
    console.log(comment);

    const [rating, setRating] = useState<number>();
    console.log(rating);

    console.log(movie);
    const userIdToken = localStorage.getItem('userId')
    const userId = userIdToken && parseFloat(userIdToken)
    console.log(userId);
    const currentDate: Date = new Date();
    const isoDateString: string = currentDate.toISOString();
    console.log(isoDateString);

    const [comments, setComments] = useState<Comments[]>([]);
    console.log(comments);


    const filteredComments = comments && comments.filter((comment: Comments) => comment.movieId === movie?.id)
    console.log(filteredComments, "filtered");



    const getComments = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/comment")
            const data: Comments[] = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Yorumlar gelirken bir hata oluştu: ", error);

        }
    }


    const getMoviesById = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/movies/${id}`)
            if (response.ok) {
                const data: Movies = await response.json();
                SetMovie(data)
            }
        } catch (error) {
            console.error("Filmler gelirken bir hata oluştu:", error);

        }
    }

    const addComment = async () => {
        const commentData = {
            userId: userId,
            movieId: id,
            comment: comment,
            rating: rating,
            time: isoDateString
        };

        try {
            const response = await fetch("http://localhost:8080/api/comment", {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(commentData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data", data);
            }
        } catch (error) {
            console.error("Yorum atılırken bir hata oluştu: ", error);
        } finally {
            getComments();
        }
    }

    useEffect(() => {
        getMoviesById();
        getComments();
    }, [])
    return (
        <div className="movie">
            <Link to={"/"} className="back-to-home-btn">Anasayfaya Geri Dön</Link>
            <div className="movie-details-container">
                {movie && (
                    <div className="movie-details">
                        <img src={movie.base64Image} alt={movie.name} />
                        <div className="movie-details-content">
                            <h2>{movie.name}</h2>
                            <p><span style={{ color: "rgb(46, 88, 255)" }}>Kategori:</span> {movie.category.name}</p>
                            <p><span style={{ color: "rgb(46, 88, 255)" }}>Yayın Tarihi:</span> {movie.release_date}</p>
                            <p><span style={{ color: "rgb(46, 88, 255)" }}>Film Açıklaması:</span> {movie.explanation}</p>
                        </div>

                    </div>
                )}
                <form className="movie-comments" onSubmit={addComment}>
                    <h3>Yorumlar</h3>
                    <div className="comment-form">
                        <h4 style={{ textAlign: "center" }}>Yorum Yap</h4>
                        <textarea className="comment-form-element" placeholder="Film hakkındaki düşünceleriniz..." onChange={(e) => setComment(e.target.value)} />
                        <select name="" id="" className="comment-form-element" onChange={(e) => setRating(parseFloat(e.target.value))}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <input type="submit" id="comment-btn" className="comment-form-element" value={"Yorum Yap"} />

                    </div>
                    {filteredComments.map((comment: Comments) => (
                        <div className="comments" key={comment.id}>
                            <p className="w-[200px] md:text-center"> <span className="text-blue-600">Yorum Sahibi: </span> {comment.userName}</p>

                            <div className="comment-content">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <p className="text-blue-600">Verdiği Puan: </p>  <FaStar className="comment-star" /><span>{comment.rating}</span>
                                </div>
                                <p> <span className="text-blue-600">Yorum: </span> {comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}

export default MovieDetails
