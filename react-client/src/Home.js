import React, { Component } from 'react';
import {baseServerURL} from './constants'
import { Link, Route, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
          <AppBar position="static" style = {{width : '100%', 'background':'#01579b'}}>
              <Toolbar>
                  <p>Template App Service</p>
              </Toolbar>
          </AppBar>
      </div>
    )
  }
}
