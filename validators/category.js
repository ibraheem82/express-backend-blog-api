const {check, param} = require("express-validator");
const mongoose = require("mongoose");
const addCategoryValidator = [
    check("title").notEmpty().withMessage("Title is required")
]

/*
id: Checks if the id parameter exists (to avoid errors when id is null or undefined).

mongoose.Types.ObjectId.isValid(id): This is a Mongoose utility function that checks if the id is a valid MongoDB ObjectId.

MongoDB ObjectIds are 12-byte hexadecimal strings (e.g., 507f1f77bcf86cd799439011).

If the id is not a valid ObjectId, the condition evaluates to true.

throw "Invalid category id":

If the id is invalid, the function throws an error with the message "Invalid category id".

This error will be caught by express-validator, and the validation will fail.

*/
const idValidator = [
    param("id").custom(async (id) => {
      if (id && !mongoose.Types.ObjectId.isValid(id)) {
        throw "Invalid category id";
      }
    }),
  ];
module.exports = {addCategoryValidator, idValidator};