import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Toaster />
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default DefaultLayout;