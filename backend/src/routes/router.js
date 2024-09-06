import {Router} from "express";
import { otpSender, otpVerifier, passwordLogin, registerUser } from "../controllers/user.controller.js"
const router = Router();

router.route("/").get(
        (req, res) =>{
            res.json({ message: 'Hello from the backend!' });
        }
);

router.route("/register/send-otp").post(otpSender);

router.route("/register/verify-otp").post(otpVerifier);

router.route("/register").post(registerUser);
router.route("/login/password-login").post(passwordLogin);

export default router;

