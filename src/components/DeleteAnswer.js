import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const BASE_URL = "https://qaengineapi.azurewebsites.net/api/";

const DeleteAnswer = (props) => {
  const question = props.location.state.question;
  const answer = props.location.state.answer;

  const submit = async (e) => {
    e.preventDefault();

    await fetch(BASE_URL + "Answer/Delete", {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "UserName": sessionStorage.getItem("auth_user"),
        "Id": answer.id
      })
    })
      .then(response => {
        if (response.status === 200) {
          props.history.push({ pathname: `/question/id=${question.id}`, state: question });
        }
        else {
          alert("Faided to delete.");
        }
      })
  }

  if (!props.auth.auth) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Delete Answer</h1>
      <form onSubmit={submit}>
        <div className="form-group">
          <input type="text" id="description" value={answer.description} disabled className="form-control" />
        </div>
        <button type="submit" className="btn btn-danger btn-sm">Confirm</button>
        <Link to={{ pathname: `/question/id=${question.id}`, state: question }}>
          <button className="btn btn-secondary btn-sm ml-1">Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default DeleteAnswer;