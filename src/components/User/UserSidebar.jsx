'use client'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import useAuth from '../Hooks/useAuth'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import { IoHome, IoLogOut, IoPersonCircleSharp } from 'react-icons/io5'
import { FaCartShopping } from 'react-icons/fa6'
import Link from 'next/link'
import { FaBoxOpen } from 'react-icons/fa'

const UserSidebar = () => {
  const pathname = usePathname()
  const { logOut } = useAuth()
  const router = useRouter()

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
  const navLinks = [
    { href: '/', label: 'Home', icon: <IoHome /> },
    { href: '/profile', label: 'Profile', icon: <IoPersonCircleSharp /> },
    { href: '/cart', label: 'Cart', icon: <FaCartShopping /> },
    { href: '/userOrders', label: 'Orders', icon: <FaBoxOpen /> }
  ]

  return (
    <div className='h-full bg-[#111111] rounded-l-2xl py-10 px-8'>
      {navLinks.map(({ href, label, icon }) => (
        <Link
          key={href}
          href={href}
          className={`p-4 mt-2 rounded-xl flex items-center gap-2 text-[20px] font-semibold transition-all duration-300
            ${
              pathname === href
                ? 'bg-gray-800 text-blue-400'
                : 'text-white hover:bg-gray-800'
            }`}
        >
          {icon}
          {label}
        </Link>
      ))}

      <div
        onClick={handleLogout}
        className='p-4 mt-2 rounded-xl flex items-center gap-2 text-[20px] font-semibold transition-all duration-300 text-white hover:bg-gray-800 cursor-pointer'
      >
        <IoLogOut />
        Log Out
      </div>
    </div>
  )
}

export default UserSidebar
