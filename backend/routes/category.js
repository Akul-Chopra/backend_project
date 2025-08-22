import express from "express";
import { getCategories, addCategories, deleteCategories } from "../controllers/categoryController.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', authMiddleware, addCategories);
router.delete('/:id', authMiddleware, deleteCategories);


export default router;