import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios'

const Verify = () => {
    const {navigate, token, setCartItems, backendURL} = useContext(ShopContext)

    const [searchParams] = useSearchParams();
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async ()=>{
        try{

            if(!token){
                return null;
            }

            const response = await axios.post(backendURL + '/ugle/order/verifyStripe', {success, orderId}, {headers:{token}})

            if(response.data.success){
                setCartItems({})
                navigate('/orders')
            }else{
                navigate('/cart')
            }

        }catch(e){
            console.log(e)
            toast.error(e.message)

        }
    }
    useEffect(()=>{
        verifyPayment()
    },[token])


  return (
    <div>
      
    </div>
  )
}

export default Verify
