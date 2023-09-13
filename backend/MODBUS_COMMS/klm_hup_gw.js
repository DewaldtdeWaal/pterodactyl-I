
module.exports = {readVal_HUP_GW};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;


//Get IP address from Daniel
var ip = gvar.mbusIP +'.40';
//Memoryword(MW) you start at
var regStart = 200;
//Amount of Memorywords you have
var regNum = 22;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_HUP_GW(){
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
var p = parseInt(val[0]);
var m = [];
for (var i=0; i<16; i++) {
    // test top bit and set corresponding payload
    m[i] =  ((p & 0x8000) ? 1 : 0);
    p = p << 1; // divide by two and keep as an integer
}
m.reverse();

  gvar.hup1_voltage=m[0]
  gvar.hup1_battery=m[1]
  gvar.hup1_charge=m[2]
  gvar.hup1_fault=m[3]
  gvar.hup1_24_timer=m[4]
  gvar.hup1_borehole_level_pr_fault=m[5]
  gvar.hup1_stop_level=m[6]
  gvar.hup1_no_flow_fault=m[7]

  if(m[4]==1){
  gvar.hup1_pump_timer="Pump Run"
  }
  else{
  gvar.hup1_pump_timer="Pump Rest"
  }
  if(m[8]==1){
    gvar.hup1_mode="Auto"
  }
  else if(m[9]==1){
    gvar.hup1_mode="Manual"
  }
  else{
    gvar.hup1_mode="Off"
  }


  if(m[12]==1|| m[13]==1|| m[14]==1|| m[15]==1){
    gvar.hup1_pump_mode="Pump Fault"
  }
  else if(m[11]==1){
    gvar.hup1_pump_mode="Pump Running"
  }
  else if(m[10]==1){
    gvar.hup1_pump_mode="Pump Available"
  }

  else if(m[6]==1){
    gvar.hup1_pump_mode="Not Available"


    }
    else{
      gvar.hup1_pump_mode="Not Available"
    }


  gvar.hup1_ut = Date().slice(4,Date().length-41);
gvar.hup1_trip_fault=m[12]
gvar.hup1_estop_active=m[13]
gvar.hup1_pump_general_fault=m[14]
gvar.hup1_pump_suf=m[15]

gvar.hup1_borehole_lvl  = (val[2]/10).toFixed(1);
gvar.hup1_flow_rate   = (val[3]/10).toFixed(1);
var rawData = new ArrayBuffer(4);
var k = new Uint16Array(rawData);
var kk  = new Uint32Array(rawData);


k[0]=val[4]
k[1]=val[5]
gvar.hup1_total_flow= (parseInt(kk[0].toFixed(1)));


var rawData = new ArrayBuffer(4);
var c = new Uint16Array(rawData);
var cc  = new Uint32Array(rawData);


c[0]=val[6]
c[1]=val[7]
gvar.hup1_run_hours= (parseInt(cc[0].toFixed(1)));



if(gvar.hup1_voltage!=undefined || gvar.hup1_voltage!=null){


var MongoClient = require('mongodb').MongoClient;
var url= gvar.standardConnectionString;


var firstValue={
  hup1_ut:gvar.hup1_ut,
    hup1_voltage:gvar.hup1_voltage,
    hup1_battery:gvar.hup1_battery,
    hup1_charge:gvar.hup1_charge,
    hup1_fault:gvar.hup1_fault,
    hup1_24_timer:gvar.hup1_24_timer,
    hup1_borehole_level_pr_fault:gvar.hup1_borehole_level_pr_fault,
    hup1_stop_level:gvar.hup1_stop_level,
    hup1_no_flow_fault:gvar.hup1_no_flow_fault,
    hup1_mode:gvar.hup1_mode ,
    hup1_pump_mode:gvar.hup1_pump_mode,
    hup1_trip_fault:gvar.hup1_trip_fault,
    hup1_estop_active:gvar.hup1_estop_active,
    hup1_pump_general_fault:gvar.hup1_pump_general_fault,
    hup1_pump_suf:gvar.hup1_pump_suf,
    hup1_borehole_lvl :gvar.hup1_borehole_lvl ,
    hup1_flow_rate  :gvar.hup1_flow_rate  ,
    hup1_total_flow:gvar.hup1_total_flow,
    hup1_pump_timer:gvar.hup1_pump_timer,
    hup1_run_hours:gvar.hup1_run_hours,
    id:"klm_hup_gw"

};





MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("HawkEye");
// dbo.createCollection("GRDW_NPP", function() {

  dbo.collection("GRDW_CurrentVals").findOne({id:{$all: ['klm_hup_gw']}}, function(err, result) {

    if (result!=null){}
    else{
      dbo.collection("GRDW_CurrentVals").insertOne(firstValue, function() {

      });
    }



})


var myquery = { id: "klm_hup_gw"};
var newvalues = {$set: firstValue



};
dbo.collection("GRDW_CurrentVals").updateOne(myquery, newvalues, function(err, res){
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
  setTimeout(readVal_HUP_GW, mbtimeout);
  }
