import UserProfile from '@/components/User/UserProfile';
import React from 'react';

const page = () => {
    return (
        <div className='bg-white rounded-r-2xl h-full px-10 py-8'>
            <h3 className='text-[#111111] text-[30px] font-bold'>User Profile</h3>
            <UserProfile></UserProfile>
        </div>
    );
};

export default page;