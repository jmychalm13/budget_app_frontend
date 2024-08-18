import axios from "axios";
import { useState, useEffect } from "react";

export function FinancialSummary() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomeSummaryData, setIncomeSummaryData] = useState([]);

  // todo: create loader

  // const handleFetchData = () => {
  //   axios
  //     .get("http://localhost:3000/incomes.json")
  //     .then((response) => {
  //       setIncomes(response.data);
  //     })
  //     .then(() => {
  //       axios
  //         .get("http://localhost:3000/expenses.json")
  //         .then((response) => {
  //           setExpenses(response.data);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching expenses", error);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching data", error);
  //         });
  //     });
  // };

  const handleFetchData = () => {
    axios.get("http://localhost:3000/incomes.json").then((response) => {
      const fetchedIncomes = response.data;
      setIncomes(fetchedIncomes);
      const summary = incomeSummary(fetchedIncomes);
      setIncomeSummaryData(summary);

      return axios
        .get("http://localhost:3000/expenses.json")
        .then((response) => {
          setExpenses(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    });
  };

  const incomeSummary = (incomes) => {
    let sources = incomes.reduce((acc, income) => {
      const { source, amount } = income;

      const numericAmount = parseFloat(amount);

      // find the existing entry for the source
      let sourceEntry = acc.find((entry) => entry.source === source);
      // if the source entry doesn't exist, create it
      if (!sourceEntry) {
        sourceEntry = { source, total: 0, incomes: [] };
        acc.push(sourceEntry);
      }
      // add the incomes to the corresponding source entry
      sourceEntry.incomes.push(income);
      sourceEntry.total += isNaN(numericAmount) ? 0 : numericAmount;

      return acc;
    }, []);
    return sources;
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
        <div className="income-summary">
          <h3>Totals By Source</h3>
          {incomeSummaryData.map((summary, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div>
                <p className="font-bold">{summary.source}</p>
              </div>
              <div>{summary.total}</div>
            </div>
          ))}
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
