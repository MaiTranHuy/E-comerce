import express from "express";
import accountController from "../controllers/accountController.js";
const router = express.Router();

router.post("/register", accountController.registerController);

router.get("/finalregister/:token", accountController.finalRegisterController);

router.post("/login", accountController.loginController);

router.post("/logout", accountController.logoutController);

router.post("/refreshtoken", accountController.refreshAccessTokenController);

router.post("/forgotpassword", accountController.forgotPasswordController);

router.put("/resetpassword", accountController.resetPasswordController);

export default router;
