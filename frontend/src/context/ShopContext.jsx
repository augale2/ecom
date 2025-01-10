import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{

    const currency = '$'
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    // const [products, setProducts] = useState([]);
    
    const addToCart = async (itemId, size)=>{
        console.log("Hellllo", size)
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

    
    
    const navigate = useNavigate();

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch, navigate, addToCart
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;