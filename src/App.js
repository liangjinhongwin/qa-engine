import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Detail from './components/Detail';
import AddQuestion from './components/AddQuestion';
import EditQuestion from './components/EditQuesioin';
import AddAnswer from './components/AddAnswer';
import EditAnswer from './components/EditAnswer';
import DeleteAnswer from './components/DeleteAnswer';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Nav from './components/Nav';

const App = () => {
  const [auth, setAuth] = useState(sessionStorage.getItem("auth_user"));

  const authProps = {
    auth: auth,
    setAuth: setAuth
  }

  return (
    <Router>
      <div id="wrapper">
        <Nav auth={authProps} />
        <div className="container vh-100">
          <Switch>
            <Route path="/" exact render={(props) => <Home {...props} auth={authProps} />} />
            <Route path="/register" exact render={(props) => <Register {...props} auth={authProps} />} />
            <Route path="/login" exact render={(props) => <Login {...props} auth={authProps} />} />
            <Route path="/question/id=:id" exact render={(props) => <Detail {...props} auth={authProps} />} />
            <Route path="/question/create" exact render={(props) => <AddQuestion {...props} auth={authProps} />} />
            <Route path="/question/edit/id=:id" exact render={(props) => <EditQuestion {...props} auth={authProps} />} />
            <Route path="/answer/create" exact render={(props) => <AddAnswer {...props} auth={authProps} />} />
            <Route path="/answer/edit/id=:id" exact render={(props) => <EditAnswer {...props} auth={authProps} />} />
            <Route path="/answer/delete/id=:id" exact render={(props) => <DeleteAnswer {...props} auth={authProps} />} />
            <Route path="/profile" exact render={(props) => <Profile {...props} auth={authProps} />} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
