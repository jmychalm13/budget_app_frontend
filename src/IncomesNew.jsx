/* eslint-disable react/prop-types */
export function IncomesNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateIncome(params, () => event.target.reset());
  };

  return (
    <div className="vh-100 container mt-5">
      <h1>New Income</h1>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="source" className="col-sm-2 col-form-label">
            Source
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="source" name="source" placeholder="Enter income source" />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="amount" className="col-sm-2 col-form-label">
            Amount
          </label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="amount" name="amount" placeholder="Enter income amount" />
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
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
