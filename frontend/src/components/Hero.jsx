import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-200 bg-[#660009]'>
        {/*Hero left side*/}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#FAF9F6]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'>
                    </p>
                    <p className='font-medium text-sm md:text-base'>NEW COLLECTIONS</p>
                </div>
                
                <h1 className='playfair-display-hello text-3xl sm:py-3 lg:text-5xl leading-relaxed'>CHRISTMAS SALE</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibond text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                </div>
            </div>
        </div>
        {/*Hero right side*/}
        <img className='w-full sm:w-1/2' src={assets.hero} alt=""/>
    </div>
  )
}

export default Hero
