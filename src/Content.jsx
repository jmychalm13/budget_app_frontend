import axios from "axios";
import { useState, useEffect } from "react";
import { IncomesIndex } from "./IncomesIndex";
import { IncomesNew } from "./IncomesNew";
import { ExpensesIndex } from "./ExpensesIndex";
import { Login } from "./Login";
import { Routes, Route } from "react-router-dom";

export function Content() {
  const [incomes, setIncomes] = useState([]);

  const handleIndexIncomes = () => {
    axios.get("http://localhost:3000/incomes.json").then((response) => {
      setIncomes(response.data);
    });
  };

  const handleCreateIncome = (params, successCallback) => {
    axios.post("http://localhost:3000/incomes.json", params).then((response) => {
      setIncomes([...incomes, response.data]);
      successCallback();
    });
  };

  useEffect(handleIndexIncomes, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<IncomesIndex incomes={incomes} />} />
      <Route path="/incomes/new" element={<IncomesNew onCreateIncome={handleCreateIncome} />} />
      <Route path="/expenses" element={<ExpensesIndex />} />
    </Routes>
  );
}
