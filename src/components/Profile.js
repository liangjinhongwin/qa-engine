import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

const BASE_URL = "https://qaengineapi.azurewebsites.net/api/";

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
            <th>
              Questions you asked:&nbsp;
              {profile.questions && profile.questions.length > 0 ?
                <button className="btn btn-success btn-sm" disabled>{profile.questions.length}</button> :
                <button className="btn btn-secondary btn-sm" disabled>0</button>
              }
            </th>
            <td>
              {profile.questions && profile.questions.map((question, index) =>
                <span key={index}>
                  <Link to={{ pathname: `question/id=${question.id}`, state: question }} className="text-decoration-none">{question.description}</Link>
                  <p className="text-muted">{question.createdOn}</p>
                </span>
              )}

            </td>
          </tr>
          <tr>
            <th>
              Questions you answered:&nbsp;
              {profile.answers && profile.answers.length > 0 ?
                <button className="btn btn-success btn-sm" disabled>{profile.answers.length}</button> :
                <button className="btn btn-secondary btn-sm" disabled>0</button>
              }
            </th>
            <td>
              {profile.answers && profile.answers.map((answer, index) =>
                <span key={index}>
                  <Link to={{ pathname: `question/id=${answer.question.id}`, state: answer.question }} className="text-decoration-none">{answer.question.description}</Link><br />
                  <strong>{answer.description}</strong>
                  <p className="text-muted">{answer.createdOn}</p>
                </span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Profile;