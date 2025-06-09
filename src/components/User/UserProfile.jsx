'use client'
import React from 'react'
import useCurrentUser from '../Hooks/useCurrentUser'
import useAuth from '../Hooks/useAuth'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import { BsBorderStyle } from 'react-icons/bs'
import { AiFillProduct } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

const UserProfile = () => {
  const { userData, isUserLoading } = useCurrentUser()
  let { loggedInUser } = useAuth()
  let currentUserEmail = loggedInUser?.email
  let axiosInstance = useAxiosInstance()
  const { logOut } = useAuth()
  const router = useRouter()

  const { data: cartData, isLoading: isCartLoading } = useQuery({
    queryKey: ['cartData', currentUserEmail],
    queryFn: async () => {
      const response = await axiosInstance.get(`/getCart/${currentUserEmail}`)
      return response.data
    },
    enabled: !!currentUserEmail
  })

  const {
    data: userOrders,
    isLoading: isOrdersLoading,
    refetch: OrdersRefetch
  } = useQuery({
    queryKey: ['userOrders', currentUserEmail],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/userOrders/${currentUserEmail}`
      )
      return response.data
    },
    enabled: !!currentUserEmail
  })

  const formatDate = isoDate => {
  const date = new Date(isoDate)
  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()

  const getOrdinal = d => {
    if (d > 3 && d < 21) return 'th'
    switch (d % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  return `${day}${getOrdinal(day)} ${month}, ${year}`
}


  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to Logout as User?',
      text: 'Click Yes if You want to Log out of the website!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#111',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log Out!'
    }).then(result => {
      if (result.isConfirmed) {
        logOut().then(() => {
          toast.success('Logged Out of the account')
          router.push('/')
        })
      }
    })
  }

  return (
    <div>
      <div className='w-full mt-4 flex justify-between items-center gap-4'>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center gap-4'>
            <div className='text-[24px] font-semibold text-[#111] p-6 rounded-xl shadow-lg flex flex-col gap-2'>
              <span>Total Products in Cart</span>
              <span className='text-[30px] font-bold flex items-center gap-4'>
                <AiFillProduct />
                {cartData?.length ?? 0}
              </span>
            </div>
            <div className='text-[24px] font-semibold text-[#111] p-6 rounded-xl shadow-lg flex flex-col gap-2'>
              <span>Total Orders</span>
              <span className='text-[30px] font-bold flex items-center gap-4'>
                <BsBorderStyle />{userOrders?.length ?? 0}
              </span>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div
        className={`bg-white w-full mt-10 p-8 rounded-xl relative shadow-2xl transform transition-all duration-300`}
      >
        <div className='flex gap-6 items-center'>
          <img
            src={userData?.imageUrl}
            alt='userData'
            className='w-[120px] h-[120px] rounded-full object-cover'
          />
          <div>
            <h2 className='text-[24px] font-bold text-[#111]'>
              {userData?.name}
            </h2>
            <p className='text-gray-600 mt-1'>{userData?.email}</p>
            <p className='mt-1'>
              Role:{' '}
              <span
                className={`font-semibold capitalize ${
                  userData?.role === 'admin' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {userData?.role}
              </span>
            </p>
            <p className='mt-1 text-gray-500'>
  Member Since: {userData?.registerDate && formatDate(userData.registerDate)}
</p>

          </div>
        </div>

        <div className='mt-8 flex gap-4 justify-end'>
          <button
            onClick={handleLogout}
            className={`px-5 py-3 rounded text-base font-semibold transition-all duration-300 bg-[#111] text-white hover:bg-[#333] hover:opacity-60 cursor-pointer`}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
