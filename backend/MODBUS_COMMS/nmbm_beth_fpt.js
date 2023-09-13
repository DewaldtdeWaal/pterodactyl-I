module.exports = {readVal_BETH_FPT};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;


//Get IP address from Daniel
var ip = gvar.mbusIP +'.28';
//Memoryword(MW) you start at
var regStart =200;
//Amount of Memorywords you have
var regNum = 7;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_BETH_FPT(){
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
//This method for real values or floating point values
var rawData = new ArrayBuffer(12);
        var i = new Uint16Array(rawData);
        var ii  = new Float32Array(rawData);

        i[0] = val[0]; //low
        i[1] = val[1]; //high
        i[2] = val[2]; //low
        i[3] = val[3]; //high
        i[4] = val[4]; //low
        i[5] = val[5]; //high
        gvar.beth_totalflow=parseFloat(ii[1].toFixed(0));
        gvar.beth_battery_status = val[6];

gvar.beth_flowrate = parseFloat(ii[0].toFixed(2));

gvar.beth_pressure = parseFloat(ii[2].toFixed(3));
gvar.beth_ut = Date().slice(4,Date().length-41);


if(gvar.beth_totalflow!=undefined || gvar.beth_totalflow!=null){
  var MongoClient = require('mongodb').MongoClient;
      var url= gvar.standardConnectionString;


var firstValue ={
beth_totalflow:gvar.beth_totalflow,
beth_flowrate:gvar.beth_flowrate,
beth_pressure:gvar.beth_pressure,
beth_battery_status:gvar.beth_battery_status,
beth_ut:gvar.beth_ut,
id:"nmbm_beth_fpt"




}


      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("HawkEye");


        dbo.collection("FPT_CurrentVals").findOne({id:{$all: ['nmbm_beth_fpt']}}, function(err, result) {

          if (result!=null){}
          else{
            dbo.collection("FPT_CurrentVals").insertOne(firstValue, function() {

            });
          }



      })
      var myquery = { id: "nmbm_beth_fpt"};
      var newvalues = {$set: firstValue



      };
      dbo.collection("FPT_CurrentVals").updateOne(myquery, newvalues, function(err, res){
        if (err) throw err;
        db.close();



       })


      })

      var fptTrends={
        beth_ut:gvar.beth_ut,
        id:"fpt_currentvals"
      }

      MongoClient.connect(url, function(err, db){
        if (err) throw err;
        var dbo = db.db("HawkEye");

        dbo.collection("fpt_CurrentVals").findOne({id:{$all: ['fpt_currentvals']}}, function(err, result){
          if(result  != null){}
          else{
            dbo.collection("fpt_CurrentVals").insertOne(fptTrends, function(){

            });
          }
        })
        var myquery = {id: "fpt_currentvals"};
        var newvalues = {$set: fptTrends};

        dbo.collection("fpt_CurrentVals").updateOne(myquery, newvalues, function(err, res){
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
  setTimeout(readVal_BETH_FPT, mbtimeout);
  }





