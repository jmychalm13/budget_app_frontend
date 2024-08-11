/* eslint-disable react/prop-types */
export function IncomesIndex(props) {
  return (
    <div>
      <h1>All Incomes</h1>
      {props.incomes.map((income) => (
        <div key={income.id}>
          <h1>{income.source}</h1>
          <h2>{income.amount}</h2>
        </div>
      ))}
    </div>
  );
}
