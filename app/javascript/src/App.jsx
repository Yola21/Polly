import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreatePoll from './components/Tasks/CreatePoll';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>Yola Yash this side!</div>} />
        <Route exact path="/polls/create" component={CreatePoll} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
