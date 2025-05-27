import CartItems from '@/components/User/CartItems';
import React from 'react';

const page = () => {
    return (
        <div className='bg-white rounded-r-2xl px-10 py-8 h-full'>
            <h3 className='text-[#111111] text-[30px] font-bold'>Your Cart</h3>
            <h3 className='text-[#111111] text-[20px] mt-3 font-bold'>See the products you have added to your cart</h3>
            <CartItems></CartItems>
        </div>
    );
};

export default page;