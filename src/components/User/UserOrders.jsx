'use client'
import React from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosInstance from '../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';

const UserOrders = () => {
     const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email
  const axiosInstance = useAxiosInstance()

   const {
    data: userOrders,
    isLoading: isOrdersLoading,
    refetch
  } = useQuery({
    queryKey: ['userOrders', currentUserEmail],
    queryFn: async () => {
      const response = await axiosInstance.get(`/userOrders/${currentUserEmail}`)
      return response.data
    },
    enabled: !!currentUserEmail
  })

  console.log(userOrders);


    return (
        <div>
            
        </div>
    );
};

export default UserOrders;