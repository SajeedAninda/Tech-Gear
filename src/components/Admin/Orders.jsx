import React from 'react';
import useAxiosInstance from '../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';

const Orders = () => {
    let axiosInstance = useAxiosInstance()
  const {
    data: orders,
    isLoading: isOrdersLoading,
    refetch
  } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/allOrders`)
      return response.data
    }
  })

    return (
        <div>
            
        </div>
    );
};

export default Orders;