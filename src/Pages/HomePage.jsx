import React from 'react'
import { Hero, } from '../Components/Hero'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import DoctorList from '../Components/DoctorList'

function HomePage() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <DoctorList/>
    <Footer/>
    </>
  )
}

export default HomePage