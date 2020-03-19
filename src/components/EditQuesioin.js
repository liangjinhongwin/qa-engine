import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const BASE_URL = "https://qaengineapi.azurewebsites.net/api/";

const EditQuestion = (props) => {
  const question = props.location.state;

  const submit = async (e) => {
    e.preventDefault();
    let input = e.target.description.value;

    await fetch(BASE_URL + "Question/Edit", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "UserName": sessionStorage.getItem("auth_user"),
        "Description": input,
        "Id": question.id
      })
    })
      .then(response => {
        if (response.status === 200) {
          props.history.push({ pathname: `/question/id=${question.id}`, state: question });
        }
        else {
          alert("Faided to update.");
        }
      })
  }

  if (!props.auth.auth) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Edit Question</h1>
      <form onSubmit={submit}>
        <div className="form-group">
          <input type="text" id="description" defaultValue={question.description} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">Confirm</button>
        <Link to={{ pathname: `/question/id=${question.id}`, state: question }}>
          <button className="btn btn-secondary btn-sm ml-1">Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default EditQuestion;