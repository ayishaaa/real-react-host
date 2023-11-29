const Cancel = require('../models/cancelModel'); 
const Order = require('../models/orderModel');

exports.orderCancel = async (req, res) => {
  const orderId = req.params.id;
  const productId = req.body.productId;
  try {
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const cancelledCartItem = order.cartItems.find((item) => item.id === productId);

    if (!cancelledCartItem) {
      return res.status(404).json({ message: 'Product not found in the order' });
    }

    // const userId = req.order.userId;
    // console.log(userId);

    const cancel = new Cancel({
    //   userId,
      orderId,
      cartItems: cancelledCartItem,
    });

    await cancel.save();

    return res.status(200).json({ success: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Error while cancelling order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.listCancel = async (req, res) => {
    try {
        const orders = await Cancel.find();
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

exports.statusCancel = async (req, res) => {
  const { id } = req.params;
  const { orderId, productId } = req.body;
  const status = req.body.status;

  try {
    // Find the order by its ID
    const order = await Cancel.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    let product;
    // Find the product in cartItems by its productId
    if (Array.isArray(order.cartItems)) {
      // Find the product in cartItems by its _id
      product = order.cartItems.find(item => item.id === productId);
    } else if (typeof order.cartItems === 'object') {
      // Check if the single product matches the given id
      if (order.cartItems.id === productId) {
        product = order.cartItems;
      }
    } else {
      return res.status(400).json({ error: 'Invalid order structure' });
    }

    // Update the status property of the specific item
    product.status = status;

    // Save the updated order
    const updatedOrder = await order.save();

    // Retrieve the corresponding order in the Order model
    const orderproduct = await Order.findOne({ orderId });

    if (!orderproduct) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Find the corresponding item in the orderproduct
    const cancelledCartItem = orderproduct.cartItems.find((item) => item.id === product.id);

    if (!cancelledCartItem) {
      return res.status(404).json({ message: 'Product not found in the order' });
    }

    console.log("1111111111", orderproduct.subtotal);

    if (cancelledCartItem.status === "Cancelled") {
      orderproduct.subtotal = orderproduct.subtotal - cancelledCartItem.offerprice;
      orderproduct.total = orderproduct.subtotal;

      console.log("22222222", orderproduct.subtotal);

      if (orderproduct.subtotal <= 0) {
        orderproduct.subtotal = 0;
        orderproduct.discountAmount = 0;
        orderproduct.total = 0;
      } else {
        if (orderproduct.code) {
          orderproduct.discountAmount = (orderproduct.subtotal * orderproduct.code) / 100;
          orderproduct.total = orderproduct.subtotal - orderproduct.discountAmount;
        }
      }
    }

    const savedOrderProduct = await orderproduct.save();

    res.status(200).json({ message: 'Status updated successfully', order: updatedOrder, status: status, saved: savedOrderProduct });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCancel = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
      await Cancel.findByIdAndRemove(id);
      res.sendStatus(204); // Success, no content
  } catch (error) {
      console.error(error);
      res.sendStatus(500); // Internal server error
  }
};
