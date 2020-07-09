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

export default class CreateNewApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      'appName' : '',
      'description': '',
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {

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
              <div style = {{'textAlign' : 'center', 'margin' : '10px', 'backgroundColor' : '#cfd8dc', 'width': '31%', 'height' : '300px', 'float':'left'}}>
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
              <div style = {{'textAlign' : 'center', 'margin' : '10px', 'backgroundColor' : '#cfd8dc', 'width': '31%', 'height' : '300px', 'float' : 'left'}}>
                <h3>Step 2</h3>
                <p>Add Items you wish to sell</p>
              </div>
              <div style = {{'textAlign' : 'center', 'margin' : '10px', 'backgroundColor' : '#cfd8dc', 'width': '31%', 'height' : '300px', 'float' : 'left'}}>
                <h3>Step 3</h3>
                <p>Download the APK for your Application</p>
              </div>
            </div>
        </div>
      )
    }
}
