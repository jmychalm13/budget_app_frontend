import axios from "axios";
import { useState, useEffect } from "react";
import { ExpensesNew } from "./ExpensesNew";

export function ExpensesIndex() {
  const [expenses, setExpenses] = useState([]);

  const handleIndexExpenses = () => {
    axios.get("http://localhost:3000/expenses.json").then((response) => {
      console.log(response.data);
    });
  };

  const handleCreateExpense = (params, successCallback) => {
    axios.post("http://localhost:3000/expenses.json", params).then((response) => {
      setExpenses([...expenses, response.data]);
      successCallback();
    });
  };

  useEffect(handleIndexExpenses, []);

  return (
    <div>
      <ExpensesNew onCreateExpense={handleCreateExpense} />
      <h1>All Expenses</h1>
    </div>
  );
}
