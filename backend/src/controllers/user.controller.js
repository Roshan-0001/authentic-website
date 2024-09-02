import { User } from "../models/user.model.js";
import nodemailer from 'nodemailer';
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asynhandaler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { otpStorage  } from "../constant.js";
import OTPGenerator from 'otp-generator';


// registration of the user 
const registerUser = asyncHandler(
    async(req, res) => {
        //to get the data from the frontend..
        const { username , email , password } = req.body;
    
        //to validate any of the field is missing or not..
        if(
            [username , email , password].some((feild)=>feild?.trim() === "")
        ){
            return res.status(400).json(
                new ApiError(400, this , "All feilds are required" )
            );
        }
    
        // checking user is already existed or not..
        const existedUser = await User.findOne({
            $or: [{username},{email}]
        })
    
        if(existedUser){
            return res.status(409).json(
                new ApiError(409,this,"user already existed" )
            );
        }

        
    
        const user = await User.create({
            email,
            password,
            username: username.toLowerCase()
        })
    
        // checks for user creation
        const userCreated = await User.findById(user.id).select("-password")
    
        if(!userCreated){ 
            return res.status(406).json(
                new ApiError(406, this ,"something went wrong while creating user")
            );
        }else{
        console.log("user registered successfully from beckend -----" , userCreated);
        }
    
        //return response
        return res.status(201).json(
            new ApiResponse(201, userCreated, "user created successfully" )
        );
        
    }
)

const otpSender = asyncHandler(
    async(req, res) =>{
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or another service like 'hotmail', 'yahoo', etc.
            host: 'smtp.gmail.com',
            port: 465,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const email = req.body.email;

        const otp = OTPGenerator.generate(6, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false});
        

        

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}`
        };

        transporter.sendMail(mailOptions,(error, info)=>{
            if(error) {
                console.log(error);
                // throw new ApiError(400, "Error sending otp", error);
                return res.status(500).json(
                    new ApiError(500, error, "failed to send otp")
                );
                
            } else {
            res.status(200).json(
                new ApiResponse(201, 'otp sended successfully')
            );
            otpStorage[email] = otp;
            console.log('otp sended',otpStorage);
            }
        });


    }
)

const otpVerifier = asyncHandler(
    async (req, res) =>{
        const data = req.body;
        const data2 = JSON.stringify(data);
        console.log(data2);
        const{ email, otp} = data;
        let user = await User.find({email});
        console.log(user);
        

        // if(user[0].isVerified){
        //     res.status(200).json(
        //         new ApiResponse(300, user, "user allready verified")
        //     );
        // } else
         if (otpStorage[email] === otp){
            delete otpStorage[email];

            user = await User.updateOne({_id: user[0]._id}, { $set: { isVerified: true } });
            res.status(200).json(
                new ApiResponse(200, user, "user verified successfully")
            );
        } else {
            res.status(400).send('Invalid otp');
        }
    }
)


export  {registerUser, otpSender, otpVerifier};