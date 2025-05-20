import AllProducts from '@/components/Shopping/AllProducts';
import React from 'react';

const page = () => {
    return (
        <div className='my-12 w-[1200px] mx-auto'>
            <h3 className='text-[#111111] text-[30px] font-bold'>Shop For Tech Products!</h3>
            <h4 className='text-[#555555] text-[18px] font-medium'>Explore Our Wide Range of the Latest Gadgets and Innovations</h4>
            <AllProducts></AllProducts>
        </div>
    );
};

export default page;