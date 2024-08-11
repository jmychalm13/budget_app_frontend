import axios from "axios";
import { useState, useEffect } from "react";
import { IncomesIndex } from "./IncomesIndex";
import { IncomesNew } from "./IncomesNew";

export function Content() {
  const [incomes, setIncomes] = useState([]);

  const handleIndexIncomes = () => {
    axios.get("http://localhost:3000/incomes.json").then((response) => {
      console.log(response.data);
      setIncomes(response.data);
    });
  };

  const handleCreateIncome = (params, successCallback) => {
    axios.post("http://localhost:3000/incomes.json", params).then((response) => {
      console.log(response);
      setIncomes([...incomes, response.data]);
      successCallback();
    });
  };

  useEffect(handleIndexIncomes, []);

  return (
    <div>
      <h1>Welcome to Savr</h1>
      <IncomesNew onCreateIncome={handleCreateIncome} />
      <IncomesIndex incomes={incomes} />
    </div>
  );
}
