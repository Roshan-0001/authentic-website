
import { MongoClient , ServerApiVersion } from "mongodb";

import mongoose from "mongoose";

const connectDB= async() =>{
    try{
        const connectionInstance=  await mongoose.connect(process.env.URL)
        console.log(`MongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
        
    } catch(error){
        console.log("MONGODB connection eroor", error);
        process.exit(1);
    }
}

export default connectDB;