import React, { useState } from "react";
import "./ExpenseTracking.css";

const ExpenseTracking = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!amount || !description || !category) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      amount,
      description,
      category,
    };

    setExpenses((prev) => [...prev, newExpense]);
    setAmount("");
    setDescription("");
    setCategory("");
  };

  return (
    <div className="expense-container">
      <h2>Add Daily Expense</h2>
      <form className="expense-form" onSubmit={handleAddExpense}>
        <input
          type="number"
          placeholder="Amount spent"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Expense description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <hr />

      <div className="expense-list">
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <ul>
            {expenses.map((exp) => (
              <li key={exp.id} className="expense-item">
                <strong>₹{exp.amount}</strong> — {exp.description} (
                {exp.category})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracking;
