
import { Link } from 'react-router-dom'
import { Movies } from '../../Types/Types'
import './Movie.scss'
import {FaStar} from 'react-icons/fa'

interface MoviesProps{
  filteredMovieList: Movies[]
  calculateAverageRating : (movieId: number) => number
}

const Movie :React.FC<MoviesProps> = ({filteredMovieList,calculateAverageRating}) => {
  
  return (
    <div className="movie-container">
      {filteredMovieList && filteredMovieList.map((movie:Movies) =>(
        <div className='movie-card' key={movie.id}>
          <Link to={`/movie-detail/${movie.id}`}><img src={movie.base64Image} alt={movie.name} /></Link>
          <p className='md:text-lg text-sm'>{movie.name}</p>
          <p className='flex items-center'><FaStar className="star"/>{calculateAverageRating(movie.id)}</p>
        </div>
      ))}
    </div>
  )
}

export default Movie
