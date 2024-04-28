const {z} = require("zod");

// creating an object schema

const signupSchema = z.object({
    username:z
    .string({required_error:"Username is required"})
    .trim()
    .min(3,{message:"Username must be atleast of 3 chars"})
    .max(255, {message:"Username must not be more than 255 chars"}),

    email:z
    .string({required_error:"E-mail is required"})
    .trim()
    .email({message:"Invalid E-mail address"})
    .min(3,{message:"E-mail must be atleast of 3 chars"})
    .max(255, {message:"E-mail must not be more than 255 chars"}),

    phone:z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{message:"Invalid Phone No."})
    .max(10, {message:"Invalid Phone No."}),

    password:z
    .string({required_error:"Password is required"})
    .min(6,{message:"Password must be at least of 6 characters"})
    .max(1024, {message:"Password can't be greater than 1024 characters"}),

})

module.exports = signupSchema;