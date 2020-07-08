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
      appName : localStorage.getItem('appId').split('_')[0],
      appId : localStorage.getItem('appId'),
      users : [],
      items: [],
      orders: [],
    };
  }

  componentDidMount() {

  }

  render() {
      return (
        <div>
            <AppBar position="static" style = {{width : '100%', 'background':'#01579b'}}>
                <Toolbar>
                    <p>{this.state.appName}</p>
                </Toolbar>
            </AppBar>
            <AppBar position="static" style = {{width : '100%', 'background':'#546e7a'}}>
                <Toolbar>
                <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#546e7a", "color" : "#FFFFFF", 'margin':'5px'}} disableElevation>Items</Button>
                <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#546e7a", "color" : "#FFFFFF", 'margin':'5px'}} disableElevation>Users</Button>
                <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#546e7a", "color" : "#FFFFFF", 'margin':'5px'}} disableElevation>Orders</Button>
                </Toolbar>
            </AppBar>
        </div>
      )
    }
}
