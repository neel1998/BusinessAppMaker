const apiRoutes = require('express').Router();
var Database = require('../database')

apiRoutes.get('/createDb', (req, res) => {
  let appId = req.headers['appid']
  var database = new Database(appId);
  database.createDb(appId).then(()=>{
    res.status(200).send("Database created successfully")
  }).catch((err) => {
    res.status(400).send("Something went wrong")
  })
})

apiRoutes.get('/getUsers', (req, res) => {
  let appId = req.headers['appid']
  var database = new Database(appId);
  database.getUsers(appId).then((row) => {
    res.status(200).json(row)
  }).catch((err) => {
    res.status(400).send(err.message)
  })
})

apiRoutes.get('/getItems', (req, res) => {
  let appId = req.headers['appid']
  var database = new Database(appId);
  database.getItems(appId).then((row) => {
    res.status(200).json(row)
  }).catch((err) => {
    res.status(400).send(err.message)
  })
})

apiRoutes.get('/getOrders', (req, res) => {
  let appId = req.headers['appid']
  var database = new Database(appId);
  database.getOrders(appId).then((row) => {
    res.status(200).json(row)
  }).catch((err) => {
    res.status(400).send(err.message)
  })
})

apiRoutes.post('/addUser', (req, res) => {
  let appId = req.headers['appid']
  var database = new Database(appId);
  database.addUser(appId, req.body).then(() => {
    res.status(200).json("User added successfully")
  }).catch((err) => {
    res.status(400).send(err)
  })
})

//add single item
apiRoutes.post('/addItem', (req, res) => {
  let appId = req.headers['appid']
  var database = new Database(appId);
  database.addItem(appId, req.body).then(() => {
    res.status(200).json("Item added successfully")
  }).catch((err) => {
    res.status(400).send(err)
  })
})

//add item file
apiRoutes.post('/addItems', (req, res) => {
  let appId = req.headers['appid']
  var database = new Database(appId);
  database.addItems(appId, req.body).then(() => {
    res.status(200).json("All items added successfully")
  }).catch((err) => {
    res.status(400).send(err)
  })
})

apiRoutes.post('/addOrder', (req, res) => {
  let appId = req.headers['appid']
  var database = new Database(appId);
  database.addOrder(appId, req.body).then(() => {
    res.status(200).json("Order placed successfully")
  }).catch((err) => {
    res.status(400).send(err)
  })
})

module.exports = apiRoutes;
