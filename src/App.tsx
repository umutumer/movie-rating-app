import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import PersonalInformation from './Pages/PersonalInformation/PersonalInformation';
import Admin from './Pages/Admin/Admin';
import AdminUsers from './Pages/AdminUsers/AdminUsers';
import AdminCategory from './Pages/AdminCategory/AdminCategory';
import AdminMovies from './Pages/AdminMovies/AdminMovies';
import AdminComments from './Pages/AdminComments/AdminComments';
import MyComments from './Pages/MyComments/MyComments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/movie-detail/:id' element={<MovieDetails />} />
        <Route path='/personal-information' element={<PersonalInformation />} />
        <Route path='/my-comments' element={<MyComments />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/admin/categories' element={<AdminCategory />} />
        <Route path='/admin/movies' element={<AdminMovies />} />
        <Route path='/admin/comments' element={<AdminComments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
