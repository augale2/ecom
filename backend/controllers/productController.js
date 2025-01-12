import productModel from "../models/productModel.js";

const listProducts = async (req,res)=>{
    try{
        const products = await productModel.find();
        res.json({
            success: true,
            products
        })
    }catch(error){
        console.log(error);
        res.kson({
            success: false,
            message:error.message
        })
    }
}

const singleProduct = async (req,res)=>{
    try{

        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success: true, product});

    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export {listProducts, singleProduct};