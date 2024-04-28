const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
});

// middleware
// Pre-methord
// pwd hash
// this function run whe storing user data into db
userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')){
        next();
    }
    try {
        // hash the pwd
        const saltRound= await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(user.password, saltRound);
        user.password = hashPwd;
    } catch (error){
        next(error);
    }
});

// Compare the password
userSchema.methods.comparePwd = async function(password) {
    return bcrypt.compare(password, this.password);
}

// Generate json web token
userSchema.methods.generateToken = function() {
    try{
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        }
    );
    } catch (error){
        console.error(error);
    }
}; 

const User = new mongoose.model("User", userSchema);

module.exports = User;