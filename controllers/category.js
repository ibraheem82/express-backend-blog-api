const { Category, User } = require("../models");

const addCategory = async (req, res, next) => {
    try {
      const { title, desc } = req.body;
      const { _id } = req.user;
  
      const isCategoryExist = await Category.findOne({ title });
      if (isCategoryExist) {
        res.code = 400;
        throw new Error("Category already exist");
      }
  
      const user = await User.findById(_id);
      if (!user) {
        res.code = 404;
        throw new Error("User not found");
      }
  
      const newCategory = new Category({ title, desc, updatedBy: _id });
      await newCategory.save();
  
      res.status(200).json({
        code: 200,
        status: true,
        message: "Category added successfully",
      });
    } catch (error) {
      next(error);
    }
  };


  const updateCategory = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { _id } = req.user;
      const { title, desc } = req.body;
  
      const category = await Category.findById(id);
      if (!category) {
        res.code = 404;
        throw new Error("Category not found");
      }
  
      const isCategoryExist = await Category.findOne({ title });
      if (
        isCategoryExist &&
        isCategoryExist.title === title &&
        String(isCategoryExist._id) !== String(category._id)
      ) {
        res.code = 400;
        throw new Error("Title alraedy exist");
      }
  
      category.title = title ? title : category.title;
      category.desc = desc;
      category.updatedBy = _id;
      await category.save();
  
      res.status(200).json({
        code: 200,
        status: true,
        message: "Category updated successfully",
        data: { category },
      });
    } catch (error) {
      next(error);
    }
  };



  const deleteCategory = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const category = await Category.findById(id);
      if (!category) {
        res.code = 404;
        throw new Error("Category not found");
      }
  
      await Category.findByIdAndDelete(id);
  
      res.status(200).json({
        code: 200,
        staus: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };


  /*
    Example Request and Response
Request
URL: /categories?q=tech&size=5&page=2

Query Parameters:

q: tech (search term).

size: 5 (5 items per page).

page: 2 (second page). 




  */

  const getCategories = async (req, res, next) => {
    try {
      const { q, size, page } = req.query;
      let query = {};
  
      // Parse and Set Defaults for Pagination:
      const sizeNumber = parseInt(size) || 10;
      const pageNumber = parseInt(page) || 1;
  
      if (q) {
//         If a search query (q) is provided, it creates a case-insensitive regular expression (RegExp(q, "i")) to search for matches in the title or desc fields.

// The $or operator ensures that either field can match the search term.
        const search = RegExp(q, "i");
  
        query = { $or: [{ title: search }, { desc: search }] };
      }
  
      // Counts the total number of documents that match the query (for pagination).
      const total = await Category.countDocuments(query);

      // Determines the total number of pages based on the total documents and items per page.
      const pages = Math.ceil(total / sizeNumber);
  

//       Retrieves the categories that match the query.

// Skips the appropriate number of documents for pagination ((pageNumber - 1) * sizeNumber).

// Limits the results to sizeNumber items per page.

// Sorts the results by _id in descending order (most recent first).
      const categories = await Category.find(query)
        .skip((pageNumber - 1) * sizeNumber)
        .limit(sizeNumber)
        .sort({ _id: -1 });
  
      res.status(200).json({
        code: 200,
        status: true,
        message: "Get category list successfully",
        data: { categories, total, pages },
      });
    } catch (error) {
      next(error);
    }
  };
module.exports = {addCategory, updateCategory, deleteCategory, getCategories}