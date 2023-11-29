const mongoose = require('mongoose');

const cancelSchema = new mongoose.Schema({
    orderId: String,
    cartItems: {
            id: String,
            image: String,
            productName: String,
            quantity: Number,
            offerprice: Number,
            status: String,
        },
});

const Cancel = mongoose.model('Cancel', cancelSchema);

module.exports = Cancel;
