import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

const BASE_URL = "https://qaengineapi.azurewebsites.net/api/";

const Detail = (props) => {
  const [question, setQuestion] = useState(props.location.state);

  useEffect(() => {
    const getQuestion = async () => {
      await fetch(BASE_URL + `question/${question.id}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(json => setQuestion(json));
    }
    getQuestion();
  }, [question.id]);

  if (!props.auth.auth) {
    return <Redirect to="/login" />;
  }

  return (
    question &&
    <div>
      <div>
        <h1>Question</h1>
        <span className="text-muted">{question.createdOn} created by {question.user.userName}</span> {sessionStorage.getItem("auth_user") === question.user.userName &&
          <span>
            <Link to={{ pathname: `/question/edit/id=${question.id}`, state: question }}>
              <button className="btn btn-success btn-sm">Edit</button>
            </Link>
            <Link to={{ pathname: `/question/delete/id=${question.id}`, state: question }} className="ml-1">
              <button className="btn btn-danger btn-sm">Delete</button>
            </Link>
          </span>}
        <h4>{question.description}</h4>
      </div>
      <div className="mt-5">
        <Link to={{ pathname: `/answer/create`, state: question }}>
          <button className="btn btn-primary">I want to answer</button>
        </Link>

        {question.answers && question.answers.length > 0 &&
          <table className="table table-striped table-borderless">
            <thead>
              <tr>
                <th>Answer</th>
                <th>Author</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {question.answers.map((answer, index) =>
                <tr key={index}>
                  <td>{answer.description}</td>
                  <td>{answer.user.userName}</td>
                  <td>{answer.createdOn}</td>
                  <td>{sessionStorage.getItem("auth_user") === answer.user.userName &&
                    <span>
                      <Link to={{ pathname: `/answer/edit/id=${answer.id}`, state: { question: question, answer: answer } }}>
                        <button className="btn btn-success btn-sm">Edit</button>
                      </Link>
                      <Link to={{ pathname: `/answer/delete/id=${answer.id}`, state: { question: question, answer: answer } }} className="ml-1">
                        <button className="btn btn-danger btn-sm">Delete</button>
                      </Link>
                    </span>}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
}

export default Detail;