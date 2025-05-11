import React from 'react'
import useAxiosInstance from './useAxiosInstance'
import { useQuery } from '@tanstack/react-query'

const useAllProducts = () => {
  let axiosInstance = useAxiosInstance()
  const {
    data: products,
    isLoading: isProductsLoading,
    refetch
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/allProducts`)
      return response.data
    }
  })

  return { products, isProductsLoading, refetch }
}

export default useAllProducts
