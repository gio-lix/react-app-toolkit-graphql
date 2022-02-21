import React from 'react';
import Cart from "../components/Cart";

const Order = () => {
    return (
        <div className='mt-20'>
            <h5 className='font-raleway font-bold text-4xl'>Cart</h5>
            <div className='mt-[59px]'>
                <Cart />
            </div>
        </div>
    );
};

export default Order;
