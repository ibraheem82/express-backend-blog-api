const {User} = require("../models");

const hashPassword = require("../utils/hashPassword")
const signup = async(req, res, next) => {
    try {
        const {name, email, password, role} = req.body;
   
        const isEmailExists = await User.findOne({email});
        if(isEmailExists){
            res.code = 400;
            throw new Error("Email already exist.") 
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({name, email, password:hashedPassword, role})
        await newUser.save();

        res.status(201).json({code: 201, status:true, message: "User registererd successfully"})
    } catch (error) {
        next(error)
    }
}

module.exports = {signup}