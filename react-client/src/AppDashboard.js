import React, { Component } from 'react';
import {baseServerURL} from './constants';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ItemsElement from './ItemsElement';
import UsersElement from './UsersElement';
import OrdersElement from './OrdersElement';
import AddItemElement from './AddItemElement';

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      appName : localStorage.getItem('appId').split('_')[0],
      appId : localStorage.getItem('appId'),
      users : [],
      items: [],
      orders: [],
      selected : 0,
    };
  }

  componentDidMount() {
    fetch(baseServerURL + '/app/getItems', {
      headers : {
        'appId' : this.state.appId,
        'Authorization' : JSON.parse(localStorage.getItem('token'))
      }
    }).then((res) => {
      if (res.status === 200) {
        res.text().then((text) => {
          this.setState({
            items : JSON.parse(text)
          })
        }).catch((err) => {
          console.log(err.message)
        })
      } else if (res.status === 404){
        alert("Login expired, Kindly re Login")
        this.props.history.push('/login')
      } else {
        alert("Something went wrong")
        this.props.history.push('/')
      }
    }).catch((err) => {
      console.log(err.messag)
      alert("Something went wrong")
    })

    fetch(baseServerURL + '/app/getUsers', {
      headers : {
        'appId' : this.state.appId,
        'Authorization' : JSON.parse(localStorage.getItem('token'))
      }
    }).then((res) => {
      if (res.status === 200) {
        res.text().then((text) => {
          this.setState({
            users : JSON.parse(text)
          })
        }).catch((err) => {
          console.log(err.message)
        })
      } else if (res.status === 404){
        alert("Login expired, Kindly re Login")
        this.props.history.push('/login')
      } else {
        alert("Something went wrong")
        this.props.history.push('/')
      }
    }).catch((err) => {
      console.log(err.messag)
      alert("Something went wrong")
    })

    fetch(baseServerURL + '/app/getOrders', {
      headers : {
        'appId' : this.state.appId,
        'Authorization' : JSON.parse(localStorage.getItem('token'))
      }
    }).then((res) => {
      if (res.status === 200) {
        res.text().then((text) => {
          this.setState({
            orders : JSON.parse(text)
          })
        }).catch((err) => {
          console.log(err.message)
        })
      } else if (res.status === 404){
        alert("Login expired, Kindly re Login")
        this.props.history.push('/login')
      } else {
        alert("Something went wrong")
        this.props.history.push('/')
      }
    }).catch((err) => {
      console.log(err.messag)
      alert("Something went wrong")
    })
  }

  menuSelect = (option) => {
    this.setState({
      selected: option
    })
  }

  goHome = () => {
    this.props.history.push('/')
  }

  render() {
      var body;
      if (this.state.selected === 0) {
        body = (
            <ItemsElement items = {this.state.items} />
          )
      } else if (this.state.selected === 1) {
        body = (
          <UsersElement users = {this.state.users} />
        )
      } else if (this.state.selected === 2){
        body = (
          <OrdersElement orders = {this.state.orders}/>
        )
      } else {
        body = (
          <AddItemElement />
        )
      }
      return (
        <div>
            <AppBar position="static" style = {{width : '100%', 'background':'#01579b'}}>
                <Toolbar>
                    <p>{this.state.appName}</p>
                    <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#01579b", "color" : "#FFFFFF", 'marginLeft':'auto'}} disableElevation onClick = {this.goHome}>Go Home</Button>
                </Toolbar>
            </AppBar>
            <AppBar position="static" style = {{width : '100%', 'background':'#546e7a'}}>
                <Toolbar>
                <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#546e7a", "color" : "#FFFFFF", 'margin':'5px'}} disableElevation onClick = {() => this.menuSelect(0)}>Items</Button>
                <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#546e7a", "color" : "#FFFFFF", 'margin':'5px'}} disableElevation onClick = {() => this.menuSelect(1)}>Users</Button>
                <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#546e7a", "color" : "#FFFFFF", 'margin':'5px'}} disableElevation onClick = {() => this.menuSelect(2)}>Orders</Button>
                <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#01579b", "color" : "#FFFFFF", 'marginLeft':'auto'}} disableElevation onClick = {() => this.menuSelect(3)}>Add new Item</Button>
                </Toolbar>
            </AppBar>
            {body}
        </div>
      )
    }
}
