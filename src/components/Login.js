import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const BASE_URL = "https://qaengineapi.azurewebsites.net/api/";

const Login = (props) => {
  const signup = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === "" || password === "") {
      alert("Username and password are required");
      return;
    }

    await fetch(BASE_URL + "Login", {
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
          alert("Login successfully!");
          sessionStorage.setItem("auth_user", username);
          props.auth.setAuth(sessionStorage.getItem("auth_user"));
          props.history.push("/");
        }
        else {
          alert("Login Failed!");
        }
      });
  }

  if (props.auth.auth) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1 className="text-center mt-5">Welcome to Q&A Engine!</h1>
      <div className="d-flex justify-content-center mt-5">
        <div className="border border-dark rounded bg-white">
          <form onSubmit={signup}>
            <h4 className="text-center">Sign In</h4>
            <div className="form-group d-flex justify-content-center">
              <input type="text" id="username" placeholder="Username" />
            </div>
            <div className="form-group d-flex justify-content-center">
              <input type="password" id="password" placeholder="Password" />
            </div>
            <div className="form-group d-flex justify-content-center">
              <button type="submit" className="btn btn-primary btn-sm">Sign in</button>
            </div>
          </form>
          <p>Don't have an account? Register <Link to="/register" className="text-decoration-none">here</Link>.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;