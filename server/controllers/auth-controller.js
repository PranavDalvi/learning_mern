const User = require("../models/user-model");

const home = async (req, res) => {
    try {
        res.status(200).send("Hello World");
    } catch (error){
        console.error(error);
    }
};

// Registration Logic

const register = async (req, res) => {
    try{
        const {username, email, phone, password} = req.body;

        const userExist = await User.findOne({email:email})

        if(userExist){
            return res.status(400).json({msg:"email already exists"});
        }

        const userCreated = await User.create({username, email, phone, password})

        res.status(201).send({
            msg:"User Added", 
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error){
        res.status(400).send({message:error});
    }
}

// Login Logic
const login = async (req, res) =>{
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({email});

        if(!userExist){
            return res.status(400).json({msg:"Invalid Credentials"});
        }

        // NOTE TO SELF: Finout how function is call on line below
        const isPwdValid = await userExist.comparePwd(password)
        if(isPwdValid){
            res.status(200).json({
                msg:"Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            })
        } else {
            res.status(401).json({msg:"Invalid Credentials"});
        }
    } catch (error){
        console.log(error)
        res.status(500).json("internal server error");
    }
    
}

module.exports = {home, register, login};