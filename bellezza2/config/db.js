const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ayishanihalaum:ayishaum@cluster0.2fhprz1.mongodb.net/bellezza', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
