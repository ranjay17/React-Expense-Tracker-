import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../redux/expensesSlice";
import { activatePremium, toggleTheme } from "../redux/ThemeSlice";
import { CSVLink } from "react-csv";
import "./ExpenseTracking.css";

const ExpenseTracking = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const { list: expenses, premiumActive } = useSelector(
    (state) => state.expenses
  );
  const { isPremiumActivated, theme } = useSelector((state) => state.theme);

  const firebaseURL =
    "https://expense-tracker-a1e6c-default-rtdb.firebaseio.com/expenses.json";

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(firebaseURL);
        const loaded = res.data
          ? Object.keys(res.data).map((key) => ({ id: key, ...res.data[key] }))
          : [];
        dispatch(setExpenses(loaded));
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description || !category) return alert("Fill all fields!");

    const expenseData = { amount, description, category };

    if (editId) {
      await axios.put(
        `https://expense-tracker-a1e6c-default-rtdb.firebaseio.com/expenses/${editId}.json`,
        expenseData
      );
      dispatch(updateExpense({ id: editId, ...expenseData }));
      setEditId(null);
    } else {
      const res = await axios.post(firebaseURL, expenseData);
      dispatch(addExpense({ id: res.data.name, ...expenseData }));
    }

    setAmount("");
    setDescription("");
    setCategory("");
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `https://expense-tracker-a1e6c-default-rtdb.firebaseio.com/expenses/${id}.json`
    );
    dispatch(deleteExpense(id));
  };

  const handleEdit = (exp) => {
    setAmount(exp.amount);
    setDescription(exp.description);
    setCategory(exp.category);
    setEditId(exp.id);
  };

  const handleActivatePremium = () => {
    dispatch(activatePremium());
  };

  return (
    <div
      className={`expense-container ${theme === "dark" ? "dark-theme" : ""}`}
    >
      <h2>Add Daily Expense</h2>

      <form className="expense-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
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
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      {/* Show Activate Premium only when total > 10k */}
      {premiumActive && !isPremiumActivated && (
        <button className="premium-btn" onClick={handleActivatePremium}>
          🌟 Activate Premium 🌟
        </button>
      )}

      {/* Show extra features only after activation */}
      {isPremiumActivated && (
        <div className="premium-features">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="toggle-btn"
          >
            Toggle {theme === "light" ? "Dark" : "Light"} Mode
          </button>

          <CSVLink
            data={expenses}
            filename={"expenses.csv"}
            className="download-btn"
          >
            Download Expenses (CSV)
          </CSVLink>
        </div>
      )}

      <div className="expense-list">
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <ul>
            {expenses.map((exp) => (
              <li key={exp.id} className="expense-item">
                <strong>₹{exp.amount}</strong> — {exp.description} (
                {exp.category})
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(exp.id)}
                >
                  Delete
                </button>
                <button className="edit-btn" onClick={() => handleEdit(exp)}>
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracking;
