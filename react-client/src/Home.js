import React, { Component } from 'react';
import {baseServerURL} from './constants'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      appList : [],
      loading : true,
    };
  }

  componentDidMount() {
    var body = {
      'userId' : JSON.parse(localStorage.getItem('user'))['id']
    }
    fetch(baseServerURL + '/app/getApps', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        'Authorization' : JSON.parse(localStorage.getItem('token'))
      },
      body: JSON.stringify(body)
    }).then((res)=>{
      if (res.status === 200) {
        res.text().then((text) => {
          this.setState({
            appList : JSON.parse(text),
            loading : false
          })
        }).catch((err)=>{
          console.log(err)
          alert("Something went wrong, Please try again")
        })
      } else {
        alert("Something went wrong, Please try again")
      }
    }).catch((err)=>{
      console.log(err)
      alert("Something went wrong, Please try again")
    })
  }

  openAppDetails = (appId) => {
    console.log("AppID:" + appId)
    localStorage.setItem('appId', appId)
    this.props.history.push('/appDashboard')
  }

  logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('appId')
    this.props.history.push('/login')
  }

  openCreateNewAppComponent = () => {
    this.props.history.push('/createNewApp')
  }

  render() {
    if (this.state.loading) {
      return (
        <div style = {{'textAlign' : 'center', 'top':'50%', 'left' : '50%'}}>
          <CircularProgress />
        </div>
      )
    }
    if (this.state.appList.length === 0) {
      return (
        <div>
            <AppBar position="static" style = {{width : '100%', 'background':'#01579b'}}>
                <Toolbar>
                    <p>Template App Service</p>
                    <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#01579b", "color" : "#FFFFFF", 'marginLeft':'auto'}} disableElevation onClick = {() => this.logout()}>Logout</Button>
                </Toolbar>
            </AppBar>
            <div style = {{'textAlign' : 'center'}}>
            <p>You have not created any apps.</p>
            <Button type = 'submit' variant="contained" style = {{"backgroundColor" : "#01579b", "color": "#FFFFFF"}} onClick={this.openCreateNewAppComponent}>Create new App</Button>
            </div>
        </div>
      )
    }
    else {
      var appList = [];
      for (let i = 0; i < this.state.appList.length; i ++) {
        let d = this.state.appList[i]
        let appId = d['appName'] + '_' + d['userId']
        appList.push(
          <div style = {{'textAlign':'center', 'margin': '10px', 'padding' : '20px', 'background' : '#cfd8dc', 'width' : '150px',  'display': 'inline-block'}}>
            <h3>{d['appName']}</h3>
            <p>{d['description']}</p>
            <Button type = 'submit' variant="contained" style = {{"backgroundColor" : "#01579b", "color": "#FFFFFF"}} onClick = {() => this.openAppDetails(appId)}>Details</Button>
          </div>
        )
      }
      return (
        <div>
            <AppBar position="static" style = {{width : '100%', 'background':'#01579b'}}>
                <Toolbar>
                    <p>Template App Service</p>
                    <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#01579b", "color" : "#FFFFFF", 'marginLeft':'auto'}} disableElevation onClick = {() => this.logout()}>Logout</Button>
                </Toolbar>
            </AppBar>
            <h2 style = {{'marginLeft' : '10px'}}>My Apps</h2>
            <div style = {{'padding' : '10px'}}>
              {appList}
            </div>
            <br/>
            <div style = {{'textAlign' : 'center'}}>
              <Button type = 'submit' variant="contained" style = {{"backgroundColor" : "#01579b", "color": "#FFFFFF"}} onClick={this.openCreateNewAppComponent}>Create new App</Button>
            </div>
        </div>
      )
    }
  }
}
