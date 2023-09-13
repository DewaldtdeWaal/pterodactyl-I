//Serves as a basic template for all future sites.

module.exports = {readVal_ISUZU_AUTO};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;


//Get IP address from Daniel
var ip = gvar.mbusIP +'.46';
//Memoryword(MW) you start at
var regStart = 700;
//Amount of Memorywords you have
var regNum = 8;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_ISUZU_AUTO(){
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

        gvar.isuzu_ut = Date().slice(4,Date().length-41);

gvar.isuzu_oven1_vsd_speed = (val[0]/10).toFixed(1);
gvar.isuzu_oven1_heat_ecvh_temp = (val[1]/10).toFixed(1);
gvar.isuzu_oven1_temp1 = (val[2]/10).toFixed(1);

gvar.isuzu_oven1_temp2 = (val[3]/10).toFixed(1);


gvar.isuzu_oven2_vsd_speed =( val[10]/10).toFixed(1);
gvar.isuzu_oven2_heat_ecvh_temp = (val[11]/10).toFixed(1);

gvar.isuzu_oven2_temp1 = (val[12]/10).toFixed(1);
gvar.isuzu_oven2_temp2 = (val[13]/10).toFixed(1);



var firstValue={

  isuzu_ut:gvar.isuzu_ut,
isuzu_oven1_vsd_speed:gvar.isuzu_oven1_vsd_speed,
isuzu_oven1_heat_ecvh_temp:gvar.isuzu_oven1_heat_ecvh_temp,
isuzu_oven1_temp1:gvar.isuzu_oven1_temp1,
isuzu_oven1_temp2:gvar.isuzu_oven1_temp2,
isuzu_oven2_vsd_speed:gvar.isuzu_oven2_vsd_speed,
isuzu_oven2_heat_ecvh_temp:gvar.isuzu_oven2_heat_ecvh_temp,
isuzu_oven2_temp1:gvar.isuzu_oven2_temp1,
isuzu_oven2_temp2:gvar.isuzu_oven2_temp2,

}


var MongoClient = require('mongodb').MongoClient;
var url= gvar.standardConnectionString;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("HawkEye");
// dbo.createCollection("GRDW_NPP", function() {

  dbo.collection("AUTO_CurrentVals").findOne({id:{$all: ['isuzu_auto']}}, function(err, result) {

    if (result!=null){}
    else{
      dbo.collection("AUTO_CurrentVals").insertOne(firstValue, function() {

      });
    }



})


var myquery = { id: "isuzu_auto"};
var newvalues = {$set: firstValue



};
dbo.collection("AUTO_CurrentVals").updateOne(myquery, newvalues, function(err, res){
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
  setTimeout(readVal_ISUZU_AUTO, mbtimeout);
  }





