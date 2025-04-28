import React from 'react'
import laptop from '../../images/laptop.png'
import camera from '../../images/camera.png'
import bluetoothSpeaker from '../../images/bluetooth_speaker.png'
import earbuds from '../../images/earbuds.png'
import gaming from '../../images/gaming.png'
import headphone from '../../images/headphone.png'
import smartwatch from '../../images/smartwatch.png'
import smartphone from '../../images/smartphone.png'
import portableSpeaker from '../../images/portable_speaker.png'
import Image from 'next/image'

const Featured = () => {
  return (
    <div>
      <div className='my-20 w-[1200px] mx-auto'>
        <h1 className='text-[#111111] text-[26px] font-bold'>
          Featured Categories
        </h1>

        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
          {/* SMARTPHONES  */}
          <div className='bg-[#E5E5E5] shadow-lg rounded-lg p-6 group cursor-pointer hover:shadow-2xl transition duration-300'>
            <Image
              className='group-hover:scale-110 transition duration-300'
              src={smartphone}
              width={700}
              alt='Camera Image'
            />
            <h3 className='text-[#111111] text-[22px] text-center font-bold group-hover:scale-120 transition duration-300'>
              Smartphones
            </h3>
          </div>

          {/* LAPTOPS  */}
          <div className='bg-[#E5E5E5] shadow-lg rounded-lg p-6 group cursor-pointer hover:shadow-2xl transition duration-300'>
            <Image
              className='group-hover:scale-110 transition duration-300'
              src={laptop}
              width={700}
              alt='Camera Image'
            />
            <h3 className='text-[#111111] text-[22px] text-center font-bold group-hover:scale-120 transition duration-300'>
              Laptops
            </h3>
          </div>

          {/* HEADPHONES  */}
          <div className='bg-[#E5E5E5] shadow-lg rounded-lg p-6 group cursor-pointer hover:shadow-2xl transition duration-300'>
            <Image
              className='group-hover:scale-110 transition duration-300'
              src={headphone}
              width={700}
              alt='Camera Image'
            />
            <h3 className='text-[#111111] text-[22px] text-center font-bold group-hover:scale-120 transition duration-300'>
              Headphones
            </h3>
          </div>

          {/* CAMERA  */}
          <div className='bg-[#E5E5E5] shadow-lg rounded-lg p-6 group cursor-pointer hover:shadow-2xl transition duration-300'>
            <Image
              className='group-hover:scale-110 transition duration-300'
              src={camera}
              width={700}
              alt='Camera Image'
            />
            <h3 className='text-[#111111] text-[22px] text-center font-bold group-hover:scale-120 transition duration-300'>
              Camera
            </h3>
          </div>

          {/* EARBUDS  */}
          <div className='bg-[#E5E5E5] shadow-lg rounded-lg p-6 group cursor-pointer hover:shadow-2xl transition duration-300'>
            <Image
              className='group-hover:scale-110 transition duration-300'
              src={earbuds}
              width={700}
              alt='Camera Image'
            />
            <h3 className='text-[#111111] text-[22px] text-center font-bold group-hover:scale-120 transition duration-300'>
              Earbuds
            </h3>
          </div>

          {/* GAMING  */}
          <div className='bg-[#E5E5E5] shadow-lg rounded-lg p-6 group cursor-pointer hover:shadow-2xl transition duration-300'>
            <Image
              className='group-hover:scale-110 transition duration-300'
              src={gaming}
              width={700}
              alt='Camera Image'
            />
            <h3 className='text-[#111111] text-[22px] text-center font-bold group-hover:scale-120 transition duration-300'>
              Gaming
            </h3>
          </div>

          {/* SPEAKERS  */}
          <div className='bg-[#E5E5E5] shadow-lg rounded-lg p-6 group cursor-pointer hover:shadow-2xl transition duration-300'>
            <Image
              className='group-hover:scale-110 transition duration-300'
              src={portableSpeaker}
              width={700}
              alt='Camera Image'
            />
            <h3 className='text-[#111111] text-[22px] text-center font-bold group-hover:scale-120 transition duration-300'>
              Speakers
            </h3>
          </div>

          {/* Smartwatches  */}
          <div className='bg-[#E5E5E5] shadow-lg rounded-lg p-6 group cursor-pointer hover:shadow-2xl transition duration-300'>
            <Image
              className='group-hover:scale-110 transition duration-300'
              src={smartwatch}
              width={700}
              alt='Camera Image'
            />
            <h3 className='text-[#111111] text-[22px] text-center font-bold group-hover:scale-120 transition duration-300'>
              Smartwatches
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
