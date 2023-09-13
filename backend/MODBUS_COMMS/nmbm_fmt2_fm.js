module.exports = {readVal_FMT2_FM};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;

var ip = gvar.mbusIP +'.16';
var regStart = 90;//memory word
var regNum = 1; // number of words
var timeout = 8000;
var mbtimeout=mbRetry

function readVal_FMT2_FM(){
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

        gvar.fmt_FM_PRESS = ((parseFloat(val[0]))/1000).toFixed(3);




        if(gvar.fmt_FM_PRESS!=undefined || gvar.fmt_FM_PRESS!=null){
        var MongoClient = require('mongodb').MongoClient;
        var url= gvar.standardConnectionString;


var firstValue ={
fmt_FM_PRESS:gvar.fmt_FM_PRESS,
id:"nmbm_fmt_fm"

}


        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("HawkEye");


          dbo.collection("FPT_CurrentVals").findOne({id:{$all: ['nmbm_fmt_fm']}}, function(err, result) {

            if (result!=null){}
            else{
              dbo.collection("FPT_CurrentVals").insertOne(firstValue, function() {

              });
            }



        })
        var myquery = { id: "nmbm_fmt_fm"};
        var newvalues = {$set: firstValue



        };
        dbo.collection("FPT_CurrentVals").updateOne(myquery, newvalues, function(err, res){
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
  setTimeout(readVal_FMT2_FM, mbtimeout);
  }
