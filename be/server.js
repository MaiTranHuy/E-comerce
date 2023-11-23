import express from "express";
import dotenv from "dotenv";

import connect from "./config/dbConnect.js";
import initRouters from "./routers/indexRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
connect();

initRouters(app)


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on the port: ${port}`);
});
