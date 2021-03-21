import express from 'express'
import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orders.js';

var router = express.Router();

/* GET products listing. */
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);



export default router;
