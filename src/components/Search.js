import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

const BASE_URL = "https://qaengineapi.azurewebsites.net/api/";

const Search = (props) => {
  const keyword = props.match.params.keyword;
  const [questions, setQuestions] = useState(props.location.state);

  useEffect(() => {
    const getQuestions = async () => {
      await fetch(BASE_URL + `Question/Search/${keyword}`, {
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
  }, [keyword]);

  const search = (e) => {
    e.preventDefault();
    let keyword = e.target.search.value.trim();
    if (keyword === null || keyword === "") {
      alert("Please enter a keyword to search.");
      return;
    }
    props.history.push({ pathname: `search/${keyword}`, state: questions });
  }

  if (!props.auth.auth) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Search: {keyword}</h1>
      <div className="d-flex flex-wrap justify-content-between">
        <Link to="/question/create"><button className="btn btn-primary">I have a question</button></Link>
        <form onSubmit={search}>
          <div className="input-group">
            <input type="text" id="search" className="form-control" placeholder="Question" />
            <div className="input-group-append">
              <button type="submit" className="btn btn-secondary">Search</button>
            </div>
          </div>
        </form>
      </div>
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

export default Search;