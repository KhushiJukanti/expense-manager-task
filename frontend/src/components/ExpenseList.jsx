import React, { useEffect, useState } from 'react';
import AddExpense from './AddExpense';
import axios from 'axios';

function ExpenseList({ token }) {
  const [expenses, setExpenses] = useState([]);
  const [showAddExpense, setShowAddExpense] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:7000/expenses', {
          headers: {
            'Authorization': `Bearer ${token}`  // Include the token here
          }
        });
        setExpenses(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching expenses:', error.response ? error.response.data : error.message);
      }
    };

    fetchExpenses();
  }, [token]);

  const handleDelete = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:7000/expenses/${expenseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setExpenses(expenses.filter((expense) => expense.SK !== expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error.response ? error.response.data : error.message);
    }
  };

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div className="container mt-5">
      <h1>Personal Expense Manager</h1>
      <button 
        className="btn btn-primary mb-3" 
        onClick={() => setShowAddExpense(true)}
      >
        Add Expense
      </button>
      
      {showAddExpense && (
        <AddExpense 
          token={token} 
          onExpenseAdded={handleAddExpense} 
          onClose={() => setShowAddExpense(false)} 
        />
      )}
      
      <table className="table mt-5">
        <thead>
          <tr>
            
            <th scope="col">Expense Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Expense Date</th>
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.SK}>
              
              <td>{expense.name}</td>
              <td>${expense.amount}</td>
              <td>{expense.SK}</td>
              <td>{expense.category}</td>
              <td>
                <button className="btn btn-warning mr-2">Edit</button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(expense.SK)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
