const express = require("express");
const router = express.Router();
const gvar = require('../../variables')



router.get('/fptCurrentvals/values', function (req, res) {

  var MongoClient = require('mongodb').MongoClient;
  var url = gvar.standardConnectionString;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

     var query = {id: "fpt_currentvals" };
   //  var jobcard_arr=[];
     var count;
    var routingArray = [];
     dbo.collection("F_CurrentVals").find(query).toArray(function(err, data){

      if (err) throw err;
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
  });


});






function GetRouteData(path, routeID){
  router.get(path, function (req,res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = gvar.standardConnectionString;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
       var dbo = db.db("HawkEye");

      var query = {id: routeID};
      var routingArray=[]
      dbo.collection("FPT_CurrentVals").find(query).toArray(function(err,data){

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
}







GetRouteData("/coegaidzt/values",'nmbm_cidzt_fpt')
GetRouteData("/fmtower/values",'nmbm_fmt_fm')
GetRouteData("/gamtoos-bridge/values",'nmbm_gt_brg_fpt')
GetRouteData("/uitenhage-flow-chamber/values",'nmbm_uit_fc_fpt')
GetRouteData("/jeffreysBay/values","jeffreys_bay")

GetRouteData("/fptsites/gamtoos-break-water","nmbm_gbw_fpt")











module.exports = router;
