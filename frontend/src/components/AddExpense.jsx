import React, { useState } from 'react';

function AddExpense({ token, onExpenseAdded, onClose }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

  // Function to add expense
  const addExpense = async (expense, token) => {
    try {
      const response = await fetch('http://localhost:7000/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Include the token here
        },
        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      const data = await response.json();
      onExpenseAdded(data);  // Notify parent component that an expense was added
      return data;
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const expense = {
      name,
      amount,
      category,
      expenseDate,
    };

    await addExpense(expense);
    onClose();  // Close the modal after adding the expense
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Expense</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="expenseName">Expense Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="expenseName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expenseAmount">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="expenseAmount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expenseCategory">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="expenseCategory"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expenseDate">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="expenseDate"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Expense
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
