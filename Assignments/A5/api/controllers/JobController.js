/**
 * JobController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    getAll023:function(req, res) {
        res.send(Job.find())
    },

    getJobByIds023 : function(req, res) {

        res.send(Job.findOne({
            where: {
                job_name: req.params.jobName023,
                part_id: req.params.partId023
            }
        }))
        
    },

    addJob023 : function(req, res) {
        Job.create({
            'job_name': req.body.jobName023,
            'part_id': parseInt(req.body.partId023),
            'quantity': parseInt(req.body.qty023)
        }).exec(function(err, rec) {
            res.redirect("/viewData023")
        }); 
    },

    updateJob023 : function(req, res) {

        Job.update({
            where: {
                job_name: req.body.jobName023,
                part_id: req.body.partId023
            }
        }).set({
            job_name: req.body.jobName023,
            part_id: req.body.partId023,
            quantity: req.body.qty023
        }).exec(function(err, rec) {
            res.redirect("/viewData023")
        }); 
    },

    viewData023: function(req, res) {
        data023 = Job.find().exec(function(err, rec) {
            if(!rec) {
                res.send("Cannot find anything to show!")
            }
            if(rec) {
                res.view("pages/viewData", {data023:rec})
            }
        }); 
    },

};

