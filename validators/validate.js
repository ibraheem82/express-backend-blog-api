const {validationResult} = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = {}
    // console.log(errors);
    // next();


    // This code checks if there are any validation errors by examining the length of the errors.errors object.
// If there are no errors (length is 0), the middleware calls next(), allowing the request to proceed to the next middleware or route handler.
// If there are errors, the code continues to the else block.
    if(Object.keys(errors.errors).length === 0){
        next();
    } else{

        // For each error, it creates a key-value pair in mappedErrors. The key is the field name (error.path) where the error occurred, and the value is the error message (error.msg).
        errors.errors.map((error) => {
            mappedErrors[error.path] = error.msg
        });


        // It sends a JSON response containing the mappedErrors object, which provides users with specific information about the validation errors encountered.

        res.status(400).json(mappedErrors)
    }
    
};

module.exports = validate;