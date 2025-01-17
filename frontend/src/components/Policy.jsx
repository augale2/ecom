import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row text-center gap-12 sm:gap-2 justify-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        
        <div>
            <img src={assets.exchange_icon} className='w-14 m-auto mb-4' alt=""/>
            <p className='font-semibold text-[#990011]'>Easy Exchanges</p>
            <p className='text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate molestias iure. Dignissimos voluptates iste consectetur nulla quisquam nobis, dolorem est unde dolorum quia excepturi explicabo at consequatur sint? Sit.
            </p>
        </div>

        <div>
            <img src={assets.quality_icon} className='w-14 m-auto mb-4' ></img>
            <p className='font-semibold text-[#990011]'>15 Days Return Policy</p>
            <p className='text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam totam consequuntur, architecto officiis tenetur iusto adipisci molestias vel voluptate voluptatum ullam ea consectetur possimus accusantium eius vitae nihil saepe suscipit!  
            </p>
        </div>
            
        <div>
            <img src={assets.support_img} className='w-14 m-auto mb-4' ></img>
            <p className='font-semibold text-[#990011]'>24/7 Customer Support</p>
            <p className='text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nobis nam quaerat mollitia consectetur corporis voluptas? Reiciendis laborum praesentium enim, ullam tempora quidem laboriosam nulla, qui dolorem provident voluptate delectus.
            </p>
        </div>
    </div>
  )
}

export default Policy
