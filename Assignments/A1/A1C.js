const express023 = require('express');
const mysql023 = require('mysql');
const app023 = express023();
app023.use(express023.json());

const db023 = mysql023.createConnection({
  host: '127.0.0.1',
  user: 'cunt',
  password: 'password',
  post: '3306',
  database: 'A1C'
});

db023.connect((err023) => {
  if(err023) {
    throw err023;
  }
  console.log('Mysql connected');
});

app023.get('/', (req023, res023) => {
  let sql023 = 'SELECT * FROM new_table';
  let query023 = db023.query(sql023, (err023, records023) => {
    if(err023) {
      res023.statusCode = 400;
      res023.send('Error: Could not retrieve record info');
    }
    res023.send(JSON.stringify(records023));
  });
});

app023.get('/:jobName023/:partId023', (req023, res023) => {
  var sql023 = "SELECT * FROM new_table WHERE job_name = '" + req023.params.jobName023 + "' AND part_id = " + req023.params.partId023 + " LIMIT 1";
  let query023 = db023.query(sql023, (err023, record023) => {
    if(err023 || record023.length === 0) {
      res023.statusCode = 400;
      res023.send('Error: Could not retrieve qty info');
    } else {
      res023.send(JSON.stringify(record023));
    }  
  });
});

app023.post('/', (req023, res023) => {

  var sql023 = "INSERT INTO new_table VALUES('" + req023.body.jobName023 + "', " + req023.body.partId023 + ", " + req023.body.qty023 + ")";
  let query023 = db023.query(sql023, (err023, result023) => {
    if(err023) {
      res023.statusCode = 400;
      res023.send("ERROR: " + err023.sqlMessage);
    } else {
      res023.send("Success");
    }
  });
});

app023.put('/', (req023, res023) => {

  var sql023 = "UPDATE new_table SET quantity = " + req023.body.qty023 + " WHERE job_name = '" + req023.body.jobName023 + "' AND part_id = " + req023.body.partId023; 
  let query = db023.query(sql023, (err, result) => {
    if(err) {
      res023.statusCode = 400;
      res023.send("ERROR: " + err.sqlMessage);
    }else if(result.affectedRows === 0) {
      res023.statusCode = 400;
      res023.send("ERROR: record not found");
    } else {
      res023.send("Success");
    }
  });
});

app023.listen(3000, () => console.log('Listening on port 3000...'));
