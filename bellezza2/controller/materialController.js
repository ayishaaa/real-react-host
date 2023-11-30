const materialForm = require('../models/materialModel');
const asyncHandler = require('express-async-handler');

exports.materialAdd = asyncHandler(async (req, res) => {
    console.log("Material Controller");
    if (req.body.Name === '' || req.body.Image === '') {
        res.send('All values are required');
    } else {
        const existingUser = await materialForm.findOne({ name: req.body.Name });

        if (existingUser) {
            console.log("Material already exists");
            res.status(400).json({ error: "Material already exists" });
        } else {
            var asyncform = await materialForm.create({
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

exports.collectedMaterial = asyncHandler(async (req, res) => {
    try {
        const elements = await materialForm.find({});
        res.json(elements);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

exports.updateMaterial = async (req, res) => {
    const { id } = req.params;
    const { Name, Image } = req.body;
  
    try {
      let updatedMaterial = null;
    //   console.log(Image)
      let updateFields = {
        _id: id,
        name: Name,
      };
  
      if (Image) {
        updateFields.image = Image;
      }
  
      updatedMaterial = await materialForm.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
      );
  
      if (!updatedMaterial) {
        return res.status(404).json({ message: 'Material not found' });
      }
  
      res.status(200).json(updatedMaterial);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.deleteMaterial = async (req, res) => {
    const { id } = req.params;

    try {
        await materialForm.findByIdAndRemove(id);
        res.sendStatus(204); // Success, no content
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal server error
    }
};