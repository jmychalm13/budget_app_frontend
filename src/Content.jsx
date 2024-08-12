import { IncomesIndex } from "./IncomesIndex";
import { ExpensesIndex } from "./ExpensesIndex";
import { Login } from "./Login";
import { Routes, Route } from "react-router-dom";

export function Content() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<IncomesIndex />} />
      <Route path="/expenses" element={<ExpensesIndex />} />
    </Routes>
  );
}
