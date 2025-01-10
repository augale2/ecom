import express from "express"

const productRouter = express.Router();


productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);

export default productRouter;