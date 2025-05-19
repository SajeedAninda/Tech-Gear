'use client'
import useAxiosInstance from '@/components/Hooks/useAxiosInstance';
import { useParams } from 'next/navigation';
import React from 'react';

const ProductDetails = () => {
    const axiosInstance = useAxiosInstance()
  const params = useParams()
  const id = params?.id


    return (
        <div>
            Product Details
        </div>
    );
};

export default ProductDetails;