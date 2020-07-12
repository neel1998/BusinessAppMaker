const appRoutes = require('express').Router();
var AppDatabase = require('../appDatabase')
var MainDatabase = require('../mainDatabase')
var util = require('util')
var exec = require('child_process').exec
var child;

appRoutes.get("/checkToken", (req, res) => {
	res.status(200).send("Token verified");
})

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

appRoutes.post('/getMyOrders', (req, res) => {
  let appId = req.headers['appid']
  var database = new AppDatabase(appId);
  database.getMyOrders(appId, req.body).then((row) => {
    res.status(200).json(row)
  }).catch((err) => {
    res.status(400).send(err.message)
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

appRoutes.post('/deliverOrder', (req, res) => {
  let appId = req.headers['appid']
  var database = new AppDatabase(appId);
  database.deliverOrder(appId, req.body).then(() => {
    res.status(200).json("Order Updated successfully")
  }).catch((err) => {
    res.status(400).send(err)
  })
})

appRoutes.post('/getApps', (req, res) => {
  var database = new MainDatabase();
  database.getApps(req.body).then((rows) => {
    res.status(200).json(rows)
  }).catch((err) => {
    res.status(400).send(err)
  })
})

appRoutes.get('/getOwnerApk', (req, res) => {
	let appId = req.headers['appid']
	let appName = appId.split("_")[0] + "_owner"
	let appPath = '/home/neel/AndroidStudioProjects/TemplateOwnerApp/'
	let command = 'bash ' + appPath + 'make_apk.sh {\\"appId\\":\\"' + appId + '\\"} ' + appName
	child = exec(command, // command line argument directly in string
	  function (error, stdout, stderr) {      // one easy function to capture data/errors
	    if (error !== null) {
				res.status(400).send("Error generating APK")
			} else {
				res.download(appPath + '/app/build/outputs/apk/debug/' + appName + '.apk')
			}
	});
	// res.download(appPath + '/app/build/outputs/apk/debug/' + appName + '.apk')
})

appRoutes.get('/getCustomerApk', (req, res) => {
	let appId = req.headers['appid']
	let appName = appId.split("_")[0] + "_customer"
	let appPath = '/home/neel/AndroidStudioProjects/TemplateCustomerApp/'
	let command = 'bash ' + appPath + 'make_apk.sh {\\"appId\\":\\"' + appId + '\\"} ' + appName
	child = exec(command, // command line argument directly in string
	  function (error, stdout, stderr) {      // one easy function to capture data/errors
	    if (error !== null) {
				res.status(400).send("Error generating APK")
			} else {
				res.download(appPath + '/app/build/outputs/apk/debug/' + appName + '.apk')
			}
	});
	// res.download(appPath + '/app/build/outputs/apk/debug/' + appName + '.apk')
})

module.exports = appRoutes;
