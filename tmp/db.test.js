


const sqlite3 = require('sqlite3').verbose();
 
// open database in memory
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});
 
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});


// create another db
let db = new sqlite3.Database("/tmp/mydb.sqlite3", (err) => { 
        if (err) { 
                    console.log('Error when creating the database', err) 
                } else { 
                            console.log('Database created!') 
                            /* Put code to create table(s) here */
                            //createTable()
                        } 
});


const createTable = () => {
        console.log("create database table contacts");
        db.run("CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)",  insertData);
}


const insertData = () =>{
        console.log("Insert data")
        db.run('INSERT INTO contacts (name) VALUES (?)', ["contact 001"]);
}


read = () => {
        console.log("Read data from contacts");
        db.all("SELECT rowid AS id, name FROM contacts", function(err, rows) {
                    rows.forEach(function (row) {
                                    console.log(row.id + ": " + row.name);
                                });
                });
}





