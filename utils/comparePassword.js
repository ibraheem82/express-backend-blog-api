const bcrypt = require("bcryptjs");

const comparePassword = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
}


module.exports = comparePassword