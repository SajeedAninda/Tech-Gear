import AdminSidebar from '@/components/Admin/AdminSidebar';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const AdminPanelLayout = ({ children }) => {
    return (
        <div>
            <Toaster />
            <div className='flex justify-between w-screen bg-gradient-to-r from-[#616161] to-[#111111]  p-10 h-screen'>
                <div className='w-[20%]'><AdminSidebar></AdminSidebar></div>
                <div className='w-[80%]'>{children}</div>
            </div>
        </div>
    );
};

export default AdminPanelLayout;