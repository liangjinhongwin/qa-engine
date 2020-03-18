import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const BASE_URL = "https://qaengineapi.azurewebsites.net/api/";

const AddAnswer = (props) => {
  const question = props.location.state;
  const submit = async (e) => {
    e.preventDefault();
    let input = e.target.description.value;

    await fetch(BASE_URL + "Answer/Create", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "UserName": sessionStorage.getItem("auth_user"),
        "Description": input,
        "QuestionId": question.id
      })
    })
      .then(response => {
        if (response.status === 200) {
          alert("Answer has been posted.");
          props.history.push({ pathname: `/question/id=${question.id}`, state: question });
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
    <div className="container">
      <h1>I want to answer...</h1>
      <form onSubmit={submit}>
        <div className="form-group">
          <input type="text" id="description" placeholder="Type something here..." className="form-control input-lg" />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">Confirm</button>
        <Link to={{ pathname: `/question/id=${question.id}`, state: question }}>
          <button className="btn btn-secondary btn-sm ml-1">Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default AddAnswer;