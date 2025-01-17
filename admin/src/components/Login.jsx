import axios from 'axios'
import React, {useState} from 'react'

import {backendUrl} from '../App'
import {toast} from 'react-toastify'


const Login = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) =>{
        try{
            e.preventDefault();
            console.log("Hello ", email, password)
            const response = await axios.post(backendUrl + '/ugle/user/admin', {email,password});
            console.log(response)
            if(response.data.success){
                setToken(response.data.token);
            }else{
                toast.error(response.data.message);
            }
        }catch(e){
            console.log(e);
            toast.error(e.message)
        }
    }


  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-grey shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Ugle - Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' placeholder='your@email.com' required/>
                </div>

                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' placeholder='Enter password' required/>
                </div>
                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-[#990011]' type="submit">Login</button>

            </form>
        </div>
      
    </div>
  )
}

export default Login
