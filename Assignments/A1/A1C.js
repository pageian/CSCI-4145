const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'cunt',
  password: 'password',
  post: '3306',
  database: 'A1C'
});

db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('Mysql connected');
});

app.get('/', (req, res) => {
  let sql = 'SELECT * FROM new_table';
  let query = db.query(sql, (err, records) => {
    if(err) {
      res.statusCode = 400;
      res.send('Error: Could not retrieve record info');
    }
    res.send(JSON.stringify(records));
  });
});

app.get('/:jobName/:partId', (req, res) => {
  var sql = "SELECT * FROM new_table WHERE job_name = '" + req.params.jobName + "' AND part_id = " + req.params.partId + " LIMIT 1";
  let query = db.query(sql, (err, record) => {
    if(err || record.length === 0) {
      res.statusCode = 400;
      res.send('Error: Could not retrieve qty info');
    } else {
      res.send(JSON.stringify(record));
    }  
  });
});

app.post('/', (req, res) => {

  var sql = "INSERT INTO new_table VALUES('" + req.body.jobName + "', " + req.body.partId + ", " + req.body.qty + ")";
  let query = db.query(sql, (err, result) => {
    if(err) {
      res.statusCode = 400;
      res.send("ERROR: " + err.sqlMessage);
    } else {
      res.send("Success");
    }
  });

});

app.put('/', (req, res) => {

  var sql = "UPDATE new_table SET quantity = " + req.body.qty + " WHERE job_name = '" + req.body.jobName + "' AND part_id = " + req.body.partId; 
  console.log(sql);
  let query = db.query(sql, (err, result) => {
    if(err) {
      res.statusCode = 400;
      res.send("ERROR: " + err.sqlMessage);
    }else if(result.affectedRows === 0) {
      res.statusCode = 400;
      res.send("ERROR: record not found");
    } else {
      res.send("Success");
    }
  });
});

app.listen(3000, () => console.log('Listening on port 3000...'));
