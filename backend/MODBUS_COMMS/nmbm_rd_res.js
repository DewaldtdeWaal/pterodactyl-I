module.exports = {readVal_RD_R};
const Modbus = require('jsmodbus');
const net = require('net');
const fun = require('./modbusfunctions')

const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;

var ip = gvar.mbusIP +'.28';
var regStart = 100;
var regNum = 102;
var timeout = 5000;
var mbtimeout=mbRetry

function readVal_RD_R(){
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

        gvar.rd_r_ut = Date().slice(4,Date().length-41);
        gvar.rd_r_lvl = fun.checkLevel((val[0]/10).toFixed(1));

      //  console.log("READ VALUE Pump Power:"+val[100])
      //  console.log("READ VALUE Pump Speed:"+val[101])
         })

         .catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
        });
  })
  if(gvar.rd_r_lvl!=undefined || gvar.rd_r_lvl!=null){
  var MongoClient = require('mongodb').MongoClient;
  var url= gvar.standardConnectionString;


var firstValue ={
rd_r_ut:gvar.rd_r_ut,
rd_r_lvl:gvar.rd_r_lvl,
id:"nmbm_rd_r"

}



  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("HawkEye");


    dbo.collection("R_CurrentVals").findOne({id:{$all: ['nmbm_rd_r']}}, function(err, result) {

      if (result!=null){}
      else{
        dbo.collection("R_CurrentVals").insertOne(firstValue, function() {

        });
      }



  })
  var myquery = { id: "nmbm_rd_r"};
  var newvalues = {$set: firstValue



  };
  dbo.collection("R_CurrentVals").updateOne(myquery, newvalues, function(err, res){
    if (err) throw err;
    db.close();



   })


  })


  var reservoirTrend={
    rd_r_ut:gvar.rd_r_ut,
    rd_r_lvl:gvar.rd_r_lvl,
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
  socket.on("error", function(){
    mbtimeout = mbRetry
});
  setTimeout(readVal_RD_R, 15000);
  }
