import React, { Component } from 'react';
import {baseServerURL} from './constants'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ChromePicker } from 'react-color';
const download = require("downloadjs");

export default class CreateNewApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      'appName' : '',
      'description': '',
      'step1' : false,
      'step2' : false,
      'selectedPrimaryColor' : '#008577',
      'showPrimaryColorPicker' : false,
      'selectedPrimaryDarkColor' : '#00574B',
      'showPrimaryDarkColorPicker' : false,
      'selectedAcentColor' : '#D81B60',
      'showAcentColorPicker' : false
    };
  }

  openPrimaryColorPicker = () => {
    this.setState({
      showPrimaryColorPicker : !this.state.showPrimaryColorPicker,
      showPrimaryDarkColorPicker : false,
      showAcentColorPicker: false
    })
  }

  handlePrimaryColorChange = (color) => {
    this.setState({
      selectedPrimaryColor: color.hex,
    });
  };

  openPrimaryDarkColorPicker = () => {
    this.setState({
      showPrimaryDarkColorPicker : !this.state.showPrimaryDarkColorPicker,
      showPrimaryColorPicker : false,
      showAcentColorPicker : false
    })
  }

  handlePrimaryDarkColorChange = (color) => {
    this.setState({
      selectedPrimaryDarkColor: color.hex,
    });
  };

  openAcentColorPicker = () => {
    this.setState({
      showAcentColorPicker : !this.state.showAcentColorPicker,
      showPrimaryColorPicker : false,
      showPrimaryDarkColorPicker : false
    })
  }

  handleAcentColorChange = (color) => {
    this.setState({
      selectedAcentColor: color.hex,
    });
  };

  closeAllColorPicker = () => {
    this.setState({
      showAcentColorPicker : false,
      showPrimaryColorPicker : false,
      showPrimaryDarkColorPicker : false
    })
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  getOwnerApk = () => {
    this.closeAllColorPicker()
    var appId = this.state.appName + "_" + JSON.parse(localStorage.getItem('user'))['id'].toString()
    if (!this.state.step2) {
      alert("Please complete previous step")
    } else {
      document.getElementById("apk_dowload_text").style.display = "block"
      let body = {
        'color1' : this.state.selectedPrimaryColor,
        'color2' : this.state.selectedPrimaryDarkColor,
        'color3' : this.state.selectedAcentColor
      }
      fetch(baseServerURL + '/app/getOwnerApk', {
        method : 'POST',
        headers : {
          'Content-type' : 'application/json',
          'appId' : appId,
          'Authorization' : JSON.parse(localStorage.getItem('token'))
        },
        body: JSON.stringify(body)
      }).then( async (res) => {
          const blob = await res.blob()
          download(blob, this.state.appName + "_owner.apk")
          document.getElementById("apk_dowload_text").style.display = "none"

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
      let body = {
        'color1' : this.state.selectedPrimaryColor,
        'color2' : this.state.selectedPrimaryDarkColor,
        'color3' : this.state.selectedAcentColor
      }
      fetch(baseServerURL + '/app/getCustomerApk', {
        method : 'POST',
        headers : {
          'Content-type' : 'application/json',
          'appId' : appId,
          'Authorization' : JSON.parse(localStorage.getItem('token'))
        },
        body: JSON.stringify(body)
      }).then( async (res) => {
          const blob = await res.blob()
          download(blob, this.state.appName + "_customer.apk")
          document.getElementById("apk_dowload_text").style.display = "none"
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
                  if (d.length !== 5) {
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
                    <p>BusinessAppMaker</p>
                    <Button type = 'submit' variant="contained" style = {{"backgroundColor": "#01579b", "color" : "#FFFFFF", 'marginLeft':'auto'}} disableElevation onClick = {() => this.logout()}>Logout</Button>
                </Toolbar>
            </AppBar>
            <div>
              <div style = {{'textAlign' : 'center', 'margin' : '10px', 'backgroundColor' : '#cfd8dc', 'width': '31%', 'height' : '400px', 'float':'left', 'borderRadius' : '20px'}}>
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

                <div style = {{'textAlign' : 'center','marginLeft' : 'auto', 'marginRight' : 'auto', 'width' : '70%'}}>
                        <h4>Select Colors</h4>
                        <div style = {{'float' : 'left', 'width' : '31%'}}>
                              <div style = {{'backgroundColor' : `${ this.state.selectedPrimaryColor }`, 'height' : '40px', 'width' : '40px', 'borderRadius' : '40px',  'cursor' : 'pointer', 'marginLeft' : 'auto', 'marginRight' : 'auto'}}  onClick = {this.openPrimaryColorPicker}/>
                              <p>Primary </p>
                          {this.state.showPrimaryColorPicker ?
                              <div>
                              <ChromePicker disableAlpha = {true} color={this.state.selectedPrimaryColor} onChangeComplete={this.handlePrimaryColorChange} style = {{'display' : 'inline-block', 'float' : 'left'}}/>
                              </div>
                            : null}
                        </div>

                        <div style = {{'float' : 'left',  'width' : '31%'}}>
                              <div style = {{'backgroundColor' : `${ this.state.selectedPrimaryDarkColor }`, 'height' : '40px', 'width' : '40px', 'borderRadius' : '40px', 'cursor' : 'pointer', 'marginLeft' : 'auto', 'marginRight' : 'auto'}} onClick = {this.openPrimaryDarkColorPicker}/>
                              <p>Dark</p>
                          {this.state.showPrimaryDarkColorPicker ?
                              <div>
                              <ChromePicker disableAlpha = {true} color={this.state.selectedPrimaryDarkColor} onChangeComplete={this.handlePrimaryDarkColorChange} style = {{'display' : 'inline-block', 'float' : 'left'}}/>
                              </div>
                            : null}
                        </div>

                        <div style = {{'float' : 'left',  'width' : '31%'}}>
                              <div style = {{'backgroundColor' : `${ this.state.selectedAcentColor }`, 'height' : '40px', 'width' : '40px', 'borderRadius' : '40px', 'cursor' : 'pointer', 'marginLeft' : 'auto', 'marginRight' : 'auto'}} onClick = {this.openAcentColorPicker}/>
                              <p>Accent</p>
                          {this.state.showAcentColorPicker ?
                              <div>
                              <ChromePicker disableAlpha = {true} color={this.state.selectedAcentColor} onChangeComplete={this.handleAcentColorChange} style = {{'display' : 'inline-block', 'float' : 'left'}}/>
                              </div>
                            : null}
                        </div>
                </div>
              </div>

              <div style = {{'textAlign' : 'center', 'margin' : '10px', 'backgroundColor' : '#cfd8dc', 'width': '31%', 'height' : '400px', 'float' : 'left', 'borderRadius' : '20px'}}>
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

              <div style = {{'textAlign' : 'center', 'margin' : '10px', 'backgroundColor' : '#cfd8dc', 'width': '31%', 'height' : '400px', 'float' : 'left', 'borderRadius' : '20px'}}>
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
