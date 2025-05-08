'use client'
import React, { useState } from 'react'

const AddProduct = () => {
  return (
    <div className='mt-6 '>
      <form className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <input
            type='text'
            name='name'
            placeholder='Product Name'
            className='border p-2 rounded'
            required
          />
          <input
            type='text'
            name='category'
            placeholder='Product Category'
            className='border p-2 rounded'
            required
          />
          <input
            type='text'
            name='brand'
            placeholder='Brand'
            className='border p-2 rounded'
          />
          <input
            type='number'
            name='price'
            placeholder='Price'
            className='border p-2 rounded'
            required
          />
          <input
            type='number'
            name='discount'
            placeholder='Discount %'
            className='border p-2 rounded'
          />
          <input
            type='text'
            name='tagline'
            placeholder='Product Tagline'
            className='border p-2 rounded'
          />
          <input
            type='number'
            name='rating'
            placeholder='Rating (out of 5)'
            min='0'
            max='5'
            step='0.1'
            className='border p-2 rounded'
          />
        </div>

        <textarea
          name='shortDesc'
          placeholder='Short Description'
          className='border p-2 rounded w-full'
          rows='3'
        />

        <textarea
          name='longDesc'
          placeholder='Long Product Description'
          className='border p-2 rounded w-full'
          rows='5'
        />

        <button
          type='submit'
          className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800'
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct
