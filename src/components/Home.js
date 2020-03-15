import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

const BASE_URL = "https://qaengineapi.azurewebsites.net/api/";

const Home = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      await fetch(BASE_URL + "Question", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(json => {
          setQuestions(json.reverse());
        });
    }
    getQuestions();
  }, []);

  if (!sessionStorage.getItem("auth_user")) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Question List</h1>
      <Link to="/question/create"><button className="btn btn-primary mt-3">I have a question</button></Link>
      <div>
        <table className="table table-striped table-borderless">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answers</th>
              <th>Author</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {questions && questions.map((question, index) =>
              <tr key={index}>
                <td key={index}>
                  <Link to={{ pathname: `/question/id=${question.id}`, state: question }} className="text-decoration-none">
                    {question.description}
                  </Link>
                </td>
                <td>{question.answers && question.answers.length > 0 ? <button className="btn btn-success btn-sm" disabled>{question.answers.length}</button> : <button className="btn btn-secondary btn-sm" disabled>0</button>}</td>
                <td>{question.user.userName}</td>
                <td>{question.createdOn}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;