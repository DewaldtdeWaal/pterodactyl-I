module.exports = {readVal_MW_PS_G};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.6';
var regStart=500;
var regNum=23;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_MW_PS_G(){
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


/////////////////////////////////////////////Input code
gvar.mw_g_ut=Date().slice(4,Date().length-41);
 gvar.mw_g_common_suction_pressure=((val[0]/1000)*2.5).toFixed(2);
 gvar.mw_g_common_delivery_pressure=((val[1]/1000)*2.5).toFixed(2);
 gvar.mw_g_flowrate= val[2];
 gvar.mw_g_pumps_required=val[3];
 gvar.mw_g_speed_setpoint=val[5];
 gvar.mw_g_res_level = fun.checkLevel(val[22])

 if(gvar.mw_g_common_suction_pressure!=undefined || gvar.mw_g_common_suction_pressure!=null){

 var MongoClient = require('mongodb').MongoClient;
 var url= gvar.standardConnectionString;


var firstValue ={
  mw_g_ut:gvar.mw_g_ut,
mw_g_common_suction_pressure:gvar.mw_g_common_suction_pressure,
mw_g_common_delivery_pressure:gvar.mw_g_common_delivery_pressure,
mw_g_flowrate:gvar.mw_g_flowrate,
mw_g_pumps_required:gvar.mw_g_pumps_required,
mw_g_speed_setpoint:gvar.mw_g_speed_setpoint,
mw_g_res_level: gvar.mw_g_res_level,
id:"nmbm_mw_ps"

}


 MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("HawkEye");


   dbo.collection("PS_CurrentVals").findOne({id:{$all: ['nmbm_mw_ps']}}, function(err, result)
{
     if (result!=null){}
     else{
       dbo.collection("PS_CurrentVals").insertOne(firstValue, function() {

       });
     }



 })
 var myquery = { id: "nmbm_mw_ps"};
 var newvalues = {$set: firstValue



 };
 dbo.collection("PS_CurrentVals").updateOne(myquery, newvalues, function(err, res){
   if (err) throw err;
   db.close();



  })


 })
 var psTrend ={
  mw_g_ut:gvar.mw_g_ut,
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

var reservoirTrend={
  mw_g_res_level:gvar.mw_g_res_level,
  mw_g_ut:gvar.mw_g_ut,
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
//Make sure this matches the method Name
  setTimeout(readVal_MW_PS_G, mbtimeout);
  }
