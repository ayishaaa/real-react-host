const couponForm = require('../models/couponModel');
const asyncHandler = require('express-async-handler');

exports.couponAdd = asyncHandler(async (req, res) => {
    console.log("Coupon Controller");
    if (req.body.Name === '' || req.body.Code === '' || req.body.Discount === '') {
        res.send('All values are required');
    } else {
        const existingUser = await couponForm.findOne({ name: req.body.Name });

        if (existingUser) {
            console.log("Coupon already exists");
            res.status(400).json({ error: "Coupon already exists" });
        } else {
            var asyncform = await couponForm.create({
                name: req.body.Name,
                code: req.body.Code,
                discount: req.body.Discount,
            });
            if (asyncform) {
                res.send('Successfully collected data');
            } else {
                res.send('Failed to collect data');
            }
        }
    }
});

exports.collectedCoupon = asyncHandler(async (req, res) => {
    try {
        const elements = await couponForm.find({});
        res.json(elements);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

exports.updateCoupon = async (req, res) => {
    const { id } = req.params;
    const { Name, Code, Discount } = req.body;
  
    try {
      let updatedCoupon = null;
    //   console.log(Image)
      let updateFields = {
        _id: id,
        name: Name,
        code: Code,
        discount: Discount,
      };
  
      updatedCoupon = await couponForm.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
      );
  
      if (!updatedCoupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
  
      res.status(200).json(updatedCoupon);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.deleteCoupon = async (req, res) => {
    const { id } = req.params;

    try {
        await couponForm.findByIdAndRemove(id);
        res.sendStatus(204); // Success, no content
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal server error
    }
};