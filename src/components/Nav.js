import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  const logout = () => {
    alert("Good bye!");
    sessionStorage.clear();
    props.auth.setAuth(null);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">Q&A Engine</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {props.auth.auth && 
            <ul className="navbar-nav ml-auto">
              <li className="nav-item" data-toggle="collapse" data-target="#navbarNav">
                <span className="nav-link text-white">Hello, {sessionStorage.getItem("auth_user")}!</span>
              </li>
              <li className="nav-item" data-toggle="collapse" data-target="#navbarNav">
                <Link to="/profile" className="nav-link"><button className="btn btn-info btn-sm">Profile</button></Link>
              </li>
              <li className="nav-item" data-toggle="collapse" data-target="#navbarNav">
                <Link to="/login" className="nav-link"><button className="btn btn-warning btn-sm" onClick={() => { logout() }}>Log out</button></Link>
              </li>
            </ul>
          }
        </div>
      </nav>
    </div>
  );
}

export default Nav;