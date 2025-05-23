'use client'
import React from 'react';
import useAxiosInstance from '../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';

const Users = () => {
    let axiosInstance = useAxiosInstance()

  const {
    data: userData,
    isLoading: isUsersLoading,
    refetch
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/allUsers`)
      return response.data
    }
  })

  console.log(userData);


    return (
        <div>
            
        </div>
    );
};

export default Users;