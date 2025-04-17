const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../utils/googleConfig');
const UserModel = require('../models/userModel');


const googleLogin = async (req , res) =>{

    try{
        const { code } = req.query;
        console.log(code);
        if(!code){
            return res.status(400).json({
                message : 'No code provided!'
            })
        }
        const googleRes = await oauth2Client.getToken(code); 
        oauth2Client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);

        const {email , name , picture} = userRes.data;
        console.log('Google User Info:', userRes.data);

        let user = await UserModel.findOne({email});
        if(!user){
            user = await UserModel({
                name,
                email,
                image : picture
            })
            await user.save();
        }
        const{ _id } = user;
        const token = jwt.sign({_id , email} , process.env.JWT_SECRET , {expiresIn : '1d'});

        return res.status(200).json({
            message : 'Login Successfull!',
            token,
            user
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message : 'Internal Server Error',
            error : error.message
        })

    }
}

module.exports = {
    googleLogin
}