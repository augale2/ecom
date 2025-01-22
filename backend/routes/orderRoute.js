import authUser from "../middleware/auth.js";
import express from "express";

import {placeOrder, allOrders, userOrders, updateStatus, placeOrderStripe, verifyStripe, placeOrderRazorpay, verifyRazorpay} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.get('/list',adminAuth ,allOrders);
orderRouter.post('/userorders', authUser, userOrders);
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/status', adminAuth, updateStatus);

orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/verifyStripe',authUser, verifyStripe)

// orderRouter.post('/razorpay')

orderRouter.post('/razorpay',authUser,placeOrderRazorpay)
orderRouter.post('/verifyRazorpay',authUser, verifyRazorpay)


export default orderRouter;