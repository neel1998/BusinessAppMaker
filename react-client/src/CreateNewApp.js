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
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
const download = require("downloadjs");

export default class CreateNewApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      'appName' : '',
      'description': '',
      'step1' : false,
      'step2' : false
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  getOwnerApk = () => {
    var appId = this.state.appName + "_" + JSON.parse(localStorage.getItem('user'))['id'].toString()
    if (!this.state.step2) {
      alert("Please complete previous step")
    } else {
      document.getElementById("apk_dowload_text").style.display = "block"
      fetch(baseServerURL + '/app/getOwnerApk', {
        headers : {
          'appId' : appId,
          'Authorization' : JSON.parse(localStorage.getItem('token'))
        },
      }).then( async (res) => {
          document.getElementById("apk_dowload_text").style.display = "none"
          const blob = await res.blob()
          download(blob, this.state.appName + "_owner.apk")

        // console.log("Apk being downloaded")
      }).catch((err) => {
        document.getElementById("apk_dowload_text").style.display = "none"
        alert("Something went wrong while generating the apk")
        console.log("Error occurred")
      })
    }
  }

  getCustomerApk = () => {
    var appId = this.state.appName + "_" + JSON.parse(localStorage.getItem('user'))['id'].toString()
    if (!this.state.step2) {
      alert("Please complete previous step")
    } else {
      document.getElementById("apk_dowload_text").style.display = "block"
      fetch(baseServerURL + '/app/getCustomerApk', {
        headers : {
          'appId' : appId,
          'Authorization' : JSON.parse(localStorage.getItem('token'))
        },
      }).then( async (res) => {
          document.getElementById("apk_dowload_text").style.display = "none"
          const blob = await res.blob()
          download(blob, this.state.appName + "_customer.apk")
        // console.log("Apk being downloaded")
      }).catch((err) => {
        document.getElementById("apk_dowload_text").style.display = "none"
        alert("Something went wrong while generating the apk")
        console.log("Error occurred")
      })
    }
  }

  addApp = () => {
    if (this.state.appName.length === 0 || this.state.description.length === 0) {
      alert("Please fill all the required fields")
    } else {
      let d = new Date();
      var body = {
        'userId' : JSON.parse(localStorage.getItem('user'))['id'].toString(),
        'appName' : this.state.appName,
        'description' : this.state.description,
        'date': d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
      }
      console.log(JSON.stringify(body))
      fetch(baseServerURL + '/main/addApp', {
        method : 'POST',
        headers : {
          'Content-type': 'application/json',
        },
        body : JSON.stringify(body)
      }).then((res)=> {
        if (res.status === 200) {
          this.setState({
            step1: true
          })
          alert("Application is added successfully")
        }
        else if (res.status === 402) {
          alert("This app name is already taken, Please try some other name")
        }
        else {
          const error = new Error(res.error);
          throw error;
        }
      }).catch((res)=> {
        alert("Something went wrong")
      })
    }
  }

  logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('appId')
    this.props.history.push('/login')
  }

  addItemsToDb = () => {
    var appId = this.state.appName + "_" + JSON.parse(localStorage.getItem('user'))['id'].toString()
    fetch(baseServerURL + '/app/addItems', {
      method : 'POST',
      headers : {
        'appId' : appId,
        'Content-type' : 'application/json',
        'Authorization' : JSON.parse(localStorage.getItem('token'))
      },
      body : JSON.stringify(this.state.items)
    }).then((res)=>{
      if (res.status === 200) {
        // window.location.reload()
        this.setState({
          step2 : true
        })
        alert("Items added successfully")
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

  uploadFile = async (event) => {

        if (!this.state.step1) {
          alert("Please complete previous step")
          return
        }
        let file = event.target.files[0];

        var reader = new FileReader();
        var itemsDict = []
        reader.onload = function(e) {
            var content = reader.result;
            var data = content.split('\n')
            for (let i = 0; i < data.length; i ++) {
              let d = data[i].split(',')
              if (data[i].length > 0) {
                  if (d.length != 5) {
                    alert("Please upload file in correct format")
                  } else {
                    itemsDict.push(
                      {
                        'itemName' : d[0],
                        'description' : d[1],
                        'imageURL' : d[2],
                        'price' : d[3],
                        'stock' : d[4]
                      }
                    )
                  }
              }
            }
        }

        await reader.readAsText(file);
        this.setState({
          items : itemsDict
        })
    }

  render() {
      return (
        <div>
            <AppBar position="static" style = {{width : '100%', 'background':'#01579b'}}>
                <Toolbar>
                    <p>Template App Service</p>
                    <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#01579b", "color" : "#FFFFFF", 'marginLeft':'auto'}} disableElevation onClick = {() => this.logout()}>Logout</Button>
                </Toolbar>
            </AppBar>
            <div>
              <div style = {{'textAlign' : 'center', 'margin' : '10px', 'backgroundColor' : '#cfd8dc', 'width': '31%', 'height' : '350px', 'float':'left'}}>
                <h3>Step 1</h3>
                <p>Add details about your application</p>

                <form>
                      <TextField
                        variant="outlined"
                        label = "Application Name"
                        type = "text"
                        name = "appName"
                        style = {{"marginBottom":"10px"}}
                        placeholder = "Enter Application Name"
                        value = {this.state.appName}
                        onChange = {this.handleInputChange}
                        required
                      />
                      <br/>
                      <TextField
                        variant="outlined"
                        label = "Description"
                        type = "text"
                        name = "description"
                        style = {{"marginBottom":"10px"}}
                        placeholder = "Add short description"
                        value = {this.state.description}
                        onChange = {this.handleInputChange}
                        required
                      />
                      <br/>
                      <Button value="Submit" onClick = {this.addApp} variant="contained" style = {{"backgroundColor" : "#01579b", "color": "#FFFFFF"}}> Add App </Button>
                  </form>
              </div>
              <div style = {{'textAlign' : 'center', 'margin' : '10px', 'backgroundColor' : '#cfd8dc', 'width': '31%', 'height' : '350px', 'float' : 'left'}}>
                <h3>Step 2</h3>
                <p>Add Items you wish to sell</p>
                <form>
                      <p>Upload a <b>.txt or .csv</b> file with each line having following <b>5 values separated by a comma</b>,</p>
                      <ul style = {{'textAlign' : 'left'}}>
                        <li>Item Name</li>
                        <li>Item Description</li>
                        <li>Image URL</li>
                        <li>Item Price</li>
                        <li>Item Stock (Integer)</li>
                      </ul>
                      <TextField
                        type = "file"
                        style = {{"marginBottom":"10px"}}
                        onChange = {this.uploadFile}
                        required
                      />
                      <br/>
                      <Button value="Submit" onClick = {this.addItemsToDb} variant="contained" style = {{"backgroundColor" : "#01579b", "color": "#FFFFFF"}}> Add Items </Button>
                </form>

              </div>
              <div style = {{'textAlign' : 'center', 'margin' : '10px', 'backgroundColor' : '#cfd8dc', 'width': '31%', 'height' : '350px', 'float' : 'left'}}>
                <h3>Step 3</h3>
                <p>Generate APK for your Application</p>
                <Button value="Submit" variant="contained" style = {{"backgroundColor" : "#01579b", "color": "#FFFFFF", "margin" : "20px"}} onClick={this.getOwnerApk}> Owner App APK </Button>
                <br/>
                <Button value="Submit" variant="contained" style = {{"backgroundColor" : "#01579b", "color": "#FFFFFF"}} onClick = {this.getCustomerApk}> Customer App APK </Button>
              </div>
            </div>
            <p style = {{'textAlign' : 'center', 'fontSize' : '20px', 'color' : '#01579b', 'display':'none'}} id = "apk_dowload_text">Please wait apk is being generated</p>
        </div>
      )
    }
}
