// services/expenseService.js
import axios from 'axios';

const API_URL = 'http://localhost:7000/expenses';


export const getExpenses = async (token) => {
  try {
    const response = await axios.get('http://localhost:7000/expenses', {
      headers: {
        'Authorization': `Bearer ${token}`  // Ensure the token is included
      }
    });
    // console.log(`hello ${response.data[1].amount}`)
    return response.data;  // Return the response data
  } catch (error) {
    console.error('Error fetching expenses:', error.response ? error.response.data : error.message);
    throw error;  // Rethrow the error for further handling
  }
};


export const addExpense = (token, amount, description) => {
  return axios.post(
    API_URL,
    { amount, description },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const updateExpense = (token, id, amount, description) => {
  return axios.put(
    `${API_URL}/${id}`,
    { amount, description },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteExpense = (token, id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};
