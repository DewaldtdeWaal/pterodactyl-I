//Serves as a basic template for all future sites.

module.exports = {readVal_ELANDS_WTW};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;


//Get IP address from Daniel
var ip = gvar.mbusIP +'.39';
//Memoryword(MW) you start at
var regStart=6;
//Amount of Memorywords you have
var regNum = 12;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_ELANDS_WTW(){
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

        gvar.wtw_elands_ut = Date().slice(4,Date().length-41);

        var rawData = new ArrayBuffer(32);
        var i = new Uint16Array(rawData);
        var f  = new Float32Array(rawData);

        i[0] = val[10]; //low
        i[1] = val[11]; //high
        i[2] = val[0];
        i[3] = val[1];

        gvar.wtw_elands_FR=parseFloat(f[0]/1).toFixed(1)
        gvar.wtw_elands_P= parseFloat(f[1]/10).toFixed(2)

        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


            var firstValue ={
              wtw_elands_ut:gvar.wtw_elands_ut,
              wtw_elands_FR:gvar.wtw_elands_FR,
              wtw_elands_P:gvar.wtw_elands_P,
            id:"nmbm_elands_wtw"

            }



        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("HawkEye");


          dbo.collection("WTW_CurrentVals").findOne({id:{$all: ['nmbm_elands_wtw']}}, function(err, result)
           {

            if (result!=null){}
            else{
              dbo.collection("WTW_CurrentVals").insertOne(firstValue, function() {

              });
            }



        })
        var myquery = { id: "nmbm_elands_wtw"};
        var newvalues = {$set: firstValue



        };



        dbo.collection("WTW_CurrentVals").updateOne(myquery, newvalues, function(err, res){
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
//Make sure this matches the method Name
  setTimeout(readVal_ELANDS_WTW, mbtimeout);
  }





