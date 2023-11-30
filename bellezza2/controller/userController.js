const userForm = require('../models/userModel');
const asyncHandler = require('express-async-handler');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

exports.userAdd = asyncHandler(async (req, res) => {
  console.log("User Controller");
  console.log(req.body.Username);
  if (req.body.firstName === '' || req.body.lastName === '' || req.body.Username === '' || req.body.Password === '' || req.body.Email === '' || req.body.Country === '' || req.body.State === '' || req.body.Phone === '' || req.body.Image === '') {
    res.send('All values are required');
  } else {
    const existingUser = await userForm.findOne({ username: req.body.Username });

    if (existingUser) {
      console.log("User name already exists");
      res.status(400).json({ error: "User name already exists" });
    } else {
      var asyncform = await userForm.create({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        username: req.body.Username,
        password: req.body.Password,
        email: req.body.Email,
        country: req.body.Country,
        state: req.body.State,
        phone: req.body.Phone,
        image: req.body.Image,
      });
      console.log(asyncform);
      if (asyncform) {
        res.send('Successfully collected data');
      } else {
        res.send('Failed to collect data');
      }
    }
  }
});

exports.collectedUser = asyncHandler(async (req, res) => {
  try {
    const elements = await userForm.find({});
    res.json(elements);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

exports.getUserProfile = asyncHandler(async (req, res) => {
  const adminUsername = req.user.username; // Assuming username is stored in the token payload

  // Fetch the admin profile details from the database using the username
  // Replace this with your actual database query
  try {
    const adminProfile = await userForm.findOne({ username: adminUsername });
    if (adminProfile) {
      res.json(adminProfile);
    } else {
      res.status(404).json({ error: 'Admin profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, Username, Password, Email, Country, State, Phone, Image } = req.body;
  // console.log(req.body.Image);
  try {
    let updatedProduct = null;
    // console.log(Image)
    let updateFields = {
      _id: id,
      firstname: firstName,
      lastname: lastName,
      username: Username,
      password: Password,
      email: Email,
      country: Country,
      state: State,
      phone: Phone
    };

    if (Image) {
      updateFields.image = Image;
    }

    updatedProduct = await userForm.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await userForm.findByIdAndRemove(id);
    res.sendStatus(204); // Success, no content
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Internal server error
  }
};

exports.userSide = asyncHandler(async (req, res) => {
  console.log("User Controller");
  console.log(req.body.Username);
  if (req.body.firstName === '' || req.body.lastName === '' || req.body.Username === '' || req.body.Password === '' || req.body.Email === '' || req.body.Country === '' || req.body.State === '' || req.body.Phone === '' || req.body.Image === '') {
    res.send('All values are required');
  } else {
    const existingUser = await userForm.findOne({ username: req.body.Username });

    if (existingUser) {
      console.log("User name already exists");
      res.status(400).json({ error: "User name already exists" });
    } else {
      var asyncform = await userForm.create({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        username: req.body.Username,
        password: req.body.Password,
        email: req.body.Email,
        country: req.body.Country,
        state: req.body.State,
        phone: req.body.Phone,
        image: req.body.Image,
      });
      console.log(asyncform);
      if (asyncform) {
        const token = jwt.sign({ username: req.body.Username }, 'myjwtsecretkey');
        res.status(200).json({ token: token, message: 'Successfully collected data' });
      } else {
        res.send('Failed to collect data');
      }
    }
  }
});

exports.userLogin = asyncHandler(async (req, res) => {
  const username = req.body.Username;
  const password = req.body.Password;

  console.log(username);

  const admin = await userForm.findOne({ username: username });

  if (admin) {
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (isPasswordMatch) {
      const token = jwt.sign({ username: admin.username }, 'myjwtsecretkey');

      const userProfile = {
        id: admin._id,
        firstname: admin.firstname,
        lastname: admin.lastname,
        username: admin.username,
        email: admin.email,
        country: admin.country,
        state: admin.state,
        phone: admin.phone,
        image: admin.image,
      };

      res.status(200).json({
        token: token,
        user: userProfile,
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

exports.changePassword = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { curpass, newpass, conpass } = req.body;

  try {
    const user = await userForm.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(curpass, user.password);
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    if (newpass !== conpass) {
      return res.status(400).json({ message: 'New password and confirmation password do not match' });
    }

    const newHashedPassword = await bcrypt.hash(newpass, 10);
    user.password = newHashedPassword;

    await user.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to change password' });
  }
});
