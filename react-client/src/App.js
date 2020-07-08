import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Register from './Register'
import withAuth from './withAuth'
import Home from './Home'
import AppDashboard from './AppDashboard'

function App() {
  return (
    <div>
        <Switch>
          <Route path="/" exact component={withAuth(Home)}/>
          <Route path="/appDashboard" exact component={withAuth(AppDashboard)}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
        </Switch>
      </div>
  );
}

export default App;
