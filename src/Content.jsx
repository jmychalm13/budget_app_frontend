import axios from "axios";
import { useState, useEffect } from "react";
import { IncomesIndex } from "./IncomesIndex";
import { IncomesNew } from "./IncomesNew";
import { ExpensesIndex } from "./ExpensesIndex";
import { Login } from "./Login";
import { Routes, Route } from "react-router-dom";

export function Content() {
  // const handleIndexExpenses = () => {
  //   axios.get("http://localhost:3000/expenses.json").then((response) => {
  //     setExpenses(response.data);
  //   });
  // };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<IncomesIndex />} />
      {/* <Route path="/incomes/new" element={<IncomesNew onCreateIncome={handleCreateIncome} />} /> */}
      {/* <Route path="/expenses" element={<ExpensesIndex expenses={expenses} />} /> */}
    </Routes>
  );
}
