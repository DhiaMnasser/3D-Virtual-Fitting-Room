const express =require('express')
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } =require('../controllers/orders.js');

var router = express.Router();

/* GET products listing. */
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);


module.exports= router;
