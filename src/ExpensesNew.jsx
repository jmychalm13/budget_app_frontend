import axios from "axios";

export function ExpensesNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateExpense(params, () => event.target.reset());
  };

  return (
    <div className="container m-5">
      <div className="card bg-success-subtle p-4">
        <h1 className="text-center">New Expense</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="category" className="col-sm-2 col-form-label">
              Category
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="source"
                name="category"
                placeholder="Enter expense category"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="amount" className="col-sm-2 col-form-label">
              Amount
            </label>
            <div className="col-sm-10">
              <input
                type="number"
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
              <input type="date" className="form-control" id="date" name="date" placeholder="Enter income date" />
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
