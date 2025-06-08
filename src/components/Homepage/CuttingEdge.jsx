'use client'
import React from 'react'
import cuttingEdgeImg from '../../images/cuttingEdge.png'
import Image from 'next/image'

const CuttingEdge = () => {
  return (
    <div className='my-20 w-full flex justify-center'>
      <style jsx>{`
        @keyframes customBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .custom-bounce {
          animation: customBounce 2s infinite ease-in-out;
        }
      `}</style>

      <div className='w-[1200px] px-12 bg-gradient-to-r from-[#111111] to-[#E5E5E5] rounded-lg flex justify-between items-center'>
        <div className='flex-1'>
          <h1 className='text-[30px] font-bold text-white'>
            Experience Cutting Edge Sound
          </h1>
          <p className='text-[20px] font-semibold mt-6 text-white'>
            Discover immersive audio like never before — with earbuds, speakers,
            and headphones built for true sound clarity.
          </p>
        </div>

        <div className='flex-1 flex justify-center'>
          <div className='custom-bounce'>
            <Image
              src={cuttingEdgeImg}
              width={300}
              height={300}
              alt='cutting edge image'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CuttingEdge
