const {User} = require("../models")
const signup = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const newUser = new User({name, email, password})
        await newUser.save();

        res.status(201).json({message: "User registererd successfully"})
    } catch (error) {
        next(error)
    }
}

module.exports = {signup}


