const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {SECRET_KEY} = require('../util/config');

module.exports.getUser = async ( req, res, next) => {
    
    try {
        const result = await User.fetchAllUser();
        res.json({
            message : "Hello From User!",
            users : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
};

module.exports.postUser = async (req,res,next) => {

    const fristName = req.body.frist_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;

    // steps
    // 1. validate user data
    
    try {
        // 2. check if this user already exists or not
        const isPresent = await User.isPresent('user_email' , email);
        if(isPresent){
            const err = new Error("User is already exists, try with different email");
            err.statusCode = 422;
            throw err;
        }

        // 3. create new user with hashed password
        const hashPass = await bcrypt.hash(password,12);
        const user = new User({
            user_fname : fristName,
            user_lname : lastName,
            user_email : email,
            user_password : hashPass
        })
        const result = await user.save();
        const createdUser = result.rows[0];


        // 4. create jwt token and send it to response
        const token = jwt.sign({
                userId : createdUser.id,
                emial : createdUser.user_email
        } , SECRET_KEY );
        createdUser.token = token;
        
        return res.status(201).json({
            message : "User created!",
            user : createdUser
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
    
}

module.exports.loginUser = async (req,res,next) => {
    
    const email = req.body.email;
    const password = req.body.password;

    try {

        // 1. check email and password
        const result = await User.find( 'user_email' , email);
    
        if(result.rows.length === 0) {
            const err = new Error("User not found!");
            err.statusCode = 401;
            throw err;
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare( password , user.user_password );

        if(!isMatch){
            const err = new Error("Enter valid email or password");
            err.statusCode = 401;
            throw err;
        } 

        // 2. If valid email and password then send auth token
        const token = jwt.sign({
            userId : user.id,
            email : user.user_email
        } , SECRET_KEY );
        
        return res.status(200).json({
            message : "User logged in!",
            user : {
                id : user.id,
                token : token,
                user_email : user.user_email,
                user_fname : user.user_fname,
                user_lname : user.user_lname
            }
        })
        
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.putUser = async (req,res,next) => {
    const fristName = req.body.frist_name;
    const lastName = req.body.last_name;

    // 1. input validation
    try {
        
        // 2. update in database
        const result = await User.updateById(req.userId , { user_fname : fristName , user_lname : lastName});
        
        const updatedUser = result.rows[0];
        
        // 3. send response
        return res.status(200).json({
            message : "User updated",
            user : updatedUser
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }

}

module.exports.deleteUser = async (req,res,next) => {
    
    try {
         await User.deleteById(res.userId);
         return res.status(200).json({ message : "User Deleted"});
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}