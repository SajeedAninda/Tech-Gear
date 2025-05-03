import React from 'react';
import { Toaster } from 'react-hot-toast';

const LoginRegistrationLayout = ({ children }) => {
    return (
        <div>
             <Toaster />
            {children}
        </div>
    );
};

export default LoginRegistrationLayout;