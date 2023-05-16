const CategoryModel = require("../Models/CategoryModel");

class CategoryController {
  //Adding Category
  async store(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Name are required" });
      }
      const createCategory = await CategoryModel.create(req.body);
      return res.status(200).json(createCategory);
    } catch {
      return res.status(400).json({ message: "Fail to create category" });
    }
  }

  //List Categories
  async index(req, res) {
    try {
      const categories = await CategoryModel.find();

      if (!categories) {
        return res.status(400).json({ message: "Fail to list categories" });
      }

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(400).json({ message: "Fail to list categories" });
    }
  }

  //List specific category by id
  async show(req, res) {
    try {
      const { id } = req.params;

      const category = await CategoryModel.findById(id, req.body);
      if (!category) {
        return res.status(400).json({ message: "Category does not exist" });
      }

      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ message: "Verify category ID" });
    }
  }

  //Update category
  async update(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findByIdAndUpdate(id, req.body);

      if (!category) {
        return res.status(400).json({ message: "Category does not exist" });
      }

      return res.status(200).json({ message: "Category updated" });
    } catch (error) {
      return res.status(400).json({ message: "Fail to update category" });
    }
  }

  //Delete category
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const categoryDestroyed = await CategoryModel.findByIdAndDelete(id);
      if(!categoryDestroyed){
        return res.status(400).json({ message: "Category does not exist" })
      }
      return res.status(200).json({ message: "Category deleted" })
    } catch (error) {
      return res.status(400).json({ message: "Fail to delete category" })
    }
  }


}

module.exports = new CategoryController();
