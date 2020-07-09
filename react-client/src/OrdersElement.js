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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default function OrdersElement(props) {

  const deliverOrder = (orderId) => {
      let d = new Date()
      var body = {
        'id' : orderId,
        'delivered_on' : d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
      }
      fetch(baseServerURL + '/app/deliverOrder/',{
        method: 'POST',
        headers : {
          'appId' : localStorage.getItem('appId'),
          'Authorization' : JSON.parse(localStorage.getItem('token')),
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(body)
      }).then((res)=>{
        if (res.status === 200) {
          window.location.reload()
        } else if (res.status === 404){
          alert("Login expired, Kindly re Login")
          window.location.replace('/login')
        } else {
          window.location.replace('/')
          alert("Something went wrong")
        }
      }).catch((err) => {
        console.log(err.messag)
        alert("Something went wrong")
      })
  }

  const orders = props.orders
  var pendingOrdersList = []
  var completedOrdersList = []
  for (let i = 0; i < orders.length; i ++ ) {
    let order = orders[i]
    let items = JSON.parse(order['items'])
    var itemsString = ""
    for (let j = 0; j < items.length; j ++ ) {
      let item = items[j]
      itemsString += item['qty'] + ' x ' + item['name'] + ','
    }
    if (order['status'] == 0) {
      pendingOrdersList.push(
        <ExpansionPanelDetails style = {{'margin' : '5px', 'backgroundColor' : '#cfd8dc' , 'display' : 'block'}}>
          <div>
            <h3><u>Order Id: </u> {order['id']}</h3>
            <p><u>Items: </u>{itemsString}</p>
            <p><u>Total Amount: </u>{order['total_amnt']}</p>
            <p><u>Date Placed: </u>{order['date']}</p>
            <p><u>Address: </u>{order['address']}</p>
            <div style = {{'textAlign' : 'center'}}>
              <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#66bb6a", "color" : "#FFFFFF", 'margin':'5px'}} disableElevation onClick = {()=> deliverOrder(order['id'])}>Mark Delivered</Button>
            </div>
          </div>
        </ExpansionPanelDetails>
      )
    } else {
      completedOrdersList.push(
        <ExpansionPanelDetails style = {{'margin' : '5px', 'backgroundColor': '#c8e6c9'}}>
          <div>
            <h3><u>Order Id: </u> {order['id']}</h3>
            <p><u>Items: </u>{itemsString}</p>
            <p><u>Total Amount: </u>{order['total_amnt']}</p>
            <p><u>Date Placed: </u>{order['date']}</p>
            <p><u>Address: </u>{order['address']}</p>
            <p><u>Delivered On: </u>{order['delivered_on']}</p>
          </div>
        </ExpansionPanelDetails>
      )
    }
  }
  if (props.orders.length === 0 ) {
      return (
        <div style = {{'textAlign' : 'center'}}>
          There are no orders placed.
        </div>
      )
  } else {
      return (
        <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
          expandIcon =  {<ExpandMoreIcon/>}>
            Pending Orders
          </ExpansionPanelSummary>
            {pendingOrdersList}
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
          expandIcon =  {<ExpandMoreIcon/>}>
            Completed Orders
          </ExpansionPanelSummary>
            {completedOrdersList}
        </ExpansionPanel>
        </div>
      )
  }
}
