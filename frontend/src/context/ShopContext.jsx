import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{

    const currency = '$'
    const delivery_fee = 10;
    const backendURL = import.meta.env.BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // const [products, setProducts] = useState([]);
    
    const addToCart = async (itemId, size)=>{
        if(!size){
            console.log("Here")
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
    }

    const getCartCount = () => {
        let totalCount = 0;

        // const cartItems = {
        //     "item1": { "M": 2, "L": 1 },
        //     "item2": { "S": 3 }
        // };

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
                await axios.post(backend + '/ugle/cart/update', {
                    itemId,
                    size,
                    quantity
                },{
                    headers: {
                        token
                    }
                })
            }catch(e){
                console.log(error);
                toast.error(error.message);
            }
        }

    }


    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch, navigate, addToCart,
        token, setToken, backendURL
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;