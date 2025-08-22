import express from 'express';
import { createThread, addTagToThread } from '../controllers/threadController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createThread);
router.post('/:id/tags', authMiddleware, addTagToThread);

export default router;