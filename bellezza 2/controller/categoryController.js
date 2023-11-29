const categoryForm = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');

exports.categoryAdd = asyncHandler(async (req, res) => {
    console.log("Category Controller");
    if (req.body.Name === '' || req.body.Image === '') {
        res.send('All values are required');
    } else {
        const existingUser = await categoryForm.findOne({ name: req.body.Name });

        if (existingUser) {
            console.log("Category already exists");
            res.status(400).json({ error: "Category already exists" });
        } else {
            var asyncform = await categoryForm.create({
                name: req.body.Name,
                image: req.body.Image,
            });
            if (asyncform) {
                res.send('Successfully collected data');
            } else {
                res.send('Failed to collect data');
            }
        }
    }
});

exports.collectedCategory = asyncHandler(async (req, res) => {
    try {
        const elements = await categoryForm.find({});
        res.json(elements);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { Name, Image } = req.body;
  
    try {
      let updatedCategory = null;
    //   console.log(Image)
      let updateFields = {
        _id: id,
        name: Name,
      };
  
      if (Image) {
        updateFields.image = Image;
      }
  
      updatedCategory = await categoryForm.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        await categoryForm.findByIdAndRemove(id);
        res.sendStatus(204); // Success, no content
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal server error
    }
};