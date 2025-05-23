'use client'
import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import Swal from 'sweetalert2'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import toast from 'react-hot-toast'

const UserDetailsModal = ({ isOpen, onClose, user, refetch }) => {
  const [show, setShow] = useState(false)
  let axiosInstance = useAxiosInstance()

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10)
    } else {
      setShow(false)
    }
  }, [isOpen])

  if (!isOpen || !user) return null

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
                  onClose()
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

  let handleUpdateUser = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to promote this user to admin!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#111111',
      cancelButtonColor: '#ed4747',
      confirmButtonText: 'Yes, proceed!'
    }).then(firstResult => {
      if (firstResult.isConfirmed) {
        Swal.fire({
          title: 'Confirm Final Promotion',
          text: 'This user will be granted admin privileges. Continue?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#111111',
          cancelButtonColor: '#ed4747',
          confirmButtonText: 'Yes, make admin!'
        }).then(secondResult => {
          if (secondResult.isConfirmed) {
            axiosInstance
              .patch(`/updateUser/${id}`)
              .then(res => {
                if (res.data.modifiedCount > 0) {
                  refetch()
                  onClose()
                  toast.success('User promoted to admin successfully')
                }
              })
              .catch(error => {
                console.error('Error:', error)
                toast.error('Failed to promote user')
              })
          }
        })
      }
    })
  }

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm transition-all duration-300'>
      <div
        className={`bg-white w-full max-w-[750px] p-8 rounded-xl relative shadow-2xl transform transition-all duration-300
          ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-[#111] text-[30px] cursor-pointer font-bold hover:opacity-60 transition-all duration-300'
        >
          <IoIosCloseCircle />
        </button>

        <div className='flex gap-6 items-center'>
          <img
            src={user?.imageUrl}
            alt='User'
            className='w-[120px] h-[120px] rounded-full object-cover'
          />
          <div>
            <h2 className='text-[24px] font-bold text-[#111]'>{user?.name}</h2>
            <p className='text-gray-600 mt-1'>{user?.email}</p>
            <p className='mt-1'>
              Role:{' '}
              <span
                className={`font-semibold capitalize ${
                  user?.role === 'admin' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {user?.role}
              </span>
            </p>
            <p className='mt-1 text-gray-500'>Member Since: Not Available</p>
          </div>
        </div>

        <div className='mt-8 flex gap-4 justify-end'>
          <button
            onClick={() => {
              if (user?.role !== 'admin') {
                handleUpdateUser(user?._id)
              }
            }}
            disabled={user?.role === 'admin'}
            className={`px-5 py-3 rounded text-base font-semibold transition-all duration-300
    ${
      user?.role === 'admin'
        ? 'bg-gray-400 text-white cursor-not-allowed opacity-60'
        : 'bg-[#111] text-white hover:bg-[#333] hover:opacity-60 cursor-pointer'
    }`}
          >
            Change Role
          </button>

          <button
            onClick={() => {
              if (user?.role !== 'admin') {
                handleDeleteUser(user?._id)
              }
            }}
            disabled={user?.role === 'admin'}
            className={`px-5 py-3 rounded text-base font-semibold transition-all duration-300
    ${
      user?.role === 'admin'
        ? 'bg-gray-400 text-white cursor-not-allowed opacity-60'
        : 'bg-red-600 text-white hover:bg-red-700 hover:opacity-60 cursor-pointer'
    }`}
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsModal
