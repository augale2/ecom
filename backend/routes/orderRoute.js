import authUser from "../middleware/auth.js";
import express from "express";

import {placeOrder, allOrders, userOrders} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.get('/list',adminAuth ,allOrders);
orderRouter.post('/userorders', authUser, userOrders);
orderRouter.post('/place',authUser,placeOrder)

export default orderRouter;