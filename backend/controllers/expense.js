// controllers/expenseController.js
const dynamoDb = require('../config/db');

exports.addExpense = async (req, res) => {
  const { amount, description } = req.body;
  const email = req.user.email;

  const params = {
    TableName: 'Expenses',
    Item: {
      PK: email,
      SK: `expense#${new Date().toISOString()}`,
      amount,
      description,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    res.status(201).json({ message: 'Expense added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense', error });
  }
};

exports.getExpenses = async (req, res) => {
  const email = req.user.email;

  const params = {
    TableName: 'Expenses',
    KeyConditionExpression: 'PK = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  try {
    const result = await dynamoDb.query(params).promise();
    res.json(result.Items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
};

exports.updateExpense = async (req, res) => {
  const { amount, description } = req.body;
  const { id } = req.params;
  const email = req.user.email;

  const params = {
    TableName: 'Expenses',
    Key: {
      PK: email,
      SK: id,
    },
    UpdateExpression: 'set amount = :amount, description = :description',
    ExpressionAttributeValues: {
      ':amount': amount,
      ':description': description,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();
    res.json({ message: 'Expense updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense', error });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  const email = req.user.email;

  const params = {
    TableName: 'Expenses',
    Key: {
      PK: email,
      SK: id,
    },
  };

  try {
    await dynamoDb.delete(params).promise();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error });
  }
};
