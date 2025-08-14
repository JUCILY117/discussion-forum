const express = require('express');
const { createThread, getThreads, getThreadById, deleteThread } = require('../controllers/threadController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', getThreads);
router.get('/:id', getThreadById);
router.post('/', authMiddleware, createThread);
router.delete('/:id', authMiddleware, deleteThread);

module.exports = router;
