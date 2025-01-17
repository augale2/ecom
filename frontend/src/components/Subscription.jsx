import React from 'react'

const Subscription = () => {

    const onSubmitHandler = (event)=>{
        event.preventDEfault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-[#990011]'>
            Subscribe now and get 15% off
        </p>
        <p className='mt-3 text-gray-500'>
            Subscribe to our newsletter and get 15% off and free shipping on your first purchase.
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border'>
            <input className='w-full sm:flex-1 outline-none pl-3' type='email' placeholder='Enter your email here...' required/>
            <button className='bg-[#990011] text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
      
    </div>
  )
}

export default Subscription
