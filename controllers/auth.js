const {User} = require("../models")
const signup = async (req, res, next) => {
    try {
        const {name, email, password, role} = req.body;
        // if(!name){
        //     res.code = 400;
        //     throw new Error("Name is required");
        // }

        // if(!email){
        //     res.code = 400;
        //     throw new Error("Email is required");
        // }

        // if(!password){
        //     res.code = 400;
        //     throw new Error("Password is required");
        // }

        // if(password.length < 6){
        //     res.code = 400;
        //     throw new Error("Password should be 6 char long.");
        // }



        // DO THIS INSTEAD 

        const isEmailExists = User.findOne({email});
        if(isEmailExists){
            res.code = 400;
            throw new Error("Email already exist") 
        }
        const newUser = new User({name, email, password, role})
        await newUser.save();

        res.status(201).json({code: 201, status:true, message: "User registererd successfully"})
    } catch (error) {
        next(error)
    }
}

module.exports = {signup}


