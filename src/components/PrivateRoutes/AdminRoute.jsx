'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ColorRing } from 'react-loader-spinner'
import useCurrentUser from '../Hooks/useCurrentUser'
import useAuth from '../Hooks/useAuth'

const AdminRoute = ({ children }) => {
  const router = useRouter()
  const { userData, isUserLoading } = useCurrentUser()
  const { loggedInUser, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isUserLoading) {
      if (!(userData?.role === 'admin' && loggedInUser)) {
        router.replace('/login')
      }
    }
  }, [loading, isUserLoading, userData, loggedInUser, router])

  if (loading || isUserLoading) {
    return (
      <div className='flex justify-center min-h-screen items-center'>
        <ColorRing
          visible={true}
          height='80'
          width='80'
          ariaLabel='blocks-loading'
          wrapperStyle={{}}
          wrapperClass='blocks-wrapper'
          colors={['#111', '#0e2b45', '#111', '#0e2b45', '#111']}
        />
      </div>
    )
  }

  if (userData?.role === 'admin' && loggedInUser) {
    return children
  }

  return null
}

export default AdminRoute
