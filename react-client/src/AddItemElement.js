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
import TextField from '@material-ui/core/TextField';


export default function AddItemElement(props) {

  const [itemName, setItemName] = React.useState('');
  const [itemDesc, setItemDesc] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState('');
  const [itemStock, setItemStock] = React.useState('');
  const [itemURL, setItemURL] = React.useState('');

  const addNewItem = () => {
    if (itemName.length === 0 || itemDesc.length === 0 || itemPrice.length === 0 || itemStock.length === 0 || itemURL.length === 0) {
      alert("Kindly fill all the fields")
    } else {
      var body = {
        'itemName' : itemName,
        'description' : itemDesc,
        'imageURL' : itemURL,
        'price' : itemPrice,
        'stock' : itemStock
      }
      fetch(baseServerURL + '/app/addItem', {
        method: 'POST',
        headers: {
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
  }
  return (
    <div style = {{'text-align': 'center'}}>
      <form style = {{'text-align': 'center', 'margin-top' : "50px"}}>
      <TextField
        variant="outlined"
        label = "Item Name"
        type = "text"
        name = "name"
        style = {{"width" : "100vh", "margin":"10px"}}
        placeholder = "Enter Item Name"
        value = {itemName}
        onChange = {(event) => setItemName(event.target.value)}
        required
      />
      <br/>
      <TextField
        variant="outlined"
        label = "Item Description"
        type = "text"
        name = "description"
        style = {{"width" : "100vh", "margin":"10px"}}
        placeholder = "Enter Item Description"
        value = {itemDesc}
        onChange = {(event) => setItemDesc(event.target.value)}
        required
      />
      <br/>
      <TextField
        variant="outlined"
        label = "Price"
        type = "text"
        name = "price"
        style = {{"width" : "100vh", "margin":"10px"}}
        placeholder = "Enter Item Price"
        value = {itemPrice}
        onChange = {(event) => setItemPrice(event.target.value)}
        required
      />
      <br/>
      <TextField
        variant="outlined"
        label = "Item Stock"
        type = "number"
        name = "stock"
        style = {{"width" : "100vh", "margin":"10px"}}
        placeholder = "Enter Item Stock"
        value = {itemStock}
        onChange = {(event) => setItemStock(event.target.value)}
        required
      />
      <br/>
      <TextField
        variant="outlined"
        label = "Item Image"
        type = "text"
        name = "image"
        style = {{"width" : "100vh", "margin":"10px"}}
        placeholder = "Enter Item Image URL"
        value = {itemURL}
        onChange = {(event) => setItemURL(event.target.value)}
        required
      />
      <br/>
     <Button value="Submit" variant="contained" style = {{"backgroundColor" : "#01579b", "color": "#FFFFFF"}} disableElevation onClick={addNewItem}> Add Item </Button>
    </form>
   </div>
  )
}
