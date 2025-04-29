import React from 'react'
import cuttingEdgeImg from '../../images/cuttingEdge.png'
import Image from 'next/image'

const CuttingEdge = () => {
  return (
    <div>
      <div className='my-20 w-[1200px] mx-auto px-12 bg-gradient-to-r from-[#111111] to-[#E5E5E5] rounded-lg flex justify-between items-center'>
        <div className='text-div flex-1'>
          <h1 className='text-[30px] font-bold text-white'>
            Experience Cutting Edge Sound
          </h1>
          <p className='text-[20px] font-semibold mt-6 text-white'>
            Discover immersive audio like never before — with earbuds, speakers,
            and headphones built for true sound clarity.
          </p>
        </div>
        <div className='flex-1 flex justify-center'>
          <Image
            src={cuttingEdgeImg}
            className='w-[300px]'
            alt='cutting edge image'
          ></Image>
        </div>
      </div>
    </div>
  )
}

export default CuttingEdge
