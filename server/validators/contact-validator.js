const {z} = require("zod");

// creating an object schema

const contactSchema = z.object({
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

    message:z
    .string({required_error:"Message cannot be empty"})
    .trim()
    .min(5, {message:"Message is to short"})
    .max(255, {message:"Message cannot exceed 255 characters"})
})

module.exports = contactSchema;