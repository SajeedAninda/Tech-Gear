'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'

const UpdateProduct = () => {
  const axiosInstance = useAxiosInstance()
  const params = useParams()
  const id = params?.id


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

  console.log(productDetails)

  if (isProductLoading) return <p>Loading...</p>
  if (!productDetails) return <p>No product found</p>

  return (
    <div>
      <h1>Product ID: {id}</h1>
    </div>
  )
}

export default UpdateProduct
