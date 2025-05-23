'use client'
import React, { useState } from 'react'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import { FaEye, FaSearch } from 'react-icons/fa'
import Link from 'next/link'
import { RiDeleteBinFill } from 'react-icons/ri'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

const Users = () => {
  let axiosInstance = useAxiosInstance()
  const [searchText, setSearchText] = useState('')

  const {
    data: userData,
    isLoading: isUsersLoading,
    refetch
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/allUsers`)
      return response.data
    }
  })

  let filteredUsers

  if (searchText == '') {
    filteredUsers = userData
  } else {
    filteredUsers = userData?.filter(users =>
      users?.name.toLowerCase().includes(searchText.toLowerCase())
    )
  }

  let handleDeleteUser = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'User can only be deleted from Database. You have to delete from Firebase separately!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#111111',
      cancelButtonColor: '#ed4747',
      confirmButtonText: 'Yes, proceed!'
    }).then(firstResult => {
      if (firstResult.isConfirmed) {
        // Second confirmation
        Swal.fire({
          title: 'Confirm Final Deletion',
          text: 'This action will delete the user from the database. You have to delete from Firebase separately! Continue?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#111111',
          cancelButtonColor: '#ed4747',
          confirmButtonText: 'Yes, delete!'
        }).then(secondResult => {
          if (secondResult.isConfirmed) {
            axiosInstance
              .delete(`/deleteUser/${id}`)
              .then(res => {
                if (res.data.deletedCount > 0) {
                  refetch()
                  toast.success('User deleted successfully')
                }
              })
              .catch(error => {
                console.error('Error:', error)
                toast.error('Failed to delete user')
              })
          }
        })
      }
    })
  }

  return (
    <div className=''>
      <div className='mt-8'>
        <h1 className='text-[26px] text-[#111111] font-bold'>
          Total Users: {filteredUsers?.length}
        </h1>
      </div>

      <div className='SearchBar relative mt-4'>
        <input
          onChange={e => {
            setSearchText(e.target.value)
          }}
          className='w-full border-2 border-[#111111] rounded-lg py-3 px-4 text-[#111111] font-semibold placeholder:font-semibold'
          type='text'
          placeholder='Search By User Name'
        />
        <FaSearch className='text-xl absolute right-5 bottom-4 text-[#111111] cursor-pointer' />
      </div>

      <div className='mt-4'>
        <div className='bg-gradient-to-r from-[#111111]  to-[#747373] rounded-tl-xl rounded-tr-xl grid grid-cols-12 px-2 md:px-6 py-4'>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-1 text-center'>
            #SL
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-1 text-center'>
            Image
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-3 text-center'>
            User Name
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-3 text-center'>
            Email
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-2 text-center'>
            Role
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-1 text-center'>
            View
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-1 text-center'>
            Delete
          </div>
        </div>
      </div>

      {filteredUsers ? (
        filteredUsers?.map((user, index) => (
          <div key={index} className=''>
            <div className='bg-[#F7FFF7] border-b-2 border-[#111111] grid grid-cols-12 px-2 md:px-6 py-4 items-center'>
              <div className='text-[#111111] font-bold  text-[9px] md:text-base lg:text-[18px] col-span-1 text-center'>
                {index + 1}
              </div>
              <div className='text-[#111111] font-bold  text-[9px] md:text-base lg:text-[18px] col-span-1 text-center flex justify-center'>
                <img
                  className='w-[50px] h-[50px] rounded-full object-cover'
                  src={user?.imageUrl}
                  alt=''
                />
              </div>
              <div className='text-[#111111] font-bold  text-[9px] md:text-base lg:text-[18px] col-span-3 text-center'>
                {user?.name}
              </div>
              <div className='text-[#111111] font-bold  text-[9px] md:text-base lg:text-[16px] col-span-3 text-center'>
                {user?.email}
              </div>

              <div
                className={`font-bold text-[9px] md:text-base lg:text-[18px] col-span-2 text-center capitalize ${
                  user?.role === 'admin' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {user?.role}
              </div>

              <Link
                href={`users/${user?._id}`}
                className='text-[#111111] font-bold  text-[9px] md:text-base lg:text-[18px] col-span-1 text-center flex justify-center'
              >
                <FaEye className='text-[12px] md:text-base lg:text-3xl cursor-pointer font-bold text-[#111111] hover:opacity-60' />
              </Link>

              <div
                className={`font-bold text-[9px] md:text-base lg:text-[18px] col-span-1 text-center flex justify-center ${
                  user?.role === 'admin' ? 'text-red-600' : 'text-[#111111]'
                }`}
              >
                <RiDeleteBinFill
                  className={`text-[12px] md:text-base lg:text-3xl font-bold 
      ${
        user?.role === 'admin'
          ? 'text-gray-400 cursor-not-allowed opacity-50'
          : 'text-[#ed4747] cursor-pointer hover:opacity-60'
      }`}
                  onClick={
                    user?.role === 'admin'
                      ? null
                      : () => {
                          handleDeleteUser(user?._id)
                        }
                  }
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Loading....</div>
      )}
    </div>
  )
}

export default Users
