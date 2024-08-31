import {Router} from "express";
import { otpSender, otpVerifier, registerUser } from "../controllers/user.controller.js"
const router = Router();

router.route("/").get(
        (req, res) =>{
            res.json({ message: 'Hello from the backend!' });
        }
);

router.route("/register/send-otp").post(otpSender);

router.route("/register/verify-otp").post(otpVerifier);

router.route("/register").post(registerUser);

export default router;

