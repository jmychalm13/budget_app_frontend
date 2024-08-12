import axios from "axios";
import { useState, useEffect } from "react";
import { ExpensesNew } from "./ExpensesNew";

const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((total, expense) => {
    const amount = Number(expense.amount);
    return total + (isNaN(amount) ? 0 : amount);
  }, 0);
};

export function ExpensesIndex() {
  const [expenses, setExpenses] = useState([]);

  const handleIndexExpenses = () => {
    axios.get("http://localhost:3000/expenses.json").then((response) => {
      setExpenses(response.data);
    });
  };

  const handleCreateExpense = (params, successCallback) => {
    axios.post("http://localhost:3000/expenses.json", params).then((response) => {
      setExpenses([...expenses, response.data]);
      successCallback();
    });
  };

  const totalExpenses = calculateTotalExpenses(expenses);
  const formattedTotalExpenses = isNaN(totalExpenses) ? 0 : totalExpenses.toFixed(2);

  useEffect(handleIndexExpenses, []);

  return (
    <div>
      <ExpensesNew onCreateExpense={handleCreateExpense} />
      <div className="container">
        <h1 className="">All Expenses</h1>
        <table className="table table-responsive border">
          <thead>
            <tr>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>{expense.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
              <td className="fw-bold">{formattedTotalExpenses}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
