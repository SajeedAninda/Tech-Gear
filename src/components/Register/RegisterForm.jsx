'use client'
import React, { useState } from 'react'
import { FaUpload } from 'react-icons/fa'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import useAuth from '../Hooks/useAuth'
import toast from 'react-hot-toast'
import axios from 'axios'

const RegisterForm = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [preview, setPreview] = useState(null)
  let axiosInstance = useAxiosInstance()
  let { signUp } = useAuth()

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      setPreview(URL.createObjectURL(file))
    } else {
      setSelectedImage(null)
      setPreview(null)
      toast.error('Please upload a valid image')
    }
  }

  let handleRegister = async e => {
    e.preventDefault()
    let fullName = e.target.name.value
    let email = e.target.email.value
    let password = e.target.password.value

    if (!selectedImage) {
      return toast.error('Please upload an image')
    }

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters!')
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error('Password must contain at least one capital letter!')
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return toast.error(
        'Password must contain at least one special character!'
      )
    }

    let loadingToast = toast.loading('Registering...')

    try {
      let formData = new FormData()
      formData.append('image', selectedImage)
      let imgBBRes = await axios.post(
        'https://api.imgbb.com/1/upload?key=cbd289d81c381c05afbab416f87e8637',
        formData
      )
      let imageUrl = imgBBRes.data.data.display_url

      let userCredential = await signUp(email, password)
      let user = userCredential.user

      let userDetails = { name: fullName, email, imageUrl }
      let res = await axiosInstance.post('/registerUser', userDetails)

      if (res.data.insertedId) {
        toast.dismiss(loadingToast)
        toast.success('Registration Successful. Please Login')
        // navigate('/login')
      }
    } catch (error) {
      console.error(error)
      toast.dismiss(loadingToast)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleRegister} className='mt-6'>
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

      <button type='submit' className='flex justify-center cursor-pointer w-full px-10 py-2 mt-10 gap-2 items-center shadow-xl text-lg text-white hover:text-gray-300 bg-[#111111]  backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10  overflow-hidden border-2 rounded-full group'>
        Register
        <svg
          className='w-8 h-8  group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45'
          viewBox='0 0 16 19'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z'
            className='fill-gray-800 group-hover:fill-gray-800'
          ></path>
        </svg>
      </button>
    </form>
  )
}

export default RegisterForm
