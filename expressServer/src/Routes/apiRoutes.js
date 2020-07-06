const apiRoutes = require('express').Router();
var getDatabase = require('../database')

apiRoutes.get('/createDb', (req, res) => {
  let appId = req.headers['appid']
  var dbase = getDatabase(appId);
  if (dbase == null) {
    res.status(400).send("Something went wrong")
  } else {
    res.status(200).send("Database created successfully")
  }
})

module.exports = apiRoutes;
