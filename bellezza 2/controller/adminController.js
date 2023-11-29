var jwt = require('jsonwebtoken');
const adminForm = require('../models/adminModel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

exports.adminAdd = asyncHandler(async (req, res) => {
  console.log("Admin Controller");
  if (req.body.Name === '' || req.body.Username === '' || req.body.Password === '' || req.body.Email === '' || req.body.Country === '' || req.body.State === '' || req.body.Phone === '' || req.body.Role === '' || req.body.Image === '') {
    res.send('All values are required');
  } else {
    const existingUser = await adminForm.findOne({ username: req.body.Username });

    if (existingUser) {
      console.log("User name already exists");
      res.status(400).json({ error: "User name already exists" });
    } else {
      var asyncform = await adminForm.create({
        name: req.body.Name,
        username: req.body.Username,
        password: req.body.Password,
        email: req.body.Email,
        country: req.body.Country,
        state: req.body.State,
        phone: req.body.Phone,
        role: req.body.Role,
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

exports.adminOnly = asyncHandler(async (req, res) => {
  console.log("Admin Controller");
  try {
    var data = await adminForm.create({
      name: "Ayisha",
      username: "Malee",
      password: "malee@9999",
      email: "malee@gmail.com",
      country: "India",
      state: "Kerala",
      phone: "9845712635",
      role: "admin",
    });
    const result = await data.save();
    res.json(result);
    console.log(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

exports.adminLogin = asyncHandler(async (req, res) => {
  const username = req.body.Username;
  const password = req.body.Password;

  console.log(username);
  console.log("password");

  const admin = await adminForm.findOne({ username: username });
  //console.log(admin);
  const isPasswordMatch = await bcrypt.compare(password, admin.password);

  if (admin && isPasswordMatch) {
    const token = jwt.sign({ username: admin.username }, 'myjwtsecretkey');
    // const email = admin.email;
    res.status(200).json({ token: token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

exports.getAdminProfile = asyncHandler(async (req, res) => {
  const adminUsername = req.user.username; // Assuming username is stored in the token payload

  // Fetch the admin profile details from the database using the username
  // Replace this with your actual database query
  try {
    const adminProfile = await adminForm.findOne({ username: adminUsername });
    if (adminProfile) {
      res.json(adminProfile);
    } else {
      res.status(404).json({ error: 'Admin profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

exports.collectedAdmin = asyncHandler(async (req, res) => {
  try {
      const elements = await adminForm.find({});
      res.json(elements);
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});

exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { Name, Username, Password, Email, Country, State, Phone, Role, Image } = req.body;

  try {
    let updatedProduct = null;
    console.log(Image)
    let updateFields = {
      _id: id,
      name: Name,
      username: Username,
      password: Password,
      email: Email,
      country: Country,
      state: State,
      phone: Phone,
      role: Role
    };

    if (Image) {
      updateFields.image = Image;
    }

    updatedProduct = await adminForm.findByIdAndUpdate(
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

exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
      await adminForm.findByIdAndRemove(id);
      res.sendStatus(204); // Success, no content
  } catch (error) {
      console.error(error);
      res.sendStatus(500); // Internal server error
  }
};
