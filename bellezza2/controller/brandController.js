const brandForm = require('../models/brandModel');
const asyncHandler = require('express-async-handler');

exports.brandAdd = asyncHandler(async (req, res) => {
    console.log("Brand Controller");
    if (req.body.Name === '' || req.body.Image === '') {
        res.send('All values are required');
    } else {
        const existingUser = await brandForm.findOne({ name: req.body.Name });

        if (existingUser) {
            console.log("Brand already exists");
            res.status(400).json({ error: "Brand already exists" });
        } else {
            var asyncform = await brandForm.create({
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

exports.collectedBrand = asyncHandler(async (req, res) => {
    try {
        const elements = await brandForm.find({});
        res.json(elements);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

exports.updateBrand = async (req, res) => {
    const { id } = req.params;
    const { Name, Image } = req.body;
  
    try {
      let updatedBrand = null;
    //   console.log(Image)
      let updateFields = {
        _id: id,
        name: Name,
      };
   
      if (Image) {
        updateFields.image = Image;
      }
  
      updatedBrand = await brandForm.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
      );
  
      if (!updatedBrand) {
        return res.status(404).json({ message: 'Brand not found' });
      }
  
      res.status(200).json(updatedBrand);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.deleteBrand = async (req, res) => {
    const { id } = req.params;

    try {
        await brandForm.findByIdAndRemove(id);
        res.sendStatus(204); // Success, no content
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal server error
    }
};