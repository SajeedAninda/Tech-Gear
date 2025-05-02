'use client'
import React, { useState } from 'react'
import { FaUpload } from 'react-icons/fa'

const RegisterForm = () => {
    let [selectedImage, setSelectedImage] = useState(null)
    const [preview, setPreview] = useState(null)
  
    let handleImageChange = e => {
      let file = e.target.files[0]
  
      if (file) {
        if (file.type.startsWith('image/')) {
          setSelectedImage(file)
        } else {
          setSelectedImage(null)
          toast.error('Please upload a valid image')
        }
      }
    }
  
    return (
      <form className='mt-6'>
        <div>
          <label className='text-md font-medium'>
            Full Name<span className='text-red-500'>*</span>
          </label>{' '}
          <br></br>
          <input
            type='name'
            name='name'
            className='w-full mt-2 border-2 border-[#111111] px-6 py-2 rounded-md'
            placeholder='Enter Your Full Name'
            required
          ></input>
        </div>
  
        <div className='mt-4'>
          <label className='text-md font-medium'>
            Email<span className='text-red-500'>*</span>
          </label>{' '}
          <br></br>
          <input
            type='email'
            name='email'
            className='w-full mt-2 border-2 border-[#111111] px-6 py-2 rounded-md'
            placeholder='Enter Your Email Address'
            required
          ></input>
        </div>
  
        <div className='mt-4'>
          <label className='text-md font-medium'>
            Password<span className='text-red-500'>*</span>
          </label>{' '}
          <br></br>
          <input
            type='password'
            name='password'
            className='w-full mt-2 border-2 border-[#111111] px-6 py-2 rounded-md'
            placeholder='Enter Password'
            required
          ></input>
        </div>
  
        {/* Image Upload Section */}
        <div className='mt-6'>
          <input
            type='file'
            id='fileInput'
            className='hidden'
            accept='image/*'
            onChange={handleImageChange}
          />
          <label htmlFor='fileInput' className='cursor-pointer'>
            <div className='w-full border-2 border-dotted border-gray-400 p-10 rounded-lg flex flex-col justify-center items-center gap-3 hover:bg-gray-200 transition-all duration-200'>
              {preview ? (
                <img
                  src={preview}
                  alt='Preview'
                  className='w-20 h-20 object-cover rounded-full'
                />
              ) : (
                <>
                  <p className='text-gray-500 font-semibold'>Upload Your Photo</p>
                  <FaUpload className='text-gray-500' />
                </>
              )}
            </div>
          </label>
        </div>
  
        
      </form>
    )
  }

export default RegisterForm
