const express = require('express');
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/expenses', authMiddleware, addExpense);
router.get('/expenses', authMiddleware, getExpenses);
router.put('/expenses/:id', authMiddleware, updateExpense);
router.delete('/expenses/:id', authMiddleware, deleteExpense);

module.exports = router;
