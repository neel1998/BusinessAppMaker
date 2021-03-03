const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const sha256 = require('sha256');
const mainPath = path.resolve('/home/neel/TemplateAppService/expressServer/Databases')

class AppDatabase {
  constructor(appId) {
    this.appId = appId;
  }

  createDb(appId) {
    console.log("create db called", appId)
    //var mainPath = path.resolve('./Databases')
    return new Promise( (res,rej) => {
      var dbase = new sqlite3.Database(mainPath + '/' + appId + '.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
          console.log(err.message);
          rej(err.message)
        } else {
          dbase.run('CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL, username VARCHAR(80) NOT NULL, psswd VARCHAR(80) NOT NULL, name VARCHAR(80) NOT NULL, email VARCHAR(250) NOT NULL, address TEXT NOT NULL, contact VARCHAR(80) NOT NULL, PRIMARY KEY (id))');
          dbase.run('CREATE TABLE IF NOT EXISTS items (id INTEGER NOT NULL, itemName VARCHAR(80) NOT NULL, price VARCHAR(100) NOT NULL, description TEXT NOT NULL, imageURL VARCHAR(400), stock INTEGER NOT NULL, PRIMARY KEY (id))');
          dbase.run('CREATE TABLE IF NOT EXISTS orders (id INTEGER NOT NULL, items TEXT NOT NULL, userID INTEGER NOT NULL, date VARCHAR(100) NOT NULL, status INTEGER NOT NULL, delivered_on VARCHAR(100), address TEXT NOT NULL, contact TEXT NOT NULL, total_amnt TEXT NOT NULL, PRIMARY KEY (id))');
        }
        res();
      })
    });
  }

  getUsers(appId) {
    return new Promise((res, rej) => {
      let sql = "SELECT id,username,name,email,address,contact from users"
      //var mainPath = path.resolve('./Databases')
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
      //var mainPath = path.resolve('./Databases')
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
      //var mainPath = path.resolve('./Databases')
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

  getMyOrders(appId, body) {
    return new Promise((res, rej) => {
      let sql = "SELECT * from orders WHERE userID = ?"
      //var mainPath = path.resolve('./Databases')
      var dbase = new sqlite3.Database(mainPath + '/' + appId + '.db', (err) => {
        if (err) {
          rej(err)
        }
        dbase.all(sql, [body.userID], (err, row) => {
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
      //var mainPath = path.resolve('./Databases')
      var dbase = new sqlite3.Database(mainPath + '/' + appId + '.db', (err) => {
        if (err) {
          rej(1,err.message)
        }
        dbase.get("select * from users where username = ?", [body.username], (err, row) => {
      		if (err) {
      			rej(1,err.message)
      		} else {
      			if (row == undefined) {
              var vals = [body.username, sha256(body.psswd), body.name, body.email, body.address, body.contact]
              dbase.run("INSERT INTO users (username, psswd, name, email, address, contact) VALUES (?,?,?,?,?,?)", vals, (err, result) => {
      					if (err) {
                  rej(1,err.message)
      					} else {
      						res();
      					}
      				});
      			} else {
              rej(0,"Username already taken");
      			}
      		}
      	});
      })
    })
  }

  addItem(appId, body) {
    return new Promise((res, rej) => {
      //var mainPath = path.resolve('./Databases')
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
      //var mainPath = path.resolve('./Databases')
      var dbase = new sqlite3.Database(mainPath + '/' + appId + '.db', (err) => {
        if (err) {
          rej(err.message)
        }
        var vals = [body.items, parseInt(body.userId), body.date, 0, null, body.address, body.contact, body.total_amnt]
        dbase.get("INSERT into orders (items, userId, date, status, delivered_on, address, contact, total_amnt) VALUES (?,?,?,?,?,?,?,?)", vals, (err, result) => {
          if (err) {
            rej(err.message)
          } else {
            res()
          }
        })
      })
    })
  }

  deliverOrder(appId, body) {
    return new Promise((res, rej) => {
      //var mainPath = path.resolve('./Databases')
      var dbase = new sqlite3.Database(mainPath + '/' + appId + '.db', (err) => {
        if (err) {
          rej(err.message)
        }
        var vals = [1, body.delivered_on, parseInt(body.id)]
        dbase.get("UPDATE orders SET status = ?, delivered_on = ? WHERE id = ?", vals, (err, result) => {
          if (err) {
            rej(err.message)
          } else {
            res()
          }
        })
      })
    })
  }

  login(appId, body) {
    return new Promise( (res,rej) => {
      //var mainPath = path.resolve('./Databases')
      var database = new sqlite3.Database(mainPath + '/' + appId + '.db', (err) => {
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
      						res(row);
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

}
module.exports = AppDatabase
