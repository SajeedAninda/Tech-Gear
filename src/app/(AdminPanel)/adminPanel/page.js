import Dashboard from '@/components/Admin/Dashboard';
import React from 'react';

const page = () => {
    return (
        <div className='bg-white rounded-r-2xl h-full px-10 py-8'>
           <h3 className='text-[#111111] text-[30px] font-bold'>Dashboard</h3>
           <Dashboard></Dashboard>
        </div>
    );
};

export default page;