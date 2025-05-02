import Image from 'next/image';
import React from 'react';
import loginImg from "../../../images/loginImg.jpg";
import logo from "../../../images/tech_gear_logo.png";
import LoginForm from '@/components/Login/LoginForm';

const Login = () => {
    return (
        <div className='bg-gradient-to-r from-[#111111] to-[#616161]'>
            <div className='w-[1200px] mx-auto h-screen py-12'>
                <div className='w-full flex justify-between items-center h-full'>
                    <div className='ImgDiv w-[50%] relative h-full rounded-l-2xl'>
                        <Image
                            src={loginImg}
                            alt="Login"
                            fill
                            className='object-cover rounded-l-2xl'
                        />
                    </div>

                    <div className='bg-white w-[50%] px-12 py-8 rounded-r-2xl'>
                        <Image className='w-[100px]' src={logo} alt='logo'></Image>
                        <h1 className='text-[#111111] font-bold text-[30px]'>Welcome Back!</h1>
                        <p className='text-[#111111] mt-3 font-medium text-[16px]'>Please Login to continue browsing and purchase your desired Gear</p>

                        <LoginForm></LoginForm>
                    </div>
                </div>

                <div></div>
            </div>
        </div>
    );
};

export default Login;
