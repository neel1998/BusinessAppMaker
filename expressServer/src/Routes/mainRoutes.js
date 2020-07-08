const mainRoutes = require('express').Router();
var MainDatabase = require('../mainDatabase')
var AppDatabase = require('../appDatabase')

mainRoutes.post('/login', (req, res) => {
  var mainDatabase = new MainDatabase();
  mainDatabase.login(req.body).then(() => {
    res.status(200).send("Loging successful")
  }).catch((err) => {
    res.status(400).send(err)
  })
})

mainRoutes.post('/register', (req, res) => {
  var mainDatabase = new MainDatabase();
  mainDatabase.register(req.body).then(() => {
    res.status(200).send("Register successful")
  }).catch((err) => {
    res.status(400).send(err)
  })
})

mainRoutes.post('/addApp', (req, res) => {
  var mainDatabase = new MainDatabase();
  mainDatabase.addApp(req.body).then((result) => {
    let appId = req.body.appName + '_' + req.body.userId;
    var appDatabase = new AppDatabase(appId);
    appDatabase.createDb(appId).then(()=>{
      res.status(200).send("Application added successfully")
    }).catch((err) => {
      res.status(400).send(err)
    })
  }).catch((err) => {
    res.status(400).send(err)
  })
})

module.exports = mainRoutes;
