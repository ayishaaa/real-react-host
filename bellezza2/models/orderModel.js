const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,
    orderId: String,
    cartItems: [
        {
            id: String,
            image: String,
            productName: String,
            quantity: Number,
            offerprice: Number,
            status: String,
        },
    ],
    billingDetails: {
        firstName: String,
        lastName: String,
        country: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        postcode: String,
        phone: String,
        email: String,
    },
    shippingDetails: {
        firstName: String,
        lastName: String,
        country: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        postcode: String,
        phone: String,
        email: String,
    },
    subtotal: {
        type: Number,
        min: 0,
    },
    discountAmount: {
        type: Number,
        min: 0,
    },
    total: {
        type: Number,
        min: 0,
    },
    code: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
