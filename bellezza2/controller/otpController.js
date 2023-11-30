const userForm = require('../models/userModel');
const otpForm = require('../models/otpModel');
const asyncHandler = require('express-async-handler');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var otpGenerator = require('otp-generator');

exports.forgotPassword = asyncHandler(async (req, res) => {
    const username = req.body.Username;

    try {
        const user = await userForm.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const email = user.email;
        console.log("3", email);
        // const OTP = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets:true, upperCase: false, specialChars: false });
        const OTP = Math.floor((Math.random() * 900000 + 100000))

        const otpDocument = await otpForm.create({
            email: email,
            otp: OTP,
        });

        await otpDocument.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'malefashionum@gmail.com',
                pass: 'nonf ahey lszt nmra'
            }
        });

        const mailOptions = {
            from: 'malefashionum@gmail.com',
            to: email,
            subject: 'Reset your password',
            text: `Your OTP for resetting the password is: ${OTP}`,
        };

        transporter.sendMail(mailOptions);
        const data={
            email: email,
            username: username
        }
        console.log("OTP sent to email: ", email);
        res.status(200).json({email: data});
    } catch (error) {
        console.error("Error sending OTP: ", error);
    }
});

exports.verifyOtp = asyncHandler(async (req, res) => {
    const enteredOtp = req.body.otp;

    try {
        const otpDocument = await otpForm.findOne({ otp: enteredOtp });

        if (!otpDocument) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        res.status(200).json({ message: 'OTP verified successfully' });

    } catch (error) {
        console.error("Error verifying OTP: ", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

exports.resetPassword = asyncHandler(async (req, res) => {
    const { email, newpass, conpass } = req.body;
  
    try {
      const user = await userForm.findOne({email});
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (newpass !== conpass) {
        return res.status(400).json({ message: 'New password and confirmation password do not match' });
      }
  
    //   const newHashedPassword = await bcrypt.hash(newpass, 10);
      user.password = newpass;
  
      await user.save();
  
      res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to change password' });
    }
  });