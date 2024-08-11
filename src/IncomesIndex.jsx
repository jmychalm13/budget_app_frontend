/* eslint-disable react/prop-types */
const calculateTotalIncome = (incomes) => {
  return incomes.reduce((total, income) => {
    const amount = Number(income.amount);
    return total + (isNaN(amount) ? 0 : amount);
  }, 0);
};

export function IncomesIndex(props) {
  const totalIncome = calculateTotalIncome(props.incomes);
  const formattedTotalIncome = isNaN(totalIncome) ? 0 : totalIncome.toFixed(2);

  return (
    <div className="bg-light vh-100">
      <div className="container">
        <h1 className="text-center">All Income</h1>
        <table className="table table-responsive border">
          <thead>
            <tr>
              <th>Source</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {props.incomes.map((income) => (
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
      {/* {props.incomes.map((income) => (
        <div className="d-flex justify-content-between" key={income.id}>
          <p>{income.source}</p>
          <strong>{income.amount}</strong>
        </div>
      ))}
      <div className="d-flex justify-content-between">
        <p>Total:</p>
        <strong>${formattedTotalIncome}</strong>
      </div> */}
    </div>
  );
}
