var Waterline = require('waterline');
var sailsMysqlAdapter = require('sails-mysql');

var waterline = new Waterline();
var data023 = Waterline.Collection.extend({
    identity: 'record',
    datastore: 'default',
    primaryKey: 'id',

    attributes: {
        id: {
            type: 'number',
            autoMigrations: {autoIncrement: true}
        },
        jobName023: {type:'string'},
        partId023: {type:'number'},
        qty023: {type:'number'},
    }
});

waterline.registerModel(data023);

var config = {
    adapters: {
      'mysql': sailsMysqlAdapter
    },
  
    datastores: {
      default: {
        adapter: 'mysql'
      }
    }
  };
// let data023 = [
//     {jobName023: "Job1023", partId023: 1023, qty023: 55},
//     {jobName023: "Job2023", partId023: 2023, qty023: 100},
//     {jobName023: "Job3023", partId023: 3023, qty023: 200}
// ]
  
module.exports = {

    getAll023:function(req, res) {
        res.send(data023)
    },
    
    getRecordByIds023 : function(req, res) {
        var flag023 = 0;
        for(var i = 0; i < data023.length; i++) {
  
            if(data023[i].jobName023 == req.params.jobName023 
            && data023[i].partId023 == parseInt(req.params.partId023)) {
          
                flag023 = 1;
                var obj023 = data023[i];
            }
        }
  
        if(flag023 == 1) {
            res.send(obj023);
        }
  
        if(flag023 == 0){
            res.send({
                code:"404",
                message:"Record Not Found"
            })
        }
    },
    
    addRecord023 : function(req, res) {
        var flag = 0;
        for(var i = 0; i < data023.length; i++) {
            if(data023[i].jobName023 == req.params.jobName023 
            && data023[i].partId023 == parseInt(req.params.partId023)) {
                flag= 1;
            }
        }
  
        if(flag == 1) {
            res.send({
                code:"400",
                message:"ID already exist"
            })
        }
  
        if(flag == 0) {
            var record023 = {
                jobName023:req.body.jobName023, 
                partId023: parseInt(req.body.partId023),
                qty023: parseInt(req.body.qty023)
            }
            data023.push(record023)
            res.send(data023[data023.length-1])
        }
    },
    
    viewData023: function(req, res) {
        if(!data023) {
            res.send("Cannot find anything to show!")
        }
        if(data023) {
            res.view("pages/viewData", {data023:data023})
        }
    },
    
    addData023: function(req, res) {
        var flag = 0;
        for(var i = 0; i < data023.length; i++) {
            if(data023[i].jobName023 == req.params.jobName023 
            && data023[i].partId023 == parseInt(req.params.partId023)) {
                flag= 1;
            }
        }
    
        if(flag == 1) {
            res.send({
                code:"400",
                message:"ID already exist"
            })
        }
    
        if(flag == 0) {
            var record023 = {
                jobName023:req.body.jobName023, 
                partId023: parseInt(req.body.partId023),
                qty023: parseInt(req.body.qty023)
            }
            data023.push(record023)
            res.redirect("/viewData023")
        }
    }
}