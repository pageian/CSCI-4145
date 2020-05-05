const http = require('http');
const express = require('express');

const info = [
  {jobName: "Job1", partId: 1, qty: 55},
  {jobName: "Job2", partId: 2, qty: 100},
  {jobName: "Job3", partId: 3, qty: 200}
];

const app = express();

app.get('/all', (req, res) => {
  res.send(JSON.stringify(info));
    res.end();
});

app.get('/:jobName/:partId', (req, res) => {
  var jobName = req.params.jobName;
  var partId = req.params.partId;
  var qty = "";

  console.log(jobName + " : " + partId);
  for(i = 0; i < info.length; i++) {
    if(info[i].jobName === jobName && info[i].partId.toString() === partId) {
      qty = info[i].qty;
      break;
    }
  }

  if(qty != "") {
    res.send(JSON.stringify(qty));
  } else {
    res.statusCode = 400;
    res.send('Error: Could not retrieve qty info');
  }
  res.end;
});

app.listen(3000, () => console.log('Listening on port 3000...'));
