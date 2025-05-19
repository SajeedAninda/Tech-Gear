'use client'
import useAxiosInstance from '@/components/Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

const ProductDetails = () => {
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

  console.log(productDetails);

    return (
        <div>
            Product Details
        </div>
    );
};

export default ProductDetails;