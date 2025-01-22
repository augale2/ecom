
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import Stripe from 'stripe';
import razorpay from 'razorpay';

const currency = 'inr'
const deliveryCharge = 1

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


const allOrders = async (req, res)=>{
    try{
        const orders = await orderModel.find();
        res.json({
            success: true,
            orders
        })

    }catch(e){
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
}

const userOrders = async (req,res)=>{
    try{
        const { userId } = req.body;
        const orders = await orderModel.find({userId});

        res.json({
            success: true,
            orders
        })

    }catch(e){
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
}

// Orders can be placed with cash on delivery.

const placeOrder = async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items, 
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save({session});

        await userModel.findByIdAndUpdate(userId, {
            cartData: {}
        },
        {session});

        await session.commitTransaction();
        session.endSession();

        res.json({
            success: true,
            message: "Order Placed!"
        })

    }catch(e){
        await session.abortTransaction();
        session.endSession();
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }

}

const updateStatus = async (req,res)=>{
    try{

        const {orderId, status} = req.body;

        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message: 'Status Updated'})

    }catch(e){
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
}

const placeOrderStripe = async (req,res)=>{
    const sessionTr = await mongoose.startSession();
    sessionTr.startTransaction();
    try{
        
        const {userId, items, amount, address} = req.body;
        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save({session:sessionTr})

        const line_items = items.map((item)=>({
            price_data:{
                currency: currency,
                product_data: {
                    name:item.name,
                    images: item.image
                },
                unit_amount: item.price *100,
                
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency: currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment'
        })

        console.log("Committing");

        await sessionTr.commitTransaction();
        sessionTr.endSession();

        res.json({success:true, session_url: session.url});


    }catch(e){
        await sessionTr.abortTransaction();
        sessionTr.endSession();
        console.log("Here - ");
        res.json({
            success: false,
            message: e.message
        })
    }
}

const verifyStripe = async (req,res)=>{
    const {orderId, success, userId} = req.body
    try{
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            res.json({success: true})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Payment Failed"})
        }
    }catch(e){
        console.log("Nooo Here - ", e);
        res.json({success: false, message: e.message})
    }
}

const placeOrderRazorpay = async (req,res)=>{
    const sessionTr = await mongoose.startSession();
    sessionTr.startTransaction();
    try{

        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'Razorpay',
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save({session:sessionTr});

        const options = {
            amount: amount *100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, async (error, order)=>{
            if(error){
                console.log(error);
                await sessionTr.abortTransaction();
                sessionTr.endSession();
                


                return res.json({
                    success: false,
                    message: error
                })
            }
            await sessionTr.commitTransaction();
            sessionTr.endSession();
            
            res.json({
                success: true,
                order
            })
        })

    }catch(e){
        await sessionTr.abortTransaction();
        sessionTr.endSession();
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })

    }
}

const verifyRazorpay = async (req,res)=>{
    try{

        const {userId, razorpay_order_id} = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({ success: true, message: "Payment Successful" })
        }else{
            res.json({ success: false, message: 'Payment Failed' });
        }
    }catch(e){
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
}

export {placeOrder, allOrders, userOrders, updateStatus, placeOrderStripe, verifyStripe, placeOrderRazorpay, verifyRazorpay};