import React, { useState, useEffect } from "react";
import "./ExpenseTracking.css";
import axios from "axios";

const ExpenseTracking = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");

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

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    try {
      await axios.delete(
        `https://expense-tracker-a1e6c-default-rtdb.firebaseio.com/expenses/${id}.json?auth=${token}`
      );
      console.log("Expense successfully deleted");
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setEditAmount(expense.amount);
    setEditDescription(expense.description);
    setEditCategory(expense.category);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    const updatedExpense = {
      amount: editAmount,
      description: editDescription,
      category: editCategory,
      date: new Date().toLocaleString(),
    };

    try {
      await axios.put(
        `https://expense-tracker-a1e6c-default-rtdb.firebaseio.com/expenses/${editingExpense.id}.json?auth=${token}`,
        updatedExpense
      );
      console.log("Expense successfully updated");
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === editingExpense.id ? { ...exp, ...updatedExpense } : exp
        )
      );
      setEditingExpense(null);
    } catch (error) {
      console.error("Error updating expense:", error);
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
            {expenses.map((expense) => (
              <div key={expense.id} className="expense-item">
                <p>
                  <strong>{expense.description}</strong> - ₹{expense.amount} (
                  {expense.category})
                </p>
                <button onClick={() => handleEdit(expense)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(expense.id)} className="delete-btn">Delete</button>
              </div>
            ))}
          </ul>
        )}
      </div>
      <div>
        {editingExpense && (
          <div className="edit-form">
            <h3>Edit Expense</h3>
            <input
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              placeholder="Amount"
            />
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Description"
            />
            <input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              placeholder="Category"
            />
            <button onClick={handleUpdate}>Submit</button>
            <button onClick={() => setEditingExpense(null)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracking;
