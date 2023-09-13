// const express = require("express");


// //const databaseF = require('../database-functions')
// const router = express.Router();
// const checkAuth = require('../middleware/check-auth')


// router.get("/trends/pumpstations/crowngardens", (req,res)=>{      //
//   var MongoClient = require('mongodb').MongoClient;
//   var url = gvar.standardConnectionString;
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//      var dbo = db.db("HawkEye");

//      var dateBefore =  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//      var now =  new Date();
//      dateNow =now;
//      var query = ({ date: { $gte:new Date(dateBefore) , $lte:new Date(dateNow) } });

//      var count =0
//      var CSP_Arr=[];
//      var CDP_Arr=[];
//      var S_LVL_Arr=[];
//      var T1_LVL_Arr=[];
//      var T1_IF_Arr=[];
//      var T1_OF_Arr=[];
//      var T2_LVL_Arr=[];
//      var T2_IF_Arr=[];
//      var T2_OF_Arr=[];

//      dbo.collection("RW_CG_PS_TREND").find(query,{ projection: {
//       _id: 0,
//       date: 1,
//       common_suction_pressure: 1,
//       common_delivery_pressure: 1,
//       sump_level:1,
//       tower1_level: 1,
//       tower1_inlet_flow: 1,
//       tower1_outlet_flow: 1,
//       tower2_level: 1,
//       tower2_inlet_flow: 1,
//       tower2_outlet_flow:1,


//     } }).toArray(function(err, data){
//    if (err) throw err;

//    i = 0;
//     while (i < data.length){
//    CSP_Arr[i] =[data[i].date,data[i].common_suction_pressure]
//    CDP_Arr[i] =[data[i].date,data[i].common_delivery_pressure]
//    S_LVL_Arr[i] =[data[i].date,data[i].sump_level]
//    T1_LVL_Arr[i] =[data[i].date,data[i].tower1_level]
//    T1_IF_Arr[i] =[data[i].date,data[i].tower1_inlet_flow]
//    T1_OF_Arr[i] =[data[i].date,data[i].tower1_outlet_flow]
//    T2_LVL_Arr[i] =[data[i].date,data[i].tower2_level]
//    T2_IF_Arr[i] =[data[i].date,data[i].tower2_inlet_flow]
//    T2_OF_Arr[i] =[data[i].date,data[i].tower2_inlet_flow]
//    i++;
//      }

// count++;

// res.status(200).json({
//     CSP_Arr,
//     CDP_Arr,
//     S_LVL_Arr,
//     T1_LVL_Arr,
//     T1_IF_Arr,
//     T1_OF_Arr,
//     T2_LVL_Arr,
//     T2_IF_Arr,
//     T2_OF_Arr,
//   });
//  } );
// })

// function checkFlag() {
//   if(count != 1) {
//      setTimeout(checkFlag, 1000); /* this checks the flag every 1000 milliseconds*/
//   }
//   else {
//     db.close();
// }
// } checkFlag();
//  )







//  router.post("/trends/pumpstations/crowngardens", (req,res)=>{      //
//   var MongoClient = require('mongodb').MongoClient;
//   var url = gvar.standardConnectionString;
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//      var dbo = db.db("HawkEye");
//      var start = req.body.startDate
//      start = start + "T00:00:00.000+02:00"
//      var end = req.body.endDate
//      end = end + "T00:00:00.000+02:00"

//          var query = ({ date: { $gte:new Date(start) , $lte:new Date(end) } });
//   var now =  new Date();
//   var year = now.getFullYear();
//   var month = now.getMonth() + 1;
//   var day = now.getDate();

// date = year+"-"+month+"-"+day
// day=now.getDate()+10
// month=now.getMonth()
//      var count =0
//      var CSP_Arr=[];
//      var CDP_Arr=[];
//      var S_LVL_Arr=[];
//      var T1_LVL_Arr=[];
//      var T1_IF_Arr=[];
//      var T1_OF_Arr=[];
//      var T2_LVL_Arr=[];
//      var T2_IF_Arr=[];
//      var T2_OF_Arr=[];
//      dbo.collection("RW_CG_PS_TREND").find(query,{ projection: {
//       _id: 0,
//       date: 1,
//       common_suction_pressure: 1,
//       common_delivery_pressure: 1,
//       sump_level:1,
//       tower1_level: 1,
//       tower1_inlet_flow: 1,
//       tower1_outlet_flow: 1,
//       tower2_level: 1,
//       tower2_inlet_flow: 1,
//       tower2_outlet_flow:1,


//     } }).toArray(function(err, data){
//    if (err) throw err;

//    i = 0;
//     while (i < data.length){
//    CSP_Arr[i] =[data[i].date,data[i].common_suction_pressure]
//    CDP_Arr[i] =[data[i].date,data[i].common_delivery_pressure]
//    S_LVL_Arr[i] =[data[i].date,data[i].sump_level]
//    T1_LVL_Arr[i] =[data[i].date,data[i].tower1_level]
//    T1_IF_Arr[i] =[data[i].date,data[i].tower1_inlet_flow]
//    T1_OF_Arr[i] =[data[i].date,data[i].tower1_outlet_flow]
//    T2_LVL_Arr[i] =[data[i].date,data[i].tower2_level]
//    T2_IF_Arr[i] =[data[i].date,data[i].tower2_inlet_flow]
//    T2_OF_Arr[i] =[data[i].date,data[i].tower2_inlet_flow]
//    i++;
//      }

// count++;

// res.status(200).json({
//     CSP_Arr,
//     CDP_Arr,
//     S_LVL_Arr,
//     T1_LVL_Arr,
//     T1_IF_Arr,
//     T1_OF_Arr,
//     T2_LVL_Arr,
//     T2_IF_Arr,
//     T2_OF_Arr,
//   });
//  } );
// })


//   if(count != 1) {
//      setTimeout(checkFlag, 1000); /* this checks the flag every 1000 milliseconds*/
//   }
//   else {
//     db.close();
// }

// })
//  module.exports= router;
