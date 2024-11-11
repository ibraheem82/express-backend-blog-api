const bcrypt = require("bcryptjs");


const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (error, salt) => { // generate hashes
            if(error){
                return reject(error)
            }

            bcrypt.hash(password, salt, (error, hash) => { // hash password using salt 
                if(error){
                    return reject(error)
                }
                resolve(hash)
            });
        });
    });
};

module.exports = hashPassword;