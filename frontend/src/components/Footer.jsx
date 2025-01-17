import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <p className='text-xl text-[#990011] font-medium mb-5'>Ugle</p>
                <p className='w-full md:w-3/4 text-gray-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nisi quaerat at nam sequi ut suscipit cum nulla aut. Veritatis ullam eveniet pariatur doloremque. Delectus quibusdam eos ullam rerum doloremque?
                </p>
            </div>

            <div>
                <p className='text-xl text-[#990011] font-medium mb-5'>
                    COMPANY
                </p>
                <ul className='flex flex-col gap-1 text-gray-500'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl text-[#990011] font-medium mb-5'>
                    GET IN TOUCH
                </p>
                <ul className='flex flex-col gap-1 text-gray-500'>
                    <li>+1 217-999-9999</li>
                    <li>augale2@illinois.edu</li>
                </ul>
            </div>

        </div>
        <div>
            <hr className='border-0 h-[1px] bg-[#660009]'/>
            <p className='py-5 text-sm text-center text-gray-500'>Copyright @ Ugle - All Rights Reserved</p>
        </div>

      
    </div>
  )
}

export default Footer
