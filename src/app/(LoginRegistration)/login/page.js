import Image from 'next/image';
import React from 'react';
import loginImg from "../../../images/loginImg.jpg";
import logo from "../../../images/tech_gear_logo.png";
import LoginForm from '@/components/Login/LoginForm';
import SocialLogin from '@/components/SocialLogin/SocialLogin';

const Login = () => {
    return (
        <div className='bg-gradient-to-r from-[#111111] to-[#616161] min-h-screen flex items-center'> 
            <div className='w-[1200px] mx-auto flex rounded-2xl overflow-hidden shadow-lg py-12'>
                {/* Image Section */}
                <div className='relative w-[50%]'>
                    <Image
                        src={loginImg}
                        alt="Login"
                        fill
                        className='object-cover rounded-l-2xl'
                    />
                </div>

                {/* Form Section */}
                <div className='bg-white w-[50%] px-12 py-12 flex flex-col justify-center rounded-r-2xl'>
                    <Image className='w-[100px] mb-6' src={logo} alt='logo' />
                    <h1 className='text-[#111111] font-bold text-[30px]'>Welcome Back!</h1>
                    <p className='text-[#111111] mt-3 font-medium text-[16px]'>
                        Please Login to continue browsing and purchase your desired Gear
                    </p>
                    <LoginForm />

                    <p className='text-center mt-6 font-semibold text-[#111111]'>Or Login as With</p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;
