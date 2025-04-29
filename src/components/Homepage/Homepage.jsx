import React from 'react'
import Navbar from '../Navbar/Navbar'
import Banner from './Banner'
import Featured from './Featured'
import CuttingEdge from './CuttingEdge'

const Homepage = () => {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Featured></Featured>
      <CuttingEdge></CuttingEdge>
    </>
  )
}

export default Homepage
