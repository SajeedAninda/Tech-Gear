import React from 'react';
import useAllProducts from '../Hooks/useAllProducts';

const AllProducts = () => {
    let {products} = useAllProducts();
    console.log(products)
    return (
        <div>
            
        </div>
    );
};

export default AllProducts;