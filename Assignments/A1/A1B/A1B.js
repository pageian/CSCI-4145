const express023 = require('express');

const info023 = [
  {jobName023: "Job1023", partId023: 1023, qty023: 55},
  {jobName023: "Job2023", partId023: 2023, qty023: 100},
  {jobName023: "Job3023", partId023: 3023, qty: 200}
];

const app023 = express023();
app023.use(express023.json());

app023.get('/', (req023, res023) => {
  res023.send(JSON.stringify(info023));
});

app023.get('/:jobName023/:partId023', (req023, res023) => {
  var recordIndex023 = findInfoRecord023(req023.params.jobName023, req023.params.partId023);

  if(recordIndex023 >= 0) {
    res023.send(JSON.stringify(info023[recordIndex023]));
  } else {
    res023.statusCode = 400;
    res023.send('Error: Could not retrieve record info');
  }
});

app023.post('/', (req023, res023) => {

  var job023 = req023.body.jobName023;
  var part023 = req023.body.partId023;
  var quantity023 = req023.body.qty023;

  if(job023 !== null && part023 !== null && quantity023 !== null) {
    var recordIndex023 = findInfoRecord023(job023, part023);

    if(recordIndex023 < 0) {
      info023.push({jobName023: job023, partId023: part023, qty023: quantity023});
      res023.send(JSON.stringify(info023));
    } else {
      res023.statusCode = 400;
      res023.send('Error: duplicate record');
    }

  } else {
    res023.statusCode = 400;
    res023.send('Error: null arguments');
  }
});

app023.put('/', (req023, res023) => {

  var job023 = req023.body.jobName023;
  var part023 = req023.body.partId023;
  var qty023 = req023.body.qty023;

  if(job023 !== null && part023 !== null && qty023 !== null) {
    var recordIndex023 = findInfoRecord023(job023, part023);

    if(recordIndex023 >= 0) {
      info023[recordIndex023].qty023 = qty023;
      res023.send(JSON.stringify(info023));
    } else {
      res023.statusCode = 400;
      res023.send('Error: record not found');
    }
  } else {
    res023.statusCode = 400;
    res023.send('Error: null arguments');
  }
});

function findInfoRecord023(jobName023, partId023) {
  
  var index023 = -1;
  for(i = 0; i < info023.length; i++) {
    if(info023[i].jobName023 === jobName023 && info023[i].partId023.toString() === partId023.toString()) {
      index023 = i;
      break;
    }
  }
  return index023;
}

app023.listen(3000, () => console.log('Listening on port 3000...'));
