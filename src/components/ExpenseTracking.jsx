import React, { useState, useEffect } from "react";
import "./ExpenseTracking.css";
import axios from "axios";

const ExpenseTracking = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          "https://expense-tracker-a1e6c-default-rtdb.firebaseio.com/expenses.json"
        );
        if (response.status === 200 && response.data) {
          // Firebase returns object, convert to array
          const fetchedExpenses = Object.entries(response.data).map(
            ([key, value]) => ({
              id: key,
              ...value,
            })
          );
          setExpenses(fetchedExpenses.reverse());
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (!amount || !description || !category) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      amount,
      description,
      category,
      date: new Date().toLocaleString(),
    };

    try {
      const response = await axios.post(
        "https://expense-tracker-a1e6c-default-rtdb.firebaseio.com/expenses.json",
        newExpense
      );

      if (response.status === 200) {
        const savedExpense = { id: response.data.name, ...newExpense };
        setExpenses((prev) => [savedExpense, ...prev]);
        setAmount("");
        setDescription("");
        setCategory("");
      } else {
        alert("Failed to add expense. Try again!");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Something went wrong!");
    }
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
        <h3>Expense List</h3>
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <ul>
            {expenses.map((exp) => (
              <li key={exp.id} className="expense-item">
                <strong>₹{exp.amount}</strong> — {exp.description} (
                {exp.category}) <small> {exp.date}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracking;
