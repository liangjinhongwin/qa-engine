import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

const BASE_URL = "https://qaengineapi.azurewebsites.net/api/"

const Profile = (props) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      await fetch(BASE_URL + "Login/Profile", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "UserName": sessionStorage.getItem("auth_user")
        })
      })
        .then(response => response.json())
        .then(json => {
          setProfile(json);
        });
    }
    getProfile();
  }, [])

  if (!props.auth.auth) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Profile</h1>
      <table className="table table-striped table-borderless">
        <thead>
        </thead>
        <tbody>
          <tr>
            <th>Username: </th>
            <td>{profile.userName}</td>
          </tr>
          <tr>
            <th>Join date: </th>
            <td>{profile.createdOn}</td>
          </tr>
          <tr>
            <th>Questions you asked: </th>
            <td>
              <ol>
                {profile.questions && profile.questions.map((question, index) =>
                  <li key={index}>
                    <Link to={{ pathname: `question/id=${question.id}`, state: question }} className="text-decoration-none">{question.description}</Link>
                    <p className="text-muted">{question.createdOn}</p>
                  </li>
                )}
              </ol>
            </td>
          </tr>
          <tr>
            <th>Questions you answered: </th>
            <td>
              <ol>
                {profile.answers && profile.answers.map((answer, index) =>
                  <li key={index}>
                    <Link to={{ pathname: `question/id=${answer.question.id}`, state: answer.question }} className="text-decoration-none">{answer.question.description}</Link>
                    <p>{answer.description}</p>
                    <p className="text-muted">{answer.createdOn}</p>
                  </li>
                )}
              </ol>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Profile;