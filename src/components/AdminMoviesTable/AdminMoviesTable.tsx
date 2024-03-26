import React, { useEffect, useState } from 'react'
import { Categories, Movies } from '../../Types/Types';
import { FaEdit } from 'react-icons/fa';
import './AdminMoviesTable.scss'
import { MdCancel } from 'react-icons/md';
const AdminMoviesTable = () => {

    const [movies, setMovies] = useState<Movies[]>([]);
    const [categories, setCategories] = useState<Categories[]>()
    const [movieUpdateModal, setMovieUpdateModal] = useState<boolean>(false);
    const [newMovieModal, setNewMovieModal] = useState<boolean>(false);

    const [upMovieName,setUpMovieName] = useState<string>();
    const [upRelease_date,setUpRelease_date] = useState<number>();
    const[upMovieExplanation,setUpMovieExplanation] = useState<string>();
    const [upMovieLanguage,setUpMovieLanguage] = useState<string>();
    const[upMovieImg,setUpMovieImg] = useState<string>();
    const[upMovieCategoryId,setUpMovieCategoryId] = useState<number>();
    const [selectedMovieId,setSelectedMovieId] = useState<number>()
    console.log(upMovieName,upRelease_date,upMovieExplanation,upMovieCategoryId,selectedMovieId);

    const [movieName,setMovieName] = useState<string>();
    const [release_date,setRelease_date] = useState<number>();
    const[movieExplanation,setMovieExplanation] = useState<string>();
    const [movieLanguage,setMovieLanguage] = useState<string>();
    const[movieImg,setMovieImg] = useState<string>();
    const[movieCategoryId,setMovieCategoryId] = useState<number>();
    const token = localStorage.getItem('userToken');


    const addMovie = async () =>{
        const moviedData ={
            name:movieName,
            release_date:release_date,
            explanation:movieExplanation,
            language:movieLanguage,
            base64Image:movieImg,
            categoryId:movieCategoryId,
            token:token
        }
        try{
            const response = await fetch("http://localhost:8080/api/movies",{
                headers:{
                    'Content-Type': 'application/json',
                },
                method:"POST",
                body:JSON.stringify(moviedData)
            })
            console.log("film eklendi");
            
        }catch(error){
            console.error("Film eklenirken bir hata oluştu:",error);
            
        } finally{
            setNewMovieModal(false)
            getMovies();
        }
    }
    const updateMovie = async () =>{
        const movieData ={
            id:selectedMovieId,
            name:upMovieName,
            release_date:upRelease_date,
            explanation:upMovieExplanation,
            language:upMovieLanguage,
            base64Image:upMovieImg,
            categoryId:upMovieCategoryId,
            token:token
        }
        try{
            const response = await fetch(`http://localhost:8080/api/movies/${selectedMovieId}`,{
                headers:{
                    'Content-Type': 'application/json',
                },
                method:"PUT",
                body:JSON.stringify(movieData)
            })
            console.log("film güncellendi");
            
        }catch(error){
            console.error("Film eklenirken bir hata oluştu:",error);
            
        } finally{
            setMovieUpdateModal(false)
            getMovies();
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          const file = files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            const image = reader.result as string;
            setMovieImg(image);
            setUpMovieImg(image)
          };
          reader.readAsDataURL(file);
        }
      };
    const getMovies = async () => {
        const response = await fetch("http://localhost:8080/api/movies")
        const data: Movies[] = await response.json();
        setMovies(data)
    }
    const getCategories = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/categories")
            const data: Categories[] = await response.json();
            setCategories(data)
        } catch (error) {
            console.error("Kategoriler Gelirken bir hata oluştu: ", error);

        }
    }
    const changeNewMovieModalVisibility = () => {
        setNewMovieModal(!newMovieModal)
    }

    const handleOpenUpdateModal = (id:number,name:string,release_date:number,explanation:string,language:string,categoryId:number,base64Image:string) =>{
        setSelectedMovieId(id)
        setUpMovieName(name)
        setUpRelease_date(release_date)
        setUpMovieExplanation(explanation)
        setUpMovieLanguage(language)
        setUpMovieCategoryId(categoryId)
        setUpMovieImg(base64Image)
        setMovieUpdateModal(!movieUpdateModal)
    }
    useEffect(() => {
        getMovies();
        getCategories();
    }, [])
    return (
        <div>
            {movieUpdateModal &&(
                 <div className='movie-modal'>
                 <div className='modal-container'>
                     <p className='mb-5'>Yeni Film</p>
                     <div className='flex items-center justify-center  w-full h-12'>
                         <input type="text" placeholder='Film Adı' style={{ padding: "5px 10px", borderRadius: "4px", color: "#000" }} className='m-5 w-40 h-10' value={upMovieName} onChange={(e) =>setUpMovieName(e.target.value)} />
                         <input type="text" placeholder='Yayınlanma Tarihi' style={{ padding: "5px 10px", borderRadius: "4px", color: "#000" }} className='m-5 w-40 h-10' value={upRelease_date} onChange={(e) => setUpRelease_date(parseFloat(e.target.value))} />
                     </div>
                     <textarea name="" id="" placeholder='film açıklaması' className='m-5 w-[22.5rem] h-20 rounded text-black' value={upMovieExplanation} onChange={(e) =>setUpMovieExplanation(e.target.value) } ></textarea>
                     <div className='flex items-center justify-center  w-full h-12'>
                     <select name="" id="" className='m-5 text-black w-40 h-10 rounded' value={upMovieLanguage} onChange={(e) => setUpMovieLanguage(e.target.value)}>
                             <option value="Yabancı">Yabancı</option>
                             <option value="Yerli">Yerli</option>
                         </select>
                         <select name="" id="" className='m-5 text-black w-40 h-10 rounded' value={upMovieCategoryId} onChange={(e) => setUpMovieCategoryId(parseFloat(e.target.value))}>
                             {categories?.map((category) => (
                                 <option key={category.id} value={category.id}>{category.name}</option>
                             ))}
                         </select>
                     </div>
                     <input type="file" className="file-input file-input-bordered file-input-sm w-[22.5rem] h-10 text-black m-5 rounded" onChange={(e) => handleFileChange(e)} />
                     <button className='bg-green-600  py-1 px-5 absolute bottom-3 rounded-md' onClick={updateMovie} >Onayla</button>
                     <button style={{ position: "absolute", top: "5px", right: "5px", fontSize: "x-large" }} className='text-red-600' onClick={() => setMovieUpdateModal(false)}><MdCancel /></button>
                 </div>
             </div>
            )}
            {newMovieModal && (
                <div className='movie-modal'>
                    <div className='modal-container'>
                        <p className='mb-5'>Yeni Film</p>
                        <div className='flex items-center justify-center  w-full h-12'>
                            <input type="text" placeholder='Film Adı' style={{ padding: "5px 10px", borderRadius: "4px", color: "#000" }} className='m-5 w-40 h-10' onChange={(e) =>setMovieName(e.target.value)} />
                            <input type="text" placeholder='Yayınlanma Tarihi' style={{ padding: "5px 10px", borderRadius: "4px", color: "#000" }} className='m-5 w-40 h-10' onChange={(e) => setRelease_date(parseFloat(e.target.value))} />
                        </div>
                        <textarea name="" id="" placeholder='film açıklaması' className='m-5 w-[22.5rem] h-20 rounded text-black' onChange={(e) =>setMovieExplanation(e.target.value) } ></textarea>
                        <div className='flex items-center justify-center  w-full h-12'>
                        <select name="" id="" className='m-5 text-black w-40 h-10 rounded' onChange={(e) => setMovieLanguage(e.target.value)}>
                                <option value="Yabancı">Yabancı</option>
                                <option value="Yerli">Yerli</option>
                            </select>
                            <select name="" id="" className='m-5 text-black w-40 h-10 rounded' onChange={(e) => setMovieCategoryId(parseFloat(e.target.value))}>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <input type="file" className="file-input file-input-bordered file-input-sm w-[22.5rem] h-10 text-black m-5 rounded" onChange={(e) => handleFileChange(e)} />
                        <button className='bg-green-600  py-1 px-5 absolute bottom-3 rounded-md' onClick={addMovie} >Onayla</button>
                        <button style={{ position: "absolute", top: "5px", right: "5px", fontSize: "x-large" }} className='text-red-600' onClick={() => setNewMovieModal(false)}><MdCancel /></button>
                    </div>
                </div>
            )}
            <h3 style={{ marginBottom: "20px", textAlign: "center", padding: "40px 0", fontSize: "40px" }}>Filmler</h3>
            <button className='admin-movie-btn' onClick={changeNewMovieModalVisibility} >Yeni Film +</button>
            <table className="table mt-16">
                <thead>
                    <tr className='text-blue-600'>
                        <th>Film Adı</th>
                        <th>Film Resim</th>
                        <th>Yayınlanma Tarihi</th>
                        <th>Açıklama</th>
                        <th>Dil</th>
                        <th>Kategori Adı</th>
                        <th>Aksiyon</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.name}</td>
                            <td><img src={movie.base64Image} alt={movie.name} className='w-32' /></td>
                            <td>{movie.release_date}</td>
                            <td>{movie.explanation}</td>
                            <td>{movie.language}</td>
                            <td>{movie.category.name}</td>
                            <td><button onClick={() => handleOpenUpdateModal(movie.id,movie.name,movie.release_date,movie.explanation,movie.language,movie.category.id,movie.base64Image)} ><FaEdit /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminMoviesTable
