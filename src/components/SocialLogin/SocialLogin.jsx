'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import useAuth from '../Hooks/useAuth'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import toast from 'react-hot-toast'

const SocialLogin = () => {
  let { googleLogin } = useAuth()
  let axiosInstance = useAxiosInstance()
  let router = useRouter()

  let handleGoogleLogin = () => {
    googleLogin()
      .then(result => {
        const user = result.user
        let userDetails = {
          name: user?.displayName,
          email: user?.email,
          imageUrl: user?.photoURL,
          role: 'user'
        }

        axiosInstance.post('/googleLogin', userDetails).then(res => {
          console.log(res.data)
          if (res.data.insertedId) {
            console.log(res.data)
          }
        })
        toast.success('Logged In Successfully!')
        router.push('/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div onClick={handleGoogleLogin} className='flex justify-center'>
      <button className='flex justify-center cursor-pointer w-full px-10 py-2 mt-6 gap-2 items-center shadow-xl text-lg text-white hover:text-gray-300 bg-[#111111]  backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10  overflow-hidden border-2 rounded-full group'>
        Google
        <FaGoogle className=' group-hover:rotate-360 text-gray-600 group-hover:text-white transition duration-700' />
      </button>
    </div>
  )
}

export default SocialLogin
