let parts = [
    {id:1, name:"Part1"},
    {id:2, name:"Part2"},
    {id:3, name:"Part3"}
  ]
  
  module.exports = {
    getParts:function(req, res) {
      res.send(parts)
    },
    
    getPartsByID : function(req, res) {
      var flag = 0;
      for(var i = 0; i < parts.length; i++) {
  
        if(parts[i].id == parseInt(req.params.id)) {
          flag = 1;
          varobj = parts[i];
        }
      }
  
      if(flag == 1) {
        res.send(obj);
      }
  
      if(flag == 0){
        res.send({
          code:"404",
          message:"ID Not Found"
        })
      }
    },
    
    addParts : function(req, res) {
      var flag = 0;
      for(var i = 0; i < parts.length; i++) {
        if(parts[i].id == parseInt(req.body.id)) {
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
        var part = {id:parseInt(req.body.id), name:req.body.name}
        parts.push(part)
        res.send(parts[parts.length-1])
      }
    },
    
    viewData: function(req, res) {
      if(!parts) {
        res.send("Cannot find anything to show!")
      }
      if(parts) {
        res.view("pages/viewData", {parts:parts})
      }
    },
    
    addData: function(req, res) {
      var flag = 0;
      for(var i = 0; i<parts.length; i++) {
        if(parts[i].id == parseInt(req.body.id)) {
          flag = 1;
        }
      }
      if(flag == 1) {
        res.send({
          code:"400",
          message:"ID already exist"
        })
      }
      if(flag == 0) {
        var part= {id:parseInt(req.body.id), name:req.body.name}
        parts.push(part)
        res.redirect("/viewData")
      }
    }
  }