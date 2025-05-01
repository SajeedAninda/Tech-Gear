import React from 'react';
import whyTechGearImg from "../images/Why_Tech_Gear.png";
import Image from 'next/image';

const WhyTechGear = () => {
    return (
        <div className='my-20 w-[1200px] mx-auto'>
            <div className=''>
            <Image className='w-full object-cover rounded-xl' src={whyTechGearImg} alt='why tech gear image'></Image>
            </div>
        </div>
    );
};

export default WhyTechGear;