import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { registerIntercepts, setAuthHeaders } from './apis/axios';
import Dashboard from './components/Dashboard';
import CreatePoll from './components/Polls/CreatePoll';
import PageLoader from './components/PageLoader';
import { ToastContainer } from 'react-toastify';
import ShowPoll from './components/Polls/ShowPoll';
import EditPoll from './components/Polls/EditPoll';
import Signup from './components/Authentication/Signup';
import Login from "./components/Authentication/Login";
import { either, isEmpty, isNil } from "ramda";
import { getFromLocalStorage } from './helpers/storage';

function App() {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if(loading){
    return(
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      {
        isLoggedIn ? (
          <Switch>
            <Route exact path="/">
              <Dashboard isLoggedIn={isLoggedIn} />
            </Route>
            <Route exact path="/polls/:slug/show">
              <ShowPoll isLoggedIn={isLoggedIn} />
            </Route>
            <Route exact path="/polls/create">
              <CreatePoll isLoggedIn={isLoggedIn} />
            </Route>
            <Route exact path="/polls/:slug/edit">
              <EditPoll isLoggedIn={isLoggedIn} />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <Dashboard isLoggedIn={isLoggedIn} />
            </Route>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
        )
      }
    </Router>
  );
}

export default App;
