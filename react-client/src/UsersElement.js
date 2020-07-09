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

export default function UsersElement(props) {
  const users = props.users
  var usersList = []
  for (let i = 0; i < users.length; i ++ ) {
    let user = users[i]
    usersList.push(
      <div style = {{'margin': '10px', 'padding' : '20px', 'background' : '#cfd8dc', 'display' : 'inline-block', 'width' : '28%', 'height' : '200px', 'overflow' :'hidden'}}>
              <h3><u>Name:</u> {user.name}</h3>
              <p><u>Username:</u> {user.username} </p>
              <p><u>Email:</u> {user.email} </p>
              <p><u>Contact:</u> {user.contact} </p>
              <p><u>Address:</u> {user.address} </p>
      </div>
    )
  }
  if (props.users.length === 0) {
    return (
      <div style = {{'textAlign' : 'center'}}>
        There are no users registered.
      </div>
      )
  } else {
      return (
        <div>
        {usersList}
        </div>
      )
  }
}
