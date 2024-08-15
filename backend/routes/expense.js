// routes/expenseRoutes.js
const express = require('express');
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expense');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/expenses', addExpense);
router.get('/expenses', getExpenses);
router.put('/expenses/:id', authMiddleware, updateExpense);
router.delete('/expenses/:id', deleteExpense);

module.exports = router;
