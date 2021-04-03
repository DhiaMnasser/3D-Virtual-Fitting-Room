const Order = require("../models/Order.js");
const mongoose = require("mongoose");

const getOrders = async (req, res) => {
  try {
    const orderModels = await Order.find();
    console.log("getting orders");
    res.status(200).json(orderModels);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    res.status(200).json(order);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
const getOrdersByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const orders = await Order.find({ clientId: id });

    res.status(200).json(orders);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  console.log(`create prod in server ${req}`);

  const { clientId } = req.body;
  const newOrder = await new Order({ clientId });
  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    clientId,
    ref,
    dateCreated,
    dateShipped,
    isValid,
    isShipped,
    totalPrice,
    products
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No order with id: ${id}`);

  const updatedOrder = {
    _id: id,
    clientId,
    ref,
    dateCreated,
    dateShipped,
    isValid,
    isShipped,
    totalPrice,
    products
  };

  // await Order.findByIdAndUpdate(id, updatedOrder, { new: true });
  await Order.findByIdAndUpdate(id, {
    $set: {
      dateShipped: dateShipped,
      isValid: isValid,
      isShipped: isShipped,
      totalPrice: totalPrice,
      products: products
    }
  });

  res.status(200).json(updatedOrder);
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No order with id: ${id}`);

  await Order.findByIdAndRemove(id);

  res.status(200).json({ message: "Order deleted successfully." });
};

module.exports = {
  deleteOrder,
  updateOrder,
  createOrder,
  getOrderById,
  getOrdersByUser,
  getOrders
};
