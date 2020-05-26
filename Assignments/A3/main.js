let express = require('express');
let app = express();

let dummyResp = [
    {"part_no": 0,"part_desc": "engine"},
    {"part_no": 1,"part_desc": "windshield"}
];
// a empty return from root

app.get ('/', (req, res) => {
    res.send ('Hello world from Express/Nodejs');
});

// return the array with parts (Method: GET, can be tested withbrowser directly)
app.get('/readall', function (req, res) {
    res.status(200).send(dummyResp);
});

// create a new part (Replace: part_no with the demand part no you want to search, for example:  0 ;  Replace: part_desc with the updated value)
app.post('/create/:part_no?/:part_desc?', function (req, res) {
    req.body = req.body || {};
    req.query = req.query || {};
    req.params = req.params || {};
    let req_part_no = req.body.part_no || req.query.part_no || req.params.part_no;
    let req_part_desc = req.body.part_desc || req.query.part_desc || req.params.part_desc;
    let result = dummyResp.filter(obj => {
        return obj.part_no == req_part_no
    });
    if(result.length > 0) {
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'The created item already existed (' + req_part_no +')'
        };
        res.status(409).send(messageObj);
    } else {
        let item = {
            'part_no': req_part_no,
            'part_desc': req_part_desc
        };
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no + "part_desc: " + req_part_desc,
            'Subject': 'New part added (' + req_part_desc + ')'
        };
        dummyResp.push(item);
        res.status(200).send(messageObj);
    }
});

// read a specificparthaving a part number passed as a parameter
app.get('/read/:part_no?', function (req, res) {
    req.body = req.body || {};
    req.query = req.query || {};
    req.params = req.params || {};
    let req_part_no = req.body.part_no || req.query.part_no || req.params.part_no;
    let result = dummyResp.filter(obj => {
        return obj.part_no == req_part_no
    });
    res.status(200).send(result);
});
// update a part (Replace: part_no with the demand part no you want to search, for example:  0 ;  Replace: part_desc with the updated value)
app.post('/update/:part_no?/:part_desc?', function (req, res) {
    req.body = req.body || {};
    req.query = req.query || {};
    req.params = req.params || {};
    let req_part_no = req.body.part_no || req.query.part_no || req.params.part_no;
    let req_part_desc = req.body.part_desc || req.query.part_desc || req.params.part_desc;
    let result = dummyResp.filter(obj => {
        return obj.part_no == req_part_no
    });
    if(result.length < 1) {
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'The part to be updates is not found (' + req_part_no +')'
        };
        res.status(409).send(messageObj);
    } else {
        dummyResp = dummyResp.map(obj =>
            obj.part_no == req_part_no ? {...obj, part_desc: req_part_desc} : obj);
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no + "part_desc: " + req_part_desc,
            'Subject': 'successfully update (' + req_part_no + " | " + req_part_desc + ')'
        };
        res.status(200).send(messageObj);
    }
});

// delete one part
app.post('/delete/:part_no?', function (req, res) {
    req.body = req.body || {};
    req.query = req.query || {};
    req.params = req.params || {};
    let req_part_no = req.body.part_no || req.query.part_no || req.params.part_no;
    let result = dummyResp.filter(obj => {
        return obj.part_no == req_part_no
    });
    if(result.length < 1) {
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'The deleted item is not found (' + req_part_no +')'
        };
        res.status(409).send(messageObj);
    } else {
        dummyResp = dummyResp.filter(obj => {
            return obj.part_no != req_part_no
        });
        let messageObj = {
            'Message': 'Part_no: ' + req_part_no,
            'Subject': 'successfully delete (' + req_part_no + ')'
        };
        res.status(200).send(messageObj);
    }
});

let port = process.env.PORT || 3000;
let server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});