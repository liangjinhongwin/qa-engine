import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const BASE_URL = "https://qaengineapi.azurewebsites.net/api/"

const register = (props) => {
  const signup = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const rePassword = e.target.rePassword.value;

    if (username === "" || password === "") {
      alert("Username and password are required");
      return;
    }

    if (password !== rePassword) {
      alert("Please confrim password");
      return;
    }

    await fetch(BASE_URL + "Login/SignUp", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "UserName": username,
        "Password": password
      })
    })
      .then(response => {
        if (response.status === 200) {
          alert("Sign up successfully!");
          props.history.push("/login");
        }
      });
  }

  if (sessionStorage.getItem("auth_user")) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1 className="text-center mt-5">Welcome to Q&A Engine!</h1>
      <div className="d-flex justify-content-center mt-5">
        <div className="border border-dark rounded bg-white">
          <form onSubmit={signup}>
            <h4 className="text-center">Register</h4>
            <div className="form-group d-flex justify-content-center">
              <input type="text" id="username" placeholder="Username" />
            </div>
            <div className="form-group d-flex justify-content-center">
              <input type="password" id="password" placeholder="Password" />
            </div>
            <div className="form-group d-flex justify-content-center">
              <input type="password" id="rePassword" placeholder="Re-type Password" />
            </div>
            <div className="form-group d-flex justify-content-center">
              <button type="submit" className="btn btn-primary btn-sm">Sign up</button>
            </div>
          </form>
          <p>Have an account already? Sign in <Link to="/login" className="text-decoration-none">here</Link>.</p>
        </div>
      </div>
    </div>
  );
}

export default register;