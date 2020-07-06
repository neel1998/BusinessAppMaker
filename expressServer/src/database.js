const sqlite3 = require('sqlite3').verbose()
const path = require('path')

let getDatabase = (appId) => {
  var mainPath = path.resolve('./Databases')
  console.log(mainPath + '/' + appId + '.db')
  var dbase = new sqlite3.Database(mainPath + '/' + appId + '.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  	if (err) {
  		console.log(err.message);
      return null;
  	} else {
		  dbase.run('CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL, username VARCHAR(80) NOT NULL, psswd VARCHAR(80) NOT NULL, name VARCHAR(80) NOT NULL, email VARCHAR(250) NOT NULL, address VARCHAR(80) NOT NULL, contact VARCHAR(80) NOT NULL, PRIMARY KEY (id))');
      dbase.run('CREATE TABLE IF NOT EXISTS items (id INTEGER NOT NULL, itemName VARCHAR(80) NOT NULL, price VARCHAR(100) NOT NULL, imageURL VARCHAR(400), stock INTEGER NOT NULL, PRIMARY KEY (id))');
  		dbase.run('CREATE TABLE IF NOT EXISTS orders (id INTEGER NOT NULL, items TEXT NOT NULL, userID INTEGER NOT NULL, date VARCHAR(100) NOT NULL, PRIMARY KEY (id))');
  	}
    return dbase;
  });
}

module.exports = getDatabase
