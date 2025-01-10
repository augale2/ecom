import express from "express"


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', logingUser);
userRouter.post('/admin',adminLogin);


export default userRouter;