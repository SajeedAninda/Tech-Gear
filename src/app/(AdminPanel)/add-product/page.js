import AddProduct from '@/components/Admin/AddProduct';
import React from 'react';

const page = () => {
    return (
        <div className='bg-white rounded-r-2xl px-10 py-8 h-fit'>
           <h3 className='text-[#111111] text-[30px] font-bold'>Add Product</h3>
           <AddProduct></AddProduct>
        </div>
    );
};

export default page;