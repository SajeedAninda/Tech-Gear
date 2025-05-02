import SocialLogin from '@/components/SocialLogin/SocialLogin';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import registerImg from "../../../images/registerImg.jpg";
import RegisterForm from '@/components/Register/RegisterForm';

const Register = () => {
    return (
        <div className='bg-gradient-to-r from-[#111111] to-[#616161] min-h-screen flex items-center'>
            <div className='w-[1200px] mx-auto flex rounded-2xl overflow-hidden shadow-lg py-12'>
                <div className='w-[50%] bg-white px-12 md:px-24 py-16'>
                    <div className='mt-8'>
                        <h2 className='text-3xl text-[#111111] font-bold'>Register</h2>
                        <p className='mt-3 text-[#111111]'>Please fill the form to complete your Registration</p>
                    </div>

                    <RegisterForm></RegisterForm>

                    <p className='text-center mt-6 text-[#111111]'>Or Register With</p>
                    <SocialLogin></SocialLogin>

                    <p className='text-center mt-6 text-[#111111]'>Already have any Account? <Link className='text-[#111111] font-bold hover:underline' href={"/login"}>Login</Link></p>
                </div>

                <div className='w-[50%] hidden lg:inline-block'>
                    <Image className='w-full object-cover h-full' src={registerImg} alt='login image'></Image>
                </div>
            </div>
        </div>
    );
};

export default Register;