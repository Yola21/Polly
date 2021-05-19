import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { registerIntercepts, setAuthHeaders } from './apis/axios';
import Dashboard from './components/Dashboard';
import CreatePoll from './components/Tasks/CreatePoll';
import PageLoader from './components/PageLoader';
import { ToastContainer } from 'react-toastify';
import ShowPoll from './components/Tasks/ShowPoll';
import EditPoll from './components/Tasks/EditPoll';

function App() {
  const [loading, setLoading] = useState(true);

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
        <Route exact path="/" render={() => <div>Yola Yash this side!</div>} />
        <Route exact path="/polls/:slug/show" component={ShowPoll} />
        <Route exact path="/polls/create" component={CreatePoll} />
        <Route exact path="/polls/:slug/edit" component={EditPoll} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
