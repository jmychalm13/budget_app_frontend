/* eslint-disable react/prop-types */
export function IncomesNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateIncome(params, () => event.target.reset());
  };

  return (
    <div>
      <h1>New Income</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Source: <input type="text" name="source" />
        </div>
        <div>
          Amount: <input type="number" name="amount" />
        </div>
        <div>
          Date: <input type="date" name="date" />
        </div>
        <button type="submit">Create Income</button>
      </form>
    </div>
  );
}
