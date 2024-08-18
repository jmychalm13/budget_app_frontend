import axios from "axios";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function FinancialSummary() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomeSummaryData, setIncomeSummaryData] = useState([]);
  const [expenseSummaryData, setExpenseSummaryData] = useState([]);

  // todo: create loader

  const handleFetchData = () => {
    axios.get("http://localhost:3000/incomes.json").then((response) => {
      const fetchedIncomes = response.data;
      setIncomes(fetchedIncomes);
      const summary = incomeSummary(fetchedIncomes);
      setIncomeSummaryData(summary);

      return axios
        .get("http://localhost:3000/expenses.json")
        .then((response) => {
          const fetchedExpenses = response.data;
          setExpenses(fetchedExpenses);
          const summary = expenseSummary(fetchedExpenses);
          setExpenseSummaryData(summary);
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

  const expenseSummary = (expenses) => {
    let categories = expenses.reduce((acc, expense) => {
      if (!expense.category || !expense.amount) {
        console.error("Invalid expense entry:", expense);
        return acc;
      }
      const { category, amount } = expense;

      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) {
        console.error("Invalid amount for expense:", amount);
      }
      let categoryEntry = acc.find((entry) => entry.category === category);

      if (!categoryEntry) {
        categoryEntry = { category, total: 0, expenses: [] };
        acc.push(categoryEntry);
      }
      categoryEntry.expenses.push(expense);
      categoryEntry.total += numericAmount;
      return acc;
    }, []);
    return categories;
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

  const generateIncomeChartData = () => {
    const labels = incomeSummaryData.map((item) => item.source);
    const dataPoints = incomeSummaryData.map((item) => item.total);

    return {
      labels: labels,
      datasets: [
        {
          label: "Income Distribution",
          data: dataPoints,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const incomeChartData = incomeSummaryData.length ? generateIncomeChartData() : null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: $${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-light">
      <h1>Financial Summary</h1>
      <div className="income-summary">
        <h1 className="text-center">Income Distribution</h1>
        <div className="w-25 container">
          {incomeChartData ? <Doughnut data={incomeChartData} options={options} /> : <p>Loading...</p>}
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
        <div>
          {expenseSummaryData.map((summary, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div>
                <p className="font-bold">{summary.category}</p>
              </div>
              <div>
                <p>{summary.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
