import React, {useContext, useEffect, useState} from 'react'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevance');

  const toggleCategory = (e)=>{
    console.log(e.target.value);

    if(category.includes(e.target.value)){
      setCategory((prev)=>prev.filter((val)=> val !== e.target.value));
    }else{
      setCategory(prev=>[...prev, e.target.value]);
    }
  }

  const toggleSubCatgeory = (e)=>{
    console.log(e.target.value);
    if(subCategory.includes(e.target.value)){
      setSubCategory((prev)=>prev.filter((val)=>val!==e.target.value))
    }else{
      setSubCategory((prev)=>[...prev, e.target.value]);
    }
  }

  const sortProduct = ()=>{
    const fcopy = filterProducts.slice();

    switch(sortType){
      case 'low-high':
        setFilterProducts(fcopy.sort((a,b)=>(a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fcopy.sort((a,b)=>(b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }


  const applyFilter = () =>{
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }


    if(category.length>0){
      productsCopy = productsCopy.filter((pro)=>category.includes(pro.category));
    }

    if(subCategory.length>0){
      productsCopy = productsCopy.filter((pro)=>subCategory.includes(pro.subCategory));
    }

    setFilterProducts(productsCopy)

  }
  
  const sortHandler = (e)=>{
    setSortType(e.target.value);
  }

  useEffect(()=>{
    applyFilter();
    console.log(category)
  },[category, subCategory,products, search, showSearch])

  useEffect(()=>{
    sortProduct();
  },[sortType])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Left side */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon}/>
        </p>
        {/* Category Filter */}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type='checkbox' value={'Men'} className='w-3' onChange={toggleCategory}/> Men
              </p>
              <p className='flex gap-2'>
                <input type='checkbox' value={'Women'} className='w-3' onChange={toggleCategory}/> Women
              </p>
              <p className='flex gap-2'>
                <input type='checkbox' value={'Kids'} className='w-3' onChange={toggleCategory}/> Kids
              </p>
            </div>
        </div>

        {/* Subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' value={'Topwear'} onChange={toggleSubCatgeory}/> Topwear

            </p>
            <p className='flex gap-2'>
              <input type='checkbox' value={'Bottomwear'} onChange={toggleSubCatgeory}/> Bottomwear

            </p>
            <p className='flex gap-2'>
              <input type='checkbox' value={'Winterwear'} onChange={toggleSubCatgeory}/> Winterwear

            </p>
          </div>

        </div>


      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex flex-col md:flex-row lg:flex-row justify-between text-base sm:text-2xl mb-4 '>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          <select onChange={sortHandler} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevance">Sort By: Relevance</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }

        </div>


      </div>

      
    </div>
  )
}

export default Collection
