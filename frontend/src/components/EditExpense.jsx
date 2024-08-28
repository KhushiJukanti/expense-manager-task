import React, { useState } from 'react';
import '../App.css'

function EditExpense({ expense, token, onClose, onExpenseUpdated }) {
  const [formData, setFormData] = useState({
    name: expense.name, // Include name in the form state
    amount: expense.amount,
    category: expense.category,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:7000/expenses/${expense.SK}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.message === 'Expense updated successfully') {
        onExpenseUpdated({ ...expense, ...formData }); // Update all fields
        onClose(); // Close the modal on success
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error updating expense');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Expense</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Expense
          </button>
          <button type="button" className="btn btn-secondary ml-2" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditExpense;
