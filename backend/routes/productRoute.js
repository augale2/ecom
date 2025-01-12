import express from "express"
import { singleProduct, listProducts } from "../controllers/productController.js";

const productRouter = express.Router();


productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);

export default productRouter;