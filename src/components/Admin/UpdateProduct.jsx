'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import { FaUpload } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { RxUpdate } from "react-icons/rx";


const UpdateProduct = () => {
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
  const axiosInstance = useAxiosInstance()
  const params = useParams()
  const id = params?.id
  const router = useRouter()

  const {
    data: productDetails,
    isLoading: isProductLoading,
    refetch
  } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/productDetails/${id}`)
      return response.data
    },
    enabled: !!id
  })

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [tagline, setTagline] = useState('')
  const [selectedImages, setSelectedImages] = useState([null, null, null])
  const [previews, setPreviews] = useState([null, null, null])

  useEffect(() => {
    if (productDetails) {
      setSelectedCategory(productDetails.category || '')
      setSelectedBrand(productDetails.brand || '')
      setTagline(productDetails.tagline || '')
    }
  }, [productDetails])

  useEffect(() => {
    if (productDetails?.productImages) {
      const initialPreviews = [...previews]
      productDetails.productImages.forEach((imgUrl, index) => {
        if (index < 3) {
          initialPreviews[index] = imgUrl
        }
      })
      setPreviews(initialPreviews)
    }
  }, [productDetails])

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value)
    if (e.target.value !== 'Gaming') {
      setSelectedBrand('')
    }
  }

  const handleImageChange = (e, index) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const updatedImages = [...selectedImages]
      const updatedPreviews = [...previews]
      updatedImages[index] = file
      updatedPreviews[index] = URL.createObjectURL(file)
      setSelectedImages(updatedImages)
      setPreviews(updatedPreviews)
    } else {
      toast.error('Please upload a valid image')
    }
  }

  const handleUpdateProduct = async e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const shortDesc = form.shortDesc.value
    const longDesc = form.longDesc.value
    const price = parseFloat(form.price.value)
    const discount = parseFloat(form.discount.value) || 0
    const tagline = form.tagline.value
    const rating = parseFloat(form.rating.value) || 0
    const category = selectedCategory
    const brand = selectedCategory === 'Gaming' ? 'N/A' : selectedBrand

    const loadingToast = toast.loading('Updating Product...')

    try {
      const uploadedImageUrls = await Promise.all(
        selectedImages.map(async (image, index) => {
          if (!image) {
            return previews[index] || null
          }
          const formData = new FormData()
          formData.append('image', image)
          const res = await axiosInstance.post(
            'https://api.imgbb.com/1/upload?key=cbd289d81c381c05afbab416f87e8637',
            formData
          )
          return res.data.data.display_url
        })
      )

      const filteredUrls = uploadedImageUrls.filter(Boolean)

      const updatedProductData = {
        name,
        shortDesc,
        longDesc,
        price,
        discount,
        tagline,
        rating,
        category,
        brand,
        productImages: filteredUrls
      }

      const response = await axiosInstance.patch(
        `/updateProduct/${productDetails?._id}`,
        updatedProductData
      )

      toast.dismiss(loadingToast)

      if (response.data.modifiedCount > 0 || response.data.matchedCount > 0) {
        toast.success('Product updated successfully!')
        router.push('/products')
      } else {
        toast.error('No changes were made to the product')
      }
    } catch (err) {
      toast.dismiss(loadingToast)
      console.error(err)
      toast.error('Error updating product')
    }
  }

  return (
    <div className='mt-6'>
      <form onSubmit={handleUpdateProduct} className='space-y-5'>
        {/* General Info */}
        <div>
          <h2 className='text-[20px] font-bold'>General Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-3'>
            <input
              defaultValue={productDetails?.name}
              type='text'
              name='name'
              placeholder='Product Name'
              className='border py-2 px-3 rounded-lg'
              required
            />
            <input
              defaultValue={productDetails?.shortDesc}
              type='text'
              name='shortDesc'
              placeholder='Short Description'
              className='border py-2 px-3 rounded-lg'
              required
            />
          </div>
          <textarea
            defaultValue={productDetails?.longDesc}
            name='longDesc'
            placeholder='Brief Description'
            className='border py-2 px-3 rounded-lg w-full mt-3'
            rows='5'
            required
          />
        </div>

        {/* Category & Brand */}
        <div>
          <h2 className='text-[20px] font-bold'>Product Category</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-3'>
            <select
              name='category'
              className='border py-2 px-3 rounded-lg bg-white'
              required
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value=''>Choose Product Category</option>
              {Object.keys(gadgetData).map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {selectedCategory !== 'Gaming' && (
              <select
                name='brand'
                className={`border py-2 px-3 rounded-lg bg-white ${
                  !selectedCategory ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
                disabled={!selectedCategory}
                required={selectedCategory !== 'Gaming'}
              >
                <option value=''>Choose Brand</option>
                {selectedCategory &&
                  gadgetData[selectedCategory]?.map(brand => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h2 className='text-[20px] font-bold'>Pricing and General</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-3'>
            <input
              defaultValue={productDetails?.price}
              type='number'
              name='price'
              placeholder='Price'
              className='border py-2 px-3 rounded-lg'
              required
            />
            <input
              defaultValue={productDetails?.discount}
              type='number'
              name='discount'
              placeholder='Discount %'
              className='border py-2 px-3 rounded-lg'
              required
            />
            <select
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              name='tagline'
              className='border py-2 px-3 rounded-lg bg-white'
              required
            >
              <option value=''>Choose Product Tagline</option>
              <option value='latest'>Latest</option>
              <option value='best-seller'>Best Seller</option>
              <option value='most-popular'>Most Popular</option>
              <option value='new-comer'>New Comer</option>
              <option value='hot-product'>Hot Product</option>
            </select>
            <input
              defaultValue={productDetails?.rating}
              type='number'
              name='rating'
              placeholder='Rating (out of 5)'
              min='0'
              max='5'
              step='0.1'
              className='border py-2 px-3 rounded-lg'
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {[0, 1, 2].map(index => (
            <div className='mt-6' key={index}>
              <input
                type='file'
                id={`fileInput${index}`}
                className='hidden'
                accept='image/*'
                onChange={e => handleImageChange(e, index)}
              />
              <label htmlFor={`fileInput${index}`} className='cursor-pointer'>
                <div className='w-full border-2 border-dotted border-gray-400 p-4 rounded-lg flex flex-col justify-center items-center gap-3 hover:bg-gray-200 transition-all duration-200'>
                  {previews[index] ? (
                    <img
                      src={previews[index]}
                      alt={`Preview ${index + 1}`}
                      className='w-40 h-40 object-cover rounded-lg'
                    />
                  ) : (
                    <div>
                      <p className='text-gray-500 font-semibold'>
                        Upload Product Image {index + 1}
                      </p>
                      <FaUpload className='text-gray-500' />
                    </div>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          type='submit'
          className='relative z-10 cursor-pointer gap-3 overflow-hidden border-2 rounded-full group flex justify-center items-center w-full px-10 py-2 mt-10 text-lg text-white bg-[#111111] hover:bg-[#2e2e2e]'
        >
          Update Product
          <RxUpdate />

        </button>
      </form>
    </div>
  )
}

export default UpdateProduct
