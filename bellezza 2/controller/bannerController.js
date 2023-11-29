const bannerForm = require('../models/bannerModel');
const asyncHandler = require('express-async-handler');

exports.bannerAdd = asyncHandler(async (req, res) => {
    console.log("Banner Controller");
    if (req.body.Name === '' || req.body.Image === '' || req.body.Subname === '' || req.body.Description === '') {
        res.send('All values are required');
    } else {
        const existingUser = await bannerForm.findOne({ name: req.body.Name });

        if (existingUser) {
            console.log("Banner already exists");
            res.status(400).json({ error: "Banner already exists" });
        } else {
            var asyncform = await bannerForm.create({
                name: req.body.Name,
                image: req.body.Image,
                subname: req.body.Subname,
                description: req.body.Description,
            });
            if (asyncform) {
                res.send('Successfully collected data');
            } else {
                res.send('Failed to collect data');
            }
        }
    }
});

exports.collectedBanner = asyncHandler(async (req, res) => {
    try {
        const elements = await bannerForm.find({});
        res.json(elements);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

exports.updateBanner = async (req, res) => {
    const { id } = req.params;
    const { Name, Image, Subname, Description } = req.body;
  
    try {
      let updatedBanner = null;
    //   console.log(Image)
      let updateFields = {
        _id: id,
        name: Name,
        subname: Subname,
        description: Description,
      };
  
      if (Image) {
        updateFields.image = Image;
      }
  
      updatedBanner = await bannerForm.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
      );
  
      if (!updatedBanner) {
        return res.status(404).json({ message: 'Banner not found' });
      }
  
      res.status(200).json(updatedBanner);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.deleteBanner = async (req, res) => {
    const { id } = req.params;

    try {
        await bannerForm.findByIdAndRemove(id);
        res.sendStatus(204); // Success, no content
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal server error
    }
};