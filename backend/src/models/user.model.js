import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type: "string",
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },

        email:{
            type: "string",
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password:{
            type: "string",
            require: [true, "password is require"]
        },
        isVerified:{
            type: "boolean",
            default: false
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save" , async function() {
    this.password = await bcrypt.hash(this.password, 10)
})



export const User = mongoose.model("User", userSchema);