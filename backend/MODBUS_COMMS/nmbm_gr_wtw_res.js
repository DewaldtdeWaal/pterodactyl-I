module.exports = {readVal_GR_R};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;
const fun = require('./modbusfunctions')
var ip = gvar.mbusIP +'.13';
var regStart = 100;//memory word
var regNum = 8; // number of words
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_GR_R(){
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

        var rawData = new ArrayBuffer(16);
        var i = new Uint16Array(rawData);
        var f = new Float32Array(rawData);


        i[0] = val[0]; //low
        i[1] = val[1]; //high

        i[2] = val[2]; //low
        i[3] = val[3]; //high

        i[4] = val[4]; //low
        i[5] = val[5]; //high

        i[6] = val[6]; //low
        i[7] = val[7]; //high
        gvar.gr_R_EAST_LVL = fun.checkLevel(parseFloat(f[1]).toFixed(1));

        gvar.gr_R_WEST_LVL = fun.checkLevel(parseFloat(f[0]).toFixed(1));

        gvar.gr_R_INTLET = parseFloat(f[3]).toFixed(2);

        gvar.gr_R_OUTLET = parseFloat(f[2]).toFixed(2);

        gvar.gr_R_UT = Date().slice(4,Date().length-41);


        if(gvar.gr_R_WEST_LVL!=undefined || gvar.gr_R_WEST_LVL!=null){


        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
gr_R_EAST_LVL:gvar.gr_R_EAST_LVL,
gr_R_WEST_LVL:gvar.gr_R_WEST_LVL,
gr_R_INTLET:gvar.gr_R_INTLET,
gr_R_OUTLET:gvar.gr_R_OUTLET,
gr_R_UT:gvar.gr_R_UT,
id:"nmbm_gr_wtw_r"
}


        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("HawkEye");


          dbo.collection("R_CurrentVals").findOne({id:{$all: ['nmbm_gr_wtw_r']}}, function(err, result) {

            if (result!=null){}
            else{
              dbo.collection("R_CurrentVals").insertOne(firstValue, function() {

              });
            }
        })
        var myquery = { id: "nmbm_gr_wtw_r"};
        var newvalues = {$set: firstValue
        };
        dbo.collection("R_CurrentVals").updateOne(myquery, newvalues, function(err, res){
          if (err) throw err;
          db.close();
         })
        })

        var reservoirTrend={
          gr_R_EAST_LVL:gvar.gr_R_EAST_LVL,
          gr_R_WEST_LVL:gvar.gr_R_WEST_LVL,
          gr_R_UT:gvar.gr_R_UT,
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
  setTimeout(readVal_GR_R, mbtimeout);
  }
