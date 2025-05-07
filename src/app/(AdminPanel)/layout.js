import AdminSidebar from '@/components/Admin/AdminSidebar';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const AdminPanelLayout = ({ children }) => {
    return (
        <div>
            <Toaster />
            <div className='flex justify-between'>
                <div className='w-[25%]'><AdminSidebar></AdminSidebar></div>
                <div className='w-[75%]'>{children}</div>
            </div>
        </div>
    );
};

export default AdminPanelLayout;