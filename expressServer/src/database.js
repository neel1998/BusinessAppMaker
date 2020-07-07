const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const sha256 = require('sha256');

class Database {
  constructor(appId) {
    this.appId = appId;
  }

  createDb(appId) {
    var mainPath = path.resolve('./Databases')
    return new Promise( (res,rej) => {
      var dbase = new sqlite3.Database(mainPath + '/' + appId + '.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
          console.log(err.message);
          rej(err.message)
        } else {
          dbase.run('CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL, username VARCHAR(80) NOT NULL, psswd VARCHAR(80) NOT NULL, name VARCHAR(80) NOT NULL, email VARCHAR(250) NOT NULL, address VARCHAR(80) NOT NULL, contact VARCHAR(80) NOT NULL, PRIMARY KEY (id))');
          dbase.run('CREATE TABLE IF NOT EXISTS items (id INTEGER NOT NULL, itemName VARCHAR(80) NOT NULL, price VARCHAR(100) NOT NULL, description TEXT NOT NULL, imageURL VARCHAR(400), stock INTEGER NOT NULL, PRIMARY KEY (id))');
          dbase.run('CREATE TABLE IF NOT EXISTS orders (id INTEGER NOT NULL, items TEXT NOT NULL, userID INTEGER NOT NULL, date VARCHAR(100) NOT NULL, status INTEGER NOT NULL, delivered_on VARCHAR(100), PRIMARY KEY (id))');
        }
        res();
      })
    });
  }

  getUsers(appId) {
    return new Promise((res, rej) => {
      let sql = "SELECT id,username,name,email,address,contact from users"
      var mainPath = path.resolve('./Databases')
      var dbase = new sqlite3.Database(mainPath + '/' + appId + '.db', (err) => {
        if (err) {
          rej(err)
        }
        dbase.all(sql, (err, row) => {
          if (err) {
            rej(err)
          } else {
            res(row)
          }
        })
      })
    })
  }

  getItems(appId) {
    return new Promise((res, rej) => {
      let sql = "SELECT * from items"
      var mainPath = path.resolve('./Databases')
      var dbase = new sqlite3.Database(mainPath + '/' + appId + '.db', (err) => {
        if (err) {
          rej(err)
        }
        dbase.all(sql, (err, row) => {
          if (err) {
            rej(err)
          } else {
            res(row)
          }
        })
      })
    })
  }

  getOrders(appId) {
    return new Promise((res, rej) => {
      let sql = "SELECT * from orders"
      var mainPath = path.resolve('./Databases')
      var dbase = new sqlite3.Database(mainPath + '/' + appId + '.db', (err) => {
        if (err) {
          rej(err)
        }
        dbase.all(sql, (err, row) => {
          if (err) {
            rej(err)
          } else {
            res(row)
          }
        })
      })
    })
  }

  addUser(appId, body) {
    return new Promise((res, rej) => {
      var mainPath = path.resolve('./Databases')
      var dbase = new sqlite3.Database(mainPath + '/' + appId + '.db', (err) => {
        if (err) {
          rej(err.message)
        }
        dbase.get("select * from users where username = ?", [body.username], (err, row) => {
      		if (err) {
      			rej(err.message)
      		} else {
      			if (row == undefined) {
              var vals = [body.username, sha256(body.psswd), body.name, body.email, body.address, body.contact]
              dbase.run("INSERT INTO users (username, psswd, name, email, address, contact) VALUES (?,?,?,?,?,?)", vals, (err, result) => {
      					if (err) {
                  rej(err.message)
      					} else {
      						res();
      					}
      				});
      			} else {
              rej("Username already taken");
      			}
      		}
      	});
      })
    })
  }

  addItem(appId, body) {
    return new Promise((res, rej) => {
      var mainPath = path.resolve('./Databases')
      var dbase = new sqlite3.Database(mainPath + '/' + appId + '.db', (err) => {
        if (err) {
          rej(err.message)
        }
        var vals = [body.itemName, body.description, body.imageURL, body.price, parseInt(body.stock)]
        dbase.get("INSERT into items (itemName, description, imageURL, price, stock) VALUES (?,?,?,?,?)", vals, (err, result) => {
          if (err) {
            rej(err.message)
          } else {
            res()
          }
        })
      })
    })
  }

  addItems(appId, body) {
    return new Promise((res, rej) => {
      for (let i = 0; i < body.length; i ++) {
        this.addItem(appId, body[i]).then(()=>{
            return;
        }).catch((err) => {
          rej(err)
        })
      }
      res()
    })
  }

  addOrder(appId, body) {
    return new Promise((res, rej) => {
      var mainPath = path.resolve('./Databases')
      var dbase = new sqlite3.Database(mainPath + '/' + appId + '.db', (err) => {
        if (err) {
          rej(err.message)
        }
        var vals = [body.items, parseInt(body.userId), body.date, 0, null]
        dbase.get("INSERT into orders (items, userId, date, status, delivered_on) VALUES (?,?,?,?,?)", vals, (err, result) => {
          if (err) {
            rej(err.message)
          } else {
            res()
          }
        })
      })
    })
  }

}
module.exports = Database
