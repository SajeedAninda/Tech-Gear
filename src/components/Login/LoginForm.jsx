'use client'
import React from 'react'
import useAuth from '../Hooks/useAuth'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const LoginForm = () => {
  let { signIn } = useAuth()
  let router = useRouter()

  let handleLogin = e => {
    e.preventDefault()
    let email = e.target.email.value
    let password = e.target.password.value
    let loadingToast = toast.loading('Logging In...')
    signIn(email, password)
      .then(userCredential => {
        const user = userCredential.user
        console.log(user)
        toast.dismiss(loadingToast)
        toast.success('Logged In Successfully!')
        router.push('/')
      })
      .catch(error => {
        let errorCode = error.code
        console.log(errorCode)
        if (errorCode === 'auth/invalid-credential') {
          toast.dismiss(loadingToast)
          return toast.error('Invalid Username or Password')
        }
      })
  }

  return (
    <form onSubmit={handleLogin} className='mt-6'>
      <div>
        <label className='text-md font-medium'>
          Email<span className='text-red-500'>*</span>
        </label>{' '}
        <br></br>
        <input
          type='email'
          name='email'
          className='w-full mt-2 border-2 border-[#111111] px-6 py-2 rounded-md'
          placeholder='Enter Your Email Address'
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
        ></input>
      </div>

      <button type='submit' className='flex justify-center cursor-pointer w-full px-10 py-2 mt-10 gap-2 items-center shadow-xl text-lg text-white hover:text-gray-300 bg-[#111111]  backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10  overflow-hidden border-2 rounded-full group'>
        Login
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

      <div className='flex gap-8'>
        <button className='flex justify-center cursor-pointer w-full px-10 py-2 mt-10 gap-2 items-center shadow-xl text-lg text-white hover:text-gray-300 bg-[#111111]  backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10  overflow-hidden border-2 rounded-full group'>
          Demo User
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

        <button className='flex justify-center cursor-pointer w-full px-10 py-2 mt-10 gap-2 items-center shadow-xl text-lg text-white hover:text-gray-300 bg-[#111111]  backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10  overflow-hidden border-2 rounded-full group'>
          Demo Admin
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
      </div>
    </form>
  )
}

export default LoginForm
