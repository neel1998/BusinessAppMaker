import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register'
import withAuth from './withAuth'
import Home from './Home'
import AppDashboard from './AppDashboard'
import CreateNewApp from './CreateNewApp'

function App() {
  return (
    <div>
        <Switch>
          <Route path="/" exact component={withAuth(Home)}/>
          <Route path="/createNewApp" exact component={withAuth(CreateNewApp)}/>
          <Route path="/appDashboard" exact component={withAuth(AppDashboard)}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
        </Switch>
      </div>
  );
}

export default App;
