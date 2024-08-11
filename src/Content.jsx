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

  useEffect(handleIndexIncomes, []);

  return (
    <div>
      <h1>Welcome to Savr</h1>
      <IncomesNew />
      <IncomesIndex incomes={incomes} />
    </div>
  );
}
