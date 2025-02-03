const userModel = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signUp = async (req,res) =>{
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({email});
        if(user) {
            return res.status(409)
            .json({message: 'user alredy exist', success:false});
        }
        const UserModel = new userModel({name, email, password});
        UserModel.password = await bcrypt.hash(password, 10);
        await UserModel.save();
        res.status(201)
            .json({
                message: 'signup succesfully',
                success:true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: 'Internal server error',
                success:false
            })
    }
}


const login = async (req,res) =>{
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email});
        const errorMsg = "Auth Failed! email or password wrong";
        if(!user) {
            return res.status(403)
            .json({message: errorMsg, success:false});
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if(!isPasswordEqual){
            return res.status(403)
            .json({
                message: errorMsg, success:false
            })
        }
        const jwtToken = jwt.sign(
            {email:user.email, _id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        res.status(201)
            .json({
                message: 'Login succesful.',
                success:true,
                jwtToken,
                email,
                name:user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: 'Internal server error',
                success:false
            })
    }
}

module.exports = {
    signUp,
    login
}