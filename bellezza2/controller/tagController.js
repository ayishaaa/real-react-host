const tagForm = require('../models/tagModel');
const asyncHandler = require('express-async-handler');

exports.tagAdd = asyncHandler(async (req, res) => {
    console.log("Tag Controller");
    if (req.body.Name === '' || req.body.Image === '') {
        res.send('All values are required');
    } else {
        const existingUser = await tagForm.findOne({ name: req.body.Name });

        if (existingUser) {
            console.log("Tag already exists");
            res.status(400).json({ error: "Tag already exists" });
        } else {
            var asyncform = await tagForm.create({
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

exports.collectedTag = asyncHandler(async (req, res) => {
    try {
        const elements = await tagForm.find({});
        res.json(elements);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

exports.updateTag = async (req, res) => {
    const { id } = req.params;
    const { Name, Image } = req.body;
  
    try {
      let updatedTag = null;
    //   console.log(Image)
      let updateFields = {
        _id: id,
        name: Name,
      };
  
      if (Image) {
        updateFields.image = Image;
      }
  
      updatedTag = await tagForm.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
      );
  
      if (!updatedTag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
  
      res.status(200).json(updatedTag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.deleteTag = async (req, res) => {
    const { id } = req.params;

    try {
        await tagForm.findByIdAndRemove(id);
        res.sendStatus(204); // Success, no content
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal server error
    }
};