import userRouter from "./userRouter.js"
import {errorHandler,notFound} from "../middlewares/errorHandle.js"

const initRouters = (app) => {
    app.use('/api/users', userRouter)


    app.use(notFound)
    app.use(errorHandler)
}

export default initRouters