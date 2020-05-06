const http023 = require('http');
const express023 = require('express');

const info023 = [
  {jobName023: "Job1023", partId023: 1023, qty023: 55},
  {jobName023: "Job2023", partId023: 2023, qty023: 100},
  {jobName023: "Job3023", partId023: 3023, qty023: 200}
];

const app023 = express023();

app023.get('/', (req023, res023) => {
  res023.send(JSON.stringify(info023));
  res023.end();
});

app023.get('/:jobName023/:partId023', (req023, res023) => {
  var jobName023 = req023.params.jobName023;
  var partId023 = req023.params.partId023;
  var qty023 = "";

  for(i = 0; i < info023.length; i++) {
    if(info023[i].jobName023 === jobName023 && info023[i].partId023.toString() === partId023) {
      qty023 = info023[i].qty023;
      break;
    }
  }

  if(qty023 != "") {
    res023.send(JSON.stringify(qty023));
  } else {
    res023.statusCode023 = 400;
    res023.send('Error: Could not retrieve qty info');
  }
  res023.end;
});

app023.listen(3000, () => console.log('Listening on port 3000...'));
