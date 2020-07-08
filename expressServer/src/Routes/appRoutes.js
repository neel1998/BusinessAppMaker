const appRoutes = require('express').Router();
var AppDatabase = require('../appDatabase')

appRoutes.get('/createDb', (req, res) => {
  let appId = req.headers['appid']
  var database = new AppDatabase(appId);
  database.createDb(appId).then(()=>{
    res.status(200).send("Database created successfully")
  }).catch((err) => {
    res.status(400).send("Something went wrong")
  })
})

appRoutes.get('/getUsers', (req, res) => {
  let appId = req.headers['appid']
  var database = new AppDatabase(appId);
  database.getUsers(appId).then((row) => {
    res.status(200).json(row)
  }).catch((err) => {
    res.status(400).send(err.message)
  })
})

appRoutes.get('/getItems', (req, res) => {
  let appId = req.headers['appid']
  var database = new AppDatabase(appId);
  database.getItems(appId).then((row) => {
    res.status(200).json(row)
  }).catch((err) => {
    res.status(400).send(err.message)
  })
})

appRoutes.get('/getOrders', (req, res) => {
  let appId = req.headers['appid']
  var database = new AppDatabase(appId);
  database.getOrders(appId).then((row) => {
    res.status(200).json(row)
  }).catch((err) => {
    res.status(400).send(err.message)
  })
})

appRoutes.post('/addUser', (req, res) => {
  let appId = req.headers['appid']
  var database = new AppDatabase(appId);
  database.addUser(appId, req.body).then(() => {
    res.status(200).json("User added successfully")
  }).catch((err) => {
    res.status(400).send(err)
  })
})

//add single item
appRoutes.post('/addItem', (req, res) => {
  let appId = req.headers['appid']
  var database = new AppDatabase(appId);
  database.addItem(appId, req.body).then(() => {
    res.status(200).json("Item added successfully")
  }).catch((err) => {
    res.status(400).send(err)
  })
})

//add item file
appRoutes.post('/addItems', (req, res) => {
  let appId = req.headers['appid']
  var database = new AppDatabase(appId);
  database.addItems(appId, req.body).then(() => {
    res.status(200).json("All items added successfully")
  }).catch((err) => {
    res.status(400).send(err)
  })
})

appRoutes.post('/addOrder', (req, res) => {
  let appId = req.headers['appid']
  var database = new AppDatabase(appId);
  database.addOrder(appId, req.body).then(() => {
    res.status(200).json("Order placed successfully")
  }).catch((err) => {
    res.status(400).send(err)
  })
})

module.exports = appRoutes;
