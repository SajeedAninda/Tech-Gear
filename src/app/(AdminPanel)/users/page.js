import Users from '@/components/Admin/Users';
import React from 'react';

const page = () => {
    return (
        <div className='bg-white rounded-r-2xl px-10 py-8 h-full'>
            <h3 className='text-[#111111] text-[30px] font-bold'>All Users</h3>
            <Users></Users>
        </div>
    );
};

export default page;