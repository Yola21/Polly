import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { registerIntercepts, setAuthHeaders } from './apis/axios';
import Dashboard from './components/Dashboard';
import CreatePoll from './components/Tasks/CreatePoll';
import PageLoader from './components/PageLoader';
import { ToastContainer } from 'react-toastify';
import ShowPoll from './components/Tasks/ShowPoll';
import EditPoll from './components/Tasks/EditPoll';
import Signup from './components/Authentication/Signup';
import Login from "./components/Authentication/Login";
import { either, isEmpty, isNil } from "ramda";
import PrivateRoute from './components/Common/PrivateRoute';
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
      <Switch>
        <Route exact path="/polls/:slug/show" component={ShowPoll} />
        <Route exact path="/polls/create" component={CreatePoll} />
        <Route exact path="/polls/:slug/edit" component={EditPoll} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
}

export default App;
