import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{

    const currency = '$'
    const delivery_fee = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // const [products, setProducts] = useState([]);
    
    const addToCart = async (itemId, size)=>{
        if(!size){
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if(token){
            try{
                await axios.post(backendURL+ '/ugle/cart/add', {
                    itemId,
                    size
                },{
                    headers:{token}
                })
            }catch(e){
                console.log(e)
                toast.error(e)

            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;

        // const cartItems = {
        //     "item1": { "M": 2, "L": 1 },
        //     "item2": { "S": 3 }
        // };
        console.log(cartItems);

        for(const items in cartItems){
            for(const item in cartItems[items]){
                if(cartItems[items][item]>0){
                    totalCount+= cartItems[items][item];
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity)=>{
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if(token){
            try{
                await axios.post(backendURL + '/ugle/cart/update', {
                    itemId,
                    size,
                    quantity
                },{
                    headers: {
                        token
                    }
                })
            }catch(e){
                console.log(e);
                toast.error(e.message);
            }
        }

    }

    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items);
            for(const item in cartItems[items]){
                if(cartItems[items][item]>0){
                    totalAmount+= itemInfo.price * cartItems[items][item]
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async ()=>{
        try{
            console.log(backendURL)

            const response = await axios.get(backendURL + '/ugle/product/list');
            console.log(response)
            if(response.data.success){
                setProducts(response.data.products.reverse());
            }else{
                toast.error(response.data.message);
            }

        }catch(e){
            console.log(e);
            toast.error(e.message);
        }
    }

    const getUserCart = async (token)=>{
        try{

            const response = await axios.post(backendURL + '/ugle/cart/get',{}, {
                headers:{token}
            })
            console.log(response)
            if(response.data.success){
                setCartItems(response.data.cartData);
            }

        }catch(e){
            console.log(e);
            toast.error(e.message);
        }
    }

    useEffect(()=>{
        getProductsData()
    },[]);

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
        console.log("Cartttttt", token)

        if(token){
            getUserCart(token);
        }

    },[token]);


    const value = {
        products, currency, delivery_fee, token,
        search, setSearch, showSearch, setShowSearch, navigate, addToCart,
        cartItems, setCartItems, getCartAmount,
        setToken, backendURL, getCartCount, updateQuantity
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;