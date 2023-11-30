const Order = require('../models/orderModel');
var nodemailer = require('nodemailer');

// Function to generate a random 3-digit number
function generateThreeDigitRandom() {
    return Math.floor(100 + Math.random() * 900);
}

// Function to get the current date and time in "YYYYMMDDhhmmss" format
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function formatShippingDetails(details) {
    const formattedDetails = Object.entries(details).map(([key, value]) => {
        return `${value}`;
    });
    return formattedDetails.join('\n');
}

exports.orderAdd = async (req, res) => {
    try {
        const {
            cartItems,
            billingDetails,
            shippingDetails,
            subtotal,
            // discountAmount,
            // total,
            code,
        } = req.body;

        const cartItemsWithStatus = cartItems.map(item => ({
            ...item,
            status: "Order Received",
        }));

        let discountAmount;
        if (code) {
         discountAmount = (subtotal * code) / 100;
        }else{
            discountAmount=0;
        }
        const total = subtotal - discountAmount;
        const userId = req.body.userId;
        const shippingDetailsString = formatShippingDetails(shippingDetails);
        const email = billingDetails.email;
        const name = billingDetails.firstName;

        const randomThreeDigits = generateThreeDigitRandom();
        const currentDateTime = getCurrentDateTime();
        const orderId = `${currentDateTime}-${randomThreeDigits}`;

        const newOrder = await Order.create({
            orderId,
            cartItems: cartItemsWithStatus,
            billingDetails,
            shippingDetails,
            subtotal,
            discountAmount,
            total,
            userId,
            code,
        });
        console.log(newOrder);
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
            subject: 'Order Placed',
            text: `Hey ${name},
            Thank you for your purchase!
            Your order ID: ${orderId},
            The products will be shipped to the address given below.
            To,
                ${shippingDetails.firstName} ${shippingDetails.lastName},
                ${shippingDetails.address1}, ${shippingDetails.address2},
                ${shippingDetails.city}, ${shippingDetails.state},
                ${shippingDetails.country}, ${shippingDetails.postcode},
                ${shippingDetails.phone},
            Copy the order ID and track your order from out Website.
            We will send you an email as soon as your parcel is on its way.

            Thank you for your purchase,
            
            Best Regards,
            
            MaleFashion`,
        };
        console.log(mailOptions);

        transporter.sendMail(mailOptions);
        // const data={
        //     email: email,
        //     username: username
        // }
        console.log("Order notification to email: ", email);

        res.status(201).json({
            status: 'success',
            orderId: orderId,
            data: newOrder,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.detailOrders = async (req, res) => {
    try {
        const userId = req.params.id;
        const order = await Order.find({ userId });
        if (!order) {
            return res.status(404).json({
                status: 'fail',
                message: 'Order not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: order,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};

exports.detailOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findOne({ orderId });
        if (!order) {
            return res.status(404).json({
                status: 'fail',
                message: 'Order not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: order,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            status: 'success',
            data: orders,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};

exports.orderStatus = async (req, res) => {
    const id = req.params.id;
    const { orderId } = req.body;
    const status = req.body.status;
    console.log(id);
    console.log(orderId);
    console.log(status);
    try {
        // Find the order by its ID
        const order = await Order.findOne({ orderId: orderId });
        console.log(order);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Find the item in cartItems by its _id
        const productIndex = order.cartItems.findIndex((item) => item.id.toString() === id);
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Item not found in order' });
        }

        // Update the status property of the specific item
        order.cartItems[productIndex].status = status;

        // Save the updated order
        const updatedOrder = await order.save();

        res.status(200).json({ message: 'Status updated successfully', order: updatedOrder, status: status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.trackOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findOne({ orderId });
        if (!order) {
            return res.status(404).json({
                status: 'fail',
                message: 'Order not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: order,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};


