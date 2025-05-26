'use client'
import React from 'react'
import useCurrentUser from '../Hooks/useCurrentUser'

const UserProfile = () => {
  const { userData, isUserLoading } = useCurrentUser()

  return (
    <div>
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
            <p className='mt-1 text-gray-500'>Member Since: Not Available</p>
          </div>
        </div>

        <div className='mt-8 flex gap-4 justify-end'>
          <button
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
