'use client'
import React from 'react';
import useCurrentUser from '../Hooks/useCurrentUser';
import useAuth from '../Hooks/useAuth';
import useAxiosInstance from '../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';

const CartItems = () => {
    const { userData, isUserLoading } = useCurrentUser()
  let { loggedInUser } = useAuth()
  let currentUserEmail = loggedInUser?.email
  let axiosInstance = useAxiosInstance()

  const { data: cartData, isLoading: isCartLoading } = useQuery({
    queryKey: ['cartData', currentUserEmail],
    queryFn: async () => {
      const response = await axiosInstance.get(`/getCart/${currentUserEmail}`)
      return response.data
    },
    enabled: !!currentUserEmail
  })
  
    return (
        <div>
            
        </div>
    );
};

export default CartItems;