import express from 'express'
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categories.js';

var router = express.Router();

/* GET Category listing. */
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);



export default router;
