import { Link } from "react-router-dom";
import piggyBankLogo from "/src/assets/piggy-bank.png";

export function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand text-success" to="/">
          <img className="m-2 header-logo" src={piggyBankLogo} alt="piggy bank logo" />
          Savr
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/expenses">
                Expenses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/summary">
                Summary
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
