import UserSidebar from '@/components/User/UserSidebar';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const UserLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gradient-to-r from-[#616161] to-[#111111] p-10">
            <Toaster />
            <div className="flex w-full">
                <div className="w-[20%] flex-grow h-full">
                    <UserSidebar></UserSidebar>
                </div>
                <div className="w-[80%] h-full">{children}</div>
            </div>
        </div>
    );
};


export default UserLayout;