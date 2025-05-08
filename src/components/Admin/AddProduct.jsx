'use client'
import React, { useState } from 'react'

const gadgetData = {
  Smartphones: [
    'Apple',
    'Samsung',
    'Xiaomi',
    'OnePlus',
    'Google',
    'Oppo',
    'Vivo',
    'Motorola',
    'Realme',
    'Nokia',
    'Asus',
    'Sony',
    'Huawei',
    'Tecno',
    'Infinix'
  ],
  Laptops: [
    'Dell',
    'HP',
    'Lenovo',
    'Apple',
    'Asus',
    'Acer',
    'Microsoft',
    'MSI',
    'Razer',
    'Samsung'
  ],
  Headphones: [
    'Sony',
    'Bose',
    'Sennheiser',
    'JBL',
    'Beats by Dre',
    'Skullcandy',
    'Audio-Technica'
  ],
  Camera: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic'],
  Earbuds: [
    'Apple',
    'Samsung',
    'OnePlus',
    'Sony',
    'JBL',
    'Realme',
    'Oppo',
    'Nothing',
    'Bose',
    'Beats'
  ],
  Gaming: [],
  Speakers: ['JBL', 'Bose', 'Sony', 'Marshall', 'Harman Kardon'],
  Smartwatches: [
    'Apple',
    'Samsung',
    'Garmin',
    'Fitbit',
    'Huawei',
    'Amazfit',
    'Fossil'
  ]
}

const AddProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value)
    setSelectedBrand('') 
  }

  return (
    <div className='mt-6'>
      <form className='space-y-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <input
            type='text'
            name='name'
            placeholder='Product Name'
            className='border py-2 px-3 rounded-lg placeholder:text-[#111111]'
            required
          />

          {/* Category Dropdown */}
          <select
            name='category'
            className='border py-2 px-3 rounded-lg placeholder:text-[#111111] text-[#111111]'
            required
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value=''>Choose Product Category</option>
            {Object.keys(gadgetData).map(category => (
              <option
                className='bg-[#111111] text-white'
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          {/* Brand Dropdown */}
          <select
            name='brand'
            className='border py-2 px-3 rounded-lg placeholder:text-[#111111] text-[#111111]'
            value={selectedBrand}
            onChange={e => setSelectedBrand(e.target.value)}
            disabled={!selectedCategory}
            required
          >
            <option value=''>Choose Brand</option>
            {selectedCategory &&
              gadgetData[selectedCategory]?.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
          </select>

          <input
            type='number'
            name='price'
            placeholder='Price'
            className='border py-2 px-3 rounded-lg placeholder:text-[#111111]'
            required
          />
          <input
            type='number'
            name='discount'
            placeholder='Discount %'
            className='border py-2 px-3 rounded-lg placeholder:text-[#111111]'
          />
          <input
            type='text'
            name='tagline'
            placeholder='Product Tagline'
            className='border py-2 px-3 rounded-lg placeholder:text-[#111111]'
          />
          <input
            type='number'
            name='rating'
            placeholder='Rating (out of 5)'
            min='0'
            max='5'
            step='0.1'
            className='border py-2 px-3 rounded-lg placeholder:text-[#111111]'
          />
        </div>

        <textarea
          name='shortDesc'
          placeholder='Short Description'
          className='border py-2 px-3 rounded-lg placeholder:text-[#111111] w-full'
          rows='3'
        />

        <textarea
          name='longDesc'
          placeholder='Long Product Description'
          className='border py-2 px-3 rounded-lg placeholder:text-[#111111] w-full'
          rows='5'
        />

        <button
          type='submit'
          className='bg-black text-white px-4 py-2 rounded-lg placeholder:text-[#111111] hover:bg-gray-800'
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct
