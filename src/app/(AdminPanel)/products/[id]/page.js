import UpdateProduct from '@/components/Admin/UpdateProduct';
import React from 'react';

const page = ({ params }) => {
    return (
        <div className='bg-white rounded-r-2xl px-10 py-8 h-fit'>
            <h3 className='text-[#111111] text-[30px] font-bold'>Update Product</h3>
            <UpdateProduct params={params}></UpdateProduct>
        </div>
    )
};

export default page;