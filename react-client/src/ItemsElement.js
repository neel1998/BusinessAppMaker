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

export default function ItemsElement(props) {
  const items = props.items
  var itemsList = []
  for (let i = 0; i < items.length; i ++ ) {
    let item = items[i]
    itemsList.push(
      <div style = {{'margin': '10px', 'padding' : '20px', 'background' : '#cfd8dc', 'height' : '150px', 'display' : 'inline-block', 'width' : '45%'}}>
          <img src = {item['imageURL']} style = {{'height' : '150px', 'width' : '150px', 'objectFit' : 'cover', 'float' : 'left', 'marginRight' : '10px'}}/>
          <div style = {{'display' : 'block'}}>
              <h3>{item.itemName}</h3>
              <p> {item.description} </p>
              <p>Price : {item.price} </p>
          </div>
      </div>
    )
  }
  return (
    <div>
    {itemsList}
    <br/>
    </div>
  )
}
