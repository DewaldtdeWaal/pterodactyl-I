const express = require("express");


const router = express.Router();

const gvar = require("../variables")

//const user = require("../models/user");




router.get("/getUsers", function (req,res) {
  console.log("I am working 1")
  const { MongoClient } = require('mongodb');
  var url = gvar.standardConnectionString;
  //So the code isn't reaching past mongoclient .connect.  the url variable is correct
  MongoClient.connect(url, function(err, db) {
    console.log("I am working 2")
    if (err) throw err;
     var dbo = db.db("HawkEye");
     console.log("Here")
    var query = {};
    var routingArray=[]
    dbo.collection("users").find(query).toArray(function(err,data){
      if(err) throw err;
      var i=0;
      while (i < data.length)
          {
            routingArray[i] =data[i]
               i++;
           }
      res.status(200).json({
        routingArray
           });
    })
  })
})


  module.exports= router;
