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
            console.log(response);
            setExpenses(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data", error);
          });
      });
  };

  useEffect(handleFetchData, []);

  return (
    <div>
      <h1>Here I am</h1>
    </div>
  );
}
