import authUser from "../middleware/auth.js";
import express from "express";

import {placeOrder, allOrders, userOrders} from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.get('/list', allOrders);
orderRouter.post('/userorders', authUser, userOrders);
orderRouter.post('/place',authUser,placeOrder)

export default orderRouter;