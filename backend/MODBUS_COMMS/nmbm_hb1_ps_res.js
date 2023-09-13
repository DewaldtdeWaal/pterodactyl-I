module.exports = {readVal_HB_PS_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.25';
var regStart = 305;
var regNum = 10;
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_HB_PS_R(){
  const socket = new net.Socket()
  const client = new Modbus.client.TCP(socket, 1, timeout)
  const options = {
  'host' : ip,
  'port' : 502
  };
  socket.connect(options);
  socket.on("connect", function() {
    client
      .readHoldingRegisters(regStart,regNum)
      .then(function(resp) {
        var val = (resp.response._body.values);
        socket.end();
        mbtimeout = mbCycleTime;


        gvar.hb_R_LVL = fun.checkLevel((val[0]/100).toFixed(1));
        gvar.hb_R_UT = Date().slice(4,Date().length-41);


        var p1 = parseInt(val[5]);
        var m1 = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m1[i] =  ((p1 & 0x8000) ? 1 : 0);
            p1 = p1 << 1; // divide by two and keep as an integer
        }
        m1.reverse();


        var p2 = parseInt(val[6]);
        var m2 = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m2[i] =  ((p2 & 0x8000) ? 1 : 0);
            p2 = p2 << 1; // divide by two and keep as an integer
        }
        m2.reverse();


        var p3 = parseInt(val[1]);
        var m3 = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m3[i] =  ((p3 & 0x8000) ? 1 : 0);
            p3 = p3 << 1; // divide by two and keep as an integer
        }
        m3.reverse();


   //p1
        if(m3[0]==1)
        {
         gvar.hb_P1_STATUS = "Running"
        }
        else if (m1[11]== 1)
        gvar.hb_P1_STATUS = "Available"

        else if (m2[1]== 1)
        gvar.hb_P1_STATUS = "Fault Active"

        else if (m2[1]== 0 || m1[11]== 0 || m3[0]==0)
        gvar.hb_P1_STATUS = "Not Available"


        if(m1[0]==1)
        {
         gvar.hb_P1_MODE = "Auto"
        }
        else
        gvar.hb_P1_MODE = "Off/Manual"



   // p2
        if(m3[1]==1)
        {
         gvar.hb_P2_STATUS = "Running"
        }
        else if (m1[12]== 1)
        gvar.hb_P2_STATUS = "Available"

        else if (m2[2]== 1)
        gvar.hb_P2_STATUS = "Fault Active"

        else if (m2[2]== 0 || m1[12]== 0 || m3[1]==0)
        gvar.hb_P2_STATUS = "Not Available"


        if(m1[1]==1)
        {
         gvar.hb_P2_MODE = "Auto"
        }
        else
        gvar.hb_P2_MODE = "Off/Manual"



   // p3
        if(m3[2]==1)
        {
         gvar.hb_P3_STATUS = "Running"
        }
        else if (m1[13]== 1)
        gvar.hb_P3_STATUS = "Available"

        else if (m2[3]== 1)
        gvar.hb_P3_STATUS = "Fault Active"

        else if (m2[3]== 0 || m1[13]== 0 || m3[1]==0)
        gvar.hb_P3_STATUS = "Not Available"


        if(m1[2]==1)
        {
         gvar.hb_P3_MODE = "Auto"
        }
        else
        gvar.hb_P3_MODE = "Off/Manual"


       //  gvar.hb_P1_MODE

         gvar.hb_P1_PUMP_CB_TRIP_FAULT= m2[8]
         gvar.hb_P2_PUMP_CB_TRIP_FAULT= m2[9]
         gvar.hb_P3_PUMP_CB_TRIP_FAULT= m2[10]

         gvar.hb_P1_STARTUP_FAULT = m1[14]
         gvar.hb_P2_STARTUP_FAULT = m1[15]
         gvar.hb_P3_STARTUP_FAULT = m2[0]


         gvar.hb_P1_ESTOP_FAULT= m1[3]
         gvar.hb_P2_ESTOP_FAULT= m1[4]
         gvar.hb_P3_ESTOP_FAULT= m1[5]


         gvar.hb_P1_NO_FLOW_FAULT = m1[6]
         gvar.hb_P2_NO_FLOW_FAULT = m1[7]
         gvar.hb_P3_NO_FLOW_FAULT = m1[8]




         if(gvar.hb_R_LVL!=undefined || gvar.hb_R_LVL!=null){

         var MongoClient = require('mongodb').MongoClient;
         var url= gvar.standardConnectionString;


 var firstValue ={
 hb_R_LVL:gvar.hb_R_LVL,
 hb_R_UT:gvar.hb_R_UT,
 hb_P1_STATUS:gvar.hb_P1_STATUS,
 hb_P1_MODE:gvar.hb_P1_MODE,
 hb_P2_STATUS:gvar.hb_P2_STATUS,
 hb_P2_MODE:gvar.hb_P2_MODE,
 hb_P3_STATUS:gvar.hb_P3_STATUS,
 hb_P3_MODE:gvar.hb_P3_MODE,
 hb_P1_PUMP_CB_TRIP_FAULT:gvar.hb_P1_PUMP_CB_TRIP_FAULT,
 hb_P2_PUMP_CB_TRIP_FAULT:gvar.hb_P2_PUMP_CB_TRIP_FAULT,
 hb_P3_PUMP_CB_TRIP_FAULT:gvar.hb_P3_PUMP_CB_TRIP_FAULT,
 hb_P1_STARTUP_FAULT:gvar.hb_P1_STARTUP_FAULT,
 hb_P2_STARTUP_FAULT:gvar.hb_P2_STARTUP_FAULT,
 hb_P3_STARTUP_FAULT:gvar.hb_P3_STARTUP_FAULT,
 hb_P1_ESTOP_FAULT:gvar.hb_P1_ESTOP_FAULT,
 hb_P2_ESTOP_FAULT:gvar.hb_P2_ESTOP_FAULT,
 hb_P3_ESTOP_FAULT:gvar.hb_P3_ESTOP_FAULT,
 hb_P1_NO_FLOW_FAULT:gvar.hb_P1_NO_FLOW_FAULT,
 hb_P2_NO_FLOW_FAULT:gvar.hb_P2_NO_FLOW_FAULT,
 hb_P3_NO_FLOW_FAULT:gvar.hb_P3_NO_FLOW_FAULT,
 id:"heaterbank_pump"

 }


         MongoClient.connect(url, function(err, db) {
           if (err) throw err;
           var dbo = db.db("HawkEye");


           dbo.collection("PS_CurrentVals").findOne({id:{$all: ['heaterbank_pump']}}, function(err, result) {

             if (result!=null){}
             else{
               dbo.collection("PS_CurrentVals").insertOne(firstValue, function() {

               });
             }



         })
         var myquery = { id: "heaterbank_pump"};
         var newvalues = {$set: firstValue



         };
         dbo.collection("PS_CurrentVals").updateOne(myquery, newvalues, function(err, res){
           if (err) throw err;
           db.close();



          })


         })


         var reservoirTrend={
          hb_R_UT:gvar.hb_R_UT,
          hb_R_LVL:gvar.hb_R_LVL,
          id:"res_overview"

        }



                MongoClient.connect(url, function(err, db){
                  if (err) throw err;
                  var dbo = db.db("HawkEye");



                  dbo.collection("Res_CurrentVals").findOne({id:{$all: ['res_overview']}}, function(err, result) {

                    if (result!=null){}
                    else{
                      dbo.collection("Res_CurrentVals").insertOne(reservoirTrend, function() {

                      });
                    }



                })
                var myquery = { id: "res_overview"};
                var newvalues = {$set: reservoirTrend



                };
                dbo.collection("Res_CurrentVals").updateOne(myquery, newvalues, function(err, res){
                  if (err) throw err;
                  db.close();



                 })








                })
              }

              var psTrend ={
                hb_R_UT:gvar.hb_R_UT,
                id:"PS_OVERVIEW"
              }

              MongoClient.connect(url, function(err, db){
                if (err) throw err;
                var dbo = db.db("HawkEye");

                dbo.collection("PUMP_CurrentVals").findOne({id:{$all: ['PS_OVERVIEW']}}, function(err, result){
                  if(result  != null){}
                  else{
                    dbo.collection("PUMP_CurrentVals").insertOne(psTrend, function(){

                    });
                  }
                })
                var myquery = {id: "PS_OVERVIEW"};
                var newvalues = {$set: psTrend};

                dbo.collection("PUMP_CurrentVals").updateOne(myquery, newvalues, function(err, res){
                  if (err) throw err;
                  db.close();
                })
              })
         })
         .catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
        });
  })
  socket.on("error", function(){
    mbtimeout = mbRetry
});

  setTimeout(readVal_HB_PS_R, mbtimeout);
  }
