import {Router} from "express";
import { otpLogin, otpSender, otpVerifier, passwordLogin, registerUser } from "../controllers/user.controller.js"
const router = Router();

router.route("/").get(
        (req, res) =>{
            res.json({ message: 'Hello from the backend!' });
        }
);

router.route("/register").post(registerUser);
router.route("/register/send-otp").post(otpSender);
router.route("/register/verify-otp").post(otpVerifier);
router.route("/login/password-login").post(passwordLogin);
router.route("/login/otp-login").post(otpLogin);
router.route("/login/otp-login/send-otp").post(otpSender);
router.route("/login/otp-login/verify-otp").post(otpVerifier);

export default router;

