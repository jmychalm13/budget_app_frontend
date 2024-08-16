/* eslint-disable react/prop-types */
import { useState } from "react";

export function ExpensesNew(props) {
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateExpense(params, () => event.target.reset());
  };

  return (
    <div className="container mt-5">
      <div className="card bg-success-subtle p-4">
        <h1 className="text-center">New Expense</h1>
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between mb-3">
            <div className="">
              <label htmlFor="category">Category:</label>
            </div>
            <div className="">
              <select
                className="form-select form-select-sm mb-3 custom-width"
                aria-label=".form-select-sm"
                name="category"
                id="category"
                value={selectedExpenseCategory}
                onChange={(e) => setSelectedExpenseCategory(e.target.value)}
              >
                {props.expenseCategories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="amount" className="col-sm-2 col-form-label">
              Amount
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="amount"
                name="amount"
                placeholder="Enter expense amount"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="date" className="col-sm-2 col-form-label">
              Date
            </label>
            <div className="col-sm-10">
              <input type="date" className="form-control" id="date" name="date" placeholder="Enter expense date" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-10 d-flex justify-content-start">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
