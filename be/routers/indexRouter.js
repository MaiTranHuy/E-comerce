import accountRouter from "./accountRouter.js"
import userRouter from "./userRouter.js"
import productRouter from "./productRouter.js"
import productCategoryRouter from "./productCategoryRouter.js"
import brandRouter from "./brandRouter.js"
import couponRouter from "./couponRouter.js"
import blogRouter from "./blogRouter.js"
import blogCategoryRouter from "./blogCategoryRouter.js"
import orderRouter from "./orderRouter.js"
import {errorHandler,notFound} from "../middlewares/errorHandle.js"

const initRouters = (app) => {
    app.use('/api/account', accountRouter)
    app.use('/api/users', userRouter)
    app.use('/api/products', productRouter)
    app.use('/api/productcategory', productCategoryRouter)
    app.use('/api/brand', brandRouter)
    app.use('/api/coupon', couponRouter)
    app.use('/api/blogs', blogRouter)
    app.use('/api/blogcategory', blogCategoryRouter)
    app.use('/api/order', orderRouter)


    app.use(notFound)
    app.use(errorHandler)
}

export default initRouters