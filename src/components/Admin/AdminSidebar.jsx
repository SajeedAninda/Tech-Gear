'use client'
import Link from 'next/link'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'
import { BsBorderStyle } from 'react-icons/bs'
import { AiFillProduct } from 'react-icons/ai'
import { MdFormatListBulletedAdd } from 'react-icons/md'
import { ImUsers } from 'react-icons/im'
import { IoLogOut, IoSettings } from 'react-icons/io5'
import { usePathname, useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'
import useAuth from '../Hooks/useAuth'

const AdminSidebar = () => {
  const pathname = usePathname()
  const { logOut } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to Logout as Admin?',
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
    { href: '/adminPanel', label: 'Dashboard', icon: <MdOutlineDashboard /> },
    { href: '/orders', label: 'Orders', icon: <BsBorderStyle /> },
    { href: '/products', label: 'Products', icon: <AiFillProduct /> },
    {
      href: '/add-product',
      label: 'Add Product',
      icon: <MdFormatListBulletedAdd />
    },
    { href: '/users', label: 'Users', icon: <ImUsers /> },
    { href: '/settings', label: 'Settings', icon: <IoSettings /> }
  ]

  return (
    <div className='h-full bg-[#111111] rounded-l-2xl py-10 px-8'>
      {navLinks.map(({ href, label, icon }) => (
        <Link
          key={href}
          href={href}
          className={`p-4 mt-2 rounded-xl flex items-center gap-2 text-[20px] font-semibold transition-all duration-300
            ${
              pathname.startsWith(href)
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

export default AdminSidebar
