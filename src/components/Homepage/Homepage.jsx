import React from 'react'
import Navbar from '../Navbar/Navbar'
import Banner from './Banner'
import Featured from './Featured'
import CuttingEdge from './CuttingEdge'
import NewArrival from './NewArrival'
import WhyTechGear from '../WhyTechGear'

const Homepage = () => {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Featured></Featured>
      <CuttingEdge></CuttingEdge>
      <NewArrival></NewArrival>
      <WhyTechGear></WhyTechGear>
    </>
  )
}

export default Homepage
