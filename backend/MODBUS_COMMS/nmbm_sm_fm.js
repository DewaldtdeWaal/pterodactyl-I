module.exports = {readVal_SM_FM};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;

var ip = gvar.mbusIP +'.19';
var regStart = 0;
var regNum = 1;
var timeout = 5000;
var mbtimeout=mbRetry

function readVal_SM_FM(){
  const socket = new net.Socket()
  const client = new Modbus.client.TCP(socket, 1, timeout)
  const options = {
  'host' : ip,
  'port' : 502
  };
  socket.connect(options);
  socket.on("connect", function() {
    client
      .readInputRegisters(regStart,regNum)
      .then(function(resp) {
        var val = (resp.response._body.values);
        socket.end();
        mbtimeout = mbCycleTime;

        gvar.sm_fm_fr=(val[0]*0.0864).toFixed(2)
       gvar.sm_ut= Date().slice(4,Date().length-41);

         })
         .catch(function() {
          console.error(
            require("util").inspect(arguments, {
              depth: null
            })
          );
        });
        gvar.sum_UT = Date().slice(4,Date().length-41);

        if(gvar.sm_fm_fr!=undefined || gvar.sm_fm_fr!=null){
        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
  sm_ut:gvar.sm_ut,
sm_fm_fr:gvar.sm_fm_fr,
id:"nmbm_sm_fm"

}


        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("HawkEye");


          dbo.collection("R_CurrentVals").findOne({id:{$all: ['nmbm_sm_fm']}}, function(err, result) {

            if (result!=null){}
            else{
              dbo.collection("R_CurrentVals").insertOne(firstValue, function() {

              });
            }



        })
        var myquery = { id: "nmbm_sm_r"};
        var newvalues = {$set: firstValue



        };
        dbo.collection("R_CurrentVals").updateOne(myquery, newvalues, function(err, res){
          if (err) throw err;
          db.close();



         })


        })

      }
  })


  socket.on("error", function(){
    mbtimeout = mbRetry
});
  setTimeout(readVal_SM_FM, mbtimeout);
  }
