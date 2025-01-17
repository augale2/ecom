import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
        <img src={assets.red_star} alt=""/>
        <p className='text-[#990011]'>
            {text1}
            <span className='ml-2 text-[#660009] font-medium'>{text2}</span>
        </p>
        <img src={assets.red_star} alt=""/>
    </div>
  )
}

export default Title
