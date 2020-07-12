const mainRoutes = require('express').Router();
var MainDatabase = require('../mainDatabase')
var AppDatabase = require('../appDatabase')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'jwtsecrettoken'


//main Login for Owners to create app
mainRoutes.post('/login', (req, res) => {
  var mainDatabase = new MainDatabase();
  mainDatabase.login(req.body).then((val) => {
    let token = jwt.sign( {id : val.id},
          JWT_SECRET,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
		res.status(200).json(
			{"msg" : "Login successful",
			"data": {
				"username" : val.username,
				"id" : val.id,
				"name" : val.name,
				"email" : val.email,
			},
			"token": token
		});
  }).catch((err) => {
    res.status(400).send(err)
  })
})

//individual Login for each appId
mainRoutes.post('/appLogin', (req, res) => {
  let appId = req.headers['appid']
  var appDatabase = new AppDatabase(appId);
  appDatabase.login(appId, req.body).then((val) => {
    let token = jwt.sign( {id : val.id},
          JWT_SECRET,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
		res.status(200).json(
			{"msg" : "Login successful",
			"data": {
				"username" : val.username,
				"id" : val.id,
				"name" : val.name,
				"email" : val.email,
        "address" : val.address,
        "contact" : val.contact
			},
			"token": token
		});
  }).catch((err) => {
    res.status(400).send(err)
  })
})

//Main register for owners
mainRoutes.post('/register', (req, res) => {
  var mainDatabase = new MainDatabase();
  mainDatabase.register(req.body).then(() => {
    res.status(200).send("Register successful")
  }).catch((err) => {
    res.status(400).send(err)
  })
})

//individual register for each app
mainRoutes.post('/appRegister', (req, res) => {
  let appId = req.headers['appid']
  var appDatabase = new AppDatabase(appId);
  appDatabase.addUser(appId, req.body).then(() => {
    res.status(200).send("Register successful")
  }).catch((code, err) => {
    if (code === 0) {
    	res.status(402).send(err)
    } else {
    	res.status(400).send(err)
    }
  })
})


mainRoutes.post('/addApp', (req, res) => {
  var mainDatabase = new MainDatabase();
  mainDatabase.addApp(req.body).then((result) => {
    let appId = req.body.appName + '_' + req.body.userId;
    var appDatabase = new AppDatabase(appId);
    appDatabase.createDb(appId).then(()=>{
      res.status(200).send("Application added successfully")
    }).catch((code, err) => {
      console.log(code, err)
      res.status(400).send(err)
    })
  }).catch((code, err) => {
    if (code === 0) {
      res.status(402).send(err)
    } else {
      res.status(400).send(err)
    }
  })
})

module.exports = mainRoutes;
