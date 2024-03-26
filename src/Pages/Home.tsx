import React from 'react'
import Navbar from '../Components/Navbar'
import './Home.scss';
import Hero from '../Components/Hero';
const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home
