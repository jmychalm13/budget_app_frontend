import axios from "axios";
import { useState, useEffect } from "react";

export function FinancialSummary() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // todo: create loader

  const handleFetchData = () => {
    axios
      .get("http://localhost:3000/incomes.json")
      .then((response) => {
        console.log(response.data);
        setIncomes(response.data);
      })
      .then(() => {
        axios
          .get("http://localhost:3000/expenses.json")
          .then((response) => {
            console.log(response.data);
            setExpenses(response.data);
          })
          .catch((error) => {
            console.error("Error fetching expenses", error);
          })
          .catch((error) => {
            console.error("Error fetching data", error);
          });
      });
  };

  let totalIncome = 0;
  let totalExpenses = 0;

  const findTotalIncome = (incomes) => {
    incomes.map((income) => {
      totalIncome += +income.amount;
    });
    return totalIncome;
  };

  const findTotalExpenses = (expenses) => {
    expenses.map((expense) => {
      totalExpenses += +expense.amount;
    });
    return totalExpenses;
  };

  useEffect(handleFetchData, []);

  return (
    <div>
      <h1>Financial Summary</h1>
      <div className="income-summary">
        <h1>Income</h1>
        {incomes.map((income) => (
          <div key={income.id} className="d-flex justify-content-between">
            <p>{income.source}</p>
            <p>{income.amount}</p>
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <p>
            <strong>Total:</strong>
          </p>
          <p>
            <strong>{findTotalIncome(incomes)}</strong>
          </p>
        </div>
      </div>
      <div className="expense-summary">
        <h1>Expenses</h1>
        {expenses.map((expense) => (
          <div key={expense.id} className="d-flex justify-content-between">
            <p>{expense.category}</p>
            <p>{expense.amount}</p>
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <p>
            <strong>Total:</strong>
          </p>
          <p>
            <strong>{findTotalExpenses(expenses)}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
