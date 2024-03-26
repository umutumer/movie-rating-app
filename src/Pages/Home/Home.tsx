import { useEffect, useState } from 'react';
import Movie from '../../components/Movie/Movie';
import SideBar from '../../components/SideBar/SideBar';
import './Home.scss';
import { Categories, Comments, Movies } from '../../Types/Types';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [categories, setCategories] = useState<Categories[] >([]);
  const [searchTerm,setSearchTerm] = useState<string>("");
  const [selectedCategory,setSelectedCategory] = useState("All Movies");
  const [comments,setComments] = useState<Comments[]>([]);
  
  const calculateAverageRating = (movieId: number) => {
    const movieComments = comments.filter(comment => comment.movieId === movieId);

    if (movieComments.length === 0) {
      return 0;
    } 
    const totalRating = movieComments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRating / movieComments.length;
    
    return Math.round(averageRating * 100) / 100;
  };
  
  const getMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/movies")
      if (response.ok) {
        const data: Movies[]= await response.json();
        setMovies(data)
      }
    } catch (error) {
      console.error("Filmler gelirken bir hata oluştu:", error);

    }
  }
  const getCategories = async () => {
    const response = await fetch("http://localhost:8080/api/categories")
    if (response.ok) {
      const data : Categories[]  = await response.json()
      setCategories(data)
    }
  }
  
  const getComments = async () =>{
    try{
      const response = await fetch("http://localhost:8080/api/comment")
      const data : Comments[] = await response.json();
      setComments(data)
    }catch(error){
      console.error("Yorumlar getirilirken bir hata oluştu: ",error);
      
    }
  }
  const handleChangeCategory = (categoryName:string) => {
    setSelectedCategory(categoryName);
}
let filteredMovieList;
  
if (selectedCategory !== "All Movies") {
  filteredMovieList =  movies.filter((movie) =>movie.category.name === selectedCategory);
}else if (searchTerm !== "") {
  filteredMovieList =  movies.filter((movie) => movie.name.toLowerCase().includes(searchTerm.toLowerCase()));
}else{
  filteredMovieList = movies;
}


  useEffect(() => {
    getMovies();
    getCategories();
    getComments();
  }, []);
  return (
    <div className='home'>
      <Navbar setSearchTerm={setSearchTerm} />
      <div className='home-content'>
        <SideBar categories={categories} selectedCategory={selectedCategory}  handleChangeCategory={handleChangeCategory} />
        <Movie filteredMovieList={filteredMovieList} calculateAverageRating={calculateAverageRating} />
      </div>
    </div>
  )
}

export default Home
