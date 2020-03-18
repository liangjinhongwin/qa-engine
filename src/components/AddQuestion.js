import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const BASE_URL = "https://qaengineapi.azurewebsites.net/api/";

const AddQuestion = (props) => {
  const submit = async (e) => {
    e.preventDefault();
    let input = e.target.description.value;

    await fetch(BASE_URL + "Question/Create", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "UserName": sessionStorage.getItem("auth_user"),
        "Description": input
      })
    })
      .then(response => {
        if (response.status === 200) {
          alert("Question has been posted.");
          props.history.push("/");
        }
        else {
          alert("Faided to create.");
        }
      })
  }

  if (!props.auth.auth) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>I want to ask...</h1>
      <form onSubmit={submit}>
        <div className="form-group">
          <input type="text" id="description" placeholder="Type something here..." className="form-control input-lg" />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">Confirm</button>
        <Link to="/">
          <button className="btn btn-secondary btn-sm ml-1">Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default AddQuestion;