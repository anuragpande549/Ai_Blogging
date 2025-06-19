import React from 'react'
import Navbar from '../Navbar'
import Header from '../Header'
import BlogList from '../BlogList'
import NewsLatter from '../NewsLatter'
import Footer from '../Footer'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Header/>
      <BlogList/>
      <NewsLatter/>
      <Footer/>
    </>
  )
}

export default Home