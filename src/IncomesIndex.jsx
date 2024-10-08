/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { IncomesNew } from "./IncomesNew";

export function IncomesIndex() {
  const incomeSources = ["salary", "freelance", "investments", "other"];
  const [incomes, setIncomes] = useState([]);

  const calculateTotalIncome = (incomes) => {
    return incomes.reduce((total, income) => {
      const amount = Number(income.amount);
      return total + (isNaN(amount) ? 0 : amount);
    }, 0);
  };
  const totalIncome = calculateTotalIncome(incomes);
  const formattedTotalIncome = isNaN(totalIncome) ? 0 : totalIncome.toFixed(2);

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
    <div className="bg-light vh-100">
      <div className="container">
        <IncomesNew handleCreateIncome={handleCreateIncome} incomeSources={incomeSources} />
        <h1 className="text-center">All Income</h1>
        <table className="table border table-success">
          <thead>
            <tr>
              <th>Source</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income) => (
              <tr key={income.id}>
                <td>{income.source}</td>
                <td>{income.date}</td>
                <td>{income.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
              <td className="fw-bold">{formattedTotalIncome}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
