
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const allOrders = async (req, res)=>{
    try{
        const orders = await orderModel.find();
        res.json({
            success: true,
            orders
        })

    }catch(error){
        console.log(error);
        res.json({
            success: false,
            message: error.message
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

    }catch(error){
        console.log(error);
        res.json({
            success: false,
            message: error.message
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
            paymenMethod: "COD",
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
            message: error.message
        })
    }

}


export {placeOrder, allOrders, userOrders};