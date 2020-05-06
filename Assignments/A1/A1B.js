const express = require('express');

const info = [
  {jobName: "Job1", partId: 1, qty: 55},
  {jobName: "Job2", partId: 2, qty: 100},
  {jobName: "Job3", partId: 3, qty: 200}
];

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send(JSON.stringify(info));
});

app.get('/:jobName/:partId', (req, res) => {
  var recordIndex = findInfoRecord(req.params.jobName, req.params.partId);

  if(recordIndex >= 0) {
    res.send(JSON.stringify(info[recordIndex]));
  } else {
    res.statusCode = 400;
    res.send('Error: Could not retrieve qty info');
  }
});

app.post('/', (req, res) => {

  var job = req.body.jobName;
  var part = req.body.partId;
  var quantity = req.body.qty;

  if(job !== null && part !== null && quantity !== null) {
    var recordIndex = findInfoRecord(job, part);

    if(recordIndex < 0) {
      info.push({jobName: job, partId: part, qty: quantity});
      res.send(JSON.stringify(info));
    } else {
      res.statusCode = 400;
      res.send('Error: duplicate record');
    }

  } else {
    res.statusCode = 400;
    res.send('Error: null arguments');
  }
});

app.put('/', (req, res) => {

  var job = req.body.jobName;
  var part = req.body.partId;
  var quantity = req.body.qty;

  if(job !== null && part !== null && quantity !== null) {
    var recordIndex = findInfoRecord(req.body.jobName, req.body.partId);

    if(recordIndex >= 0) {
      info[recordIndex].qty = req.body.qty;
      res.send(JSON.stringify(info));
    } else {
      res.statusCode = 400;
      res.send('Error: record not found');
    }
  } else {
    res.statusCode = 400;
    res.send('Error: null arguments');
  }
});

function findInfoRecord(jobName, partId) {
  
  var index = -1;
  for(i = 0; i < info.length; i++) {
    if(info[i].jobName === jobName && info[i].partId.toString() === partId.toString()) {
      index = i;
      break;
    }
  }
  return index;
}

app.listen(3000, () => console.log('Listening on port 3000...'));
