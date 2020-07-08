const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const sha256 = require('sha256')

var mainPath = path.resolve('./Databases')

class MainDatabase {
  constructor() {
    var mainDatabase = new sqlite3.Database(mainPath + '/mainDatabase.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    	if (err) {
    		console.log(err.message);
    	} else {
    		mainDatabase.run('CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL, username VARCHAR(80) NOT NULL, psswd VARCHAR(80) NOT NULL, name VARCHAR(80) NOT NULL, email VARCHAR(250) NOT NULL, PRIMARY KEY (id))');
    	  mainDatabase.run('CREATE TABLE IF NOT EXISTS app_meta_data (id INTEGER NOT NULL, userId INTEGER NOT NULL, appName VARCHAR(250) NOT NULL, date VARCHAR(100) NOT NULL, description TEXT NOT NULL, PRIMARY KEY (id))');
    	}
    });
  }

  login(body) {
    return new Promise( (res,rej) => {
      var database = new sqlite3.Database(mainPath + '/mainDatabase.db', (err) => {
      	if (err) {
          rej(err.message)
      	} else {
          database.get("select * from users where username = ?", [body.username], (err, row) => {
      			if (err) {
      				rej(err.message);
      			} else {
      				if (row == undefined) {
      				 rej("Invalid Credentials");
      				} else {
      					if (sha256(body.psswd) == row.psswd) {
      						res();
      					} else {
      						rej("Invalid Credentials");
      					}
      				}
      			}
      		});
      	}
      });


    })
  }

  register(body) {
    return new Promise((res, rej) => {
      var database = new sqlite3.Database(mainPath + '/mainDatabase.db', (err) => {
        if (err) {
      		rej(err.message);
      	} else {
          database.get("select * from users where username = ?", [body.username], (err, row) => {
        		if (err) {
              rej(err.message)
        		} else {
        			if (row == undefined) {
        				var vals = [body.username, sha256(body.psswd), body.name, body.email]
        				database.run("INSERT INTO users (username, psswd, name, email) VALUES (?,?,?,?)", vals, (err, result) => {
        					if (err) {
                    rej(err.message)
        					} else {
                    res()
        					}
        				});
        			} else {
        				rej("Username Already taken")
        			}
        		}
        	});
      	}
      });
    })
  }

  addApp(body) {
    return new Promise((res, rej) => {
      var database = new sqlite3.Database(mainPath + '/mainDatabase.db', (err) => {
        if (err) {
          rej(err.message)
        } else {
          database.get("select * from app_meta_data where appName = ?", [body.appName], (err, row) => {
        		if (err) {
              rej(err.message)
        		} else {
        			if (row == undefined) {
        				var vals = [body.userId, body.appName, body.date, body.description]
        				database.run("INSERT INTO app_meta_data (userId, appName, date, description) VALUES (?,?,?,?)", vals, (err, result) => {
        					if (err) {
                    rej(err.message)
        					} else {
                    res()
        					}
        				});
        			} else {
        				rej("Application name Already taken")
        			}
        		}
        	});
        }
      })
    })
  }
}



module.exports = MainDatabase;
