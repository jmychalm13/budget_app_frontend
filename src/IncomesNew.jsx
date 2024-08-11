export function IncomesNew() {
  return (
    <div>
      <h1>New Income</h1>
      <form>
        <div>
          Source: <input type="text" name="source" />
        </div>
        <div>
          Amount: <input type="number" name="amount" />
        </div>
        <div>
          Date: <input type="date" name="date" />
        </div>
      </form>
    </div>
  );
}
