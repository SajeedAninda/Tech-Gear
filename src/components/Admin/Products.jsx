'use client'
import React, { useState } from 'react'
import useAllProducts from '../Hooks/useAllProducts'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { FaSearch } from 'react-icons/fa'
import { RiDeleteBinFill } from 'react-icons/ri'
import { MdEditSquare } from 'react-icons/md'
import Link from 'next/link'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

const Products = () => {
  const { products, isProductsLoading, refetch } = useAllProducts()
  const [searchText, setSearchText] = useState('')
  const axiosInstance = useAxiosInstance()

  let filteredProducts

  if (searchText == '') {
    filteredProducts = products
  } else {
    filteredProducts = products?.filter(
      product =>
        product?.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product?.brand.toLowerCase().includes(searchText.toLowerCase())
    )
  }

  let handleDeleteProduct = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once Deleted, you cannot revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#111111',
      cancelButtonColor: '#ed4747',
      confirmButtonText: 'Yes, Delete!'
    }).then(result => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/deleteProduct/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch()
              console.log(res.data)
              toast.success('Product Deleted Succesfully')
            }
          })
          .catch(error => {
            console.error('Error :', error)
            toast.error('Error', 'Failed to delete Product')
          })
      }
    })
  }

  return (
    <div className=''>
      <div className='mt-8'>
        <h1 className='text-[26px] text-[#111111] font-bold'>
          Total Products: {filteredProducts?.length}
        </h1>
      </div>

      <div className='SearchBar relative mt-4'>
        <input
          onChange={e => {
            setSearchText(e.target.value)
          }}
          className='w-full border-2 border-[#111111] rounded-lg py-3 px-4 text-[#111111] font-semibold placeholder:font-semibold'
          type='text'
          placeholder='Search By Product or Brand Name'
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
            Name
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-3 text-center'>
            Brand
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-2 text-center'>
            Price
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-1 text-center'>
            Update
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-1 text-center'>
            Delete
          </div>
        </div>
      </div>

      {filteredProducts ? (
        filteredProducts?.map((product, index) => (
          <div key={index} className=''>
            <div className='bg-[#F7FFF7] border-b-2 border-[#111111] grid grid-cols-12 px-2 md:px-6 py-4 items-center'>
              <div className='text-[#111111] font-bold  text-[9px] md:text-base lg:text-[18px] col-span-1 text-center'>
                {index + 1}
              </div>
              <div className='text-[#111111] font-bold  text-[9px] md:text-base lg:text-[18px] col-span-1 text-center flex justify-center'>
                <img
                  className='w-[50px] h-[50px] rounded-full object-cover'
                  src={product?.productImages[0]}
                  alt=''
                />
              </div>
              <div className='text-[#111111] font-bold  text-[9px] md:text-base lg:text-[18px] col-span-3 text-center'>
                {product?.name}
              </div>
              <div className='text-[#111111] font-bold  text-[9px] md:text-base lg:text-[18px] col-span-3 text-center'>
                {product?.brand}
              </div>
              <div className='text-[#111111] font-bold  text-[9px] md:text-base lg:text-[18px] col-span-2 text-center capitalize'>
                ৳ {product?.price}
              </div>

              <Link
                href={'/'}
                className='text-[#111111] font-bold  text-[9px] md:text-base lg:text-[18px] col-span-1 text-center flex justify-center'
              >
                <MdEditSquare className='text-[12px] md:text-base lg:text-3xl cursor-pointer font-bold text-[#111111] hover:opacity-60' />
              </Link>

              <div
                onClick={() => handleDeleteProduct(product?._id)}
                className='text-[#111111] font-bold  text-[9px] md:text-base lg:text-[18px] col-span-1 text-center flex justify-center'
              >
                <RiDeleteBinFill className='text-[12px] md:text-base lg:text-3xl cursor-pointer font-bold text-[#ed4747] hover:opacity-60' />
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

export default Products
