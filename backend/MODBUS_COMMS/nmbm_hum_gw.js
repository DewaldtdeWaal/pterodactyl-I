//Serves as a basic template for all future sites.

module.exports = {readVal_HUM_GW};
const Modbus = require('jsmodbus');
const net = require('net');
const gvar = require('../variables')
var mbCycleTime = 60000;
var mbRetry = 10000;


//Get IP address from Daniel
var ip = gvar.mbusIP +'.47';
//Memoryword(MW) you start at
var regStart =  200;
//Amount of Memorywords you have
var regNum = 16;


var timeout = 8000;
var mbtimeout=mbRetry
//Input function Name
function readVal_HUM_GW(){
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

        gvar.hum_gw_last_update =Date().slice(4,Date().length-41);

        var p = parseInt(val[0]);
        var m = [];
        for (var i=0; i<16; i++) {
            // test top bit and set corresponding payload
            m[i] =  ((p & 0x8000) ? 1 : 0);
            p = p << 1; // divide by two and keep as an integer
        }
        m.reverse();


        gvar.hum_gw_voltage_ok = m[0];
        gvar.hum_gw_VSD_Fault = m[5]
gvar.hum_gw_borehole_low_level_fault = m[6]
gvar.hum_gw_raw_water_tank_low_level_fault = m[7]
gvar.hum_gw_raw_water_tank_high_level_fault = m[8]

gvar.hum_gw_final_water_tank_high_level_fault = m[10]

gvar.hum_gw_final_water_tank_low_level_fault = m[9]

        if(m[1] == 1){
          gvar.hum_gw_mode = "Auto";
        }
        else if(m[2]  == 1){
          gvar.hum_gw_mode = "Manual"
        }
        else{
          gvar.hum_gw_mode = "Off"
        }

        if (m[5]  == 1 )
        {
          gvar.hum_gw_pump_status = "Pump Fault"
        }
        else if(m[4]== 1){
          gvar.hum_gw_pump_status = "Pump Running"
        }
        else if(m[3]  == 1){
          gvar.hum_gw_pump_status = "Pump Available"
        }
        else{
          gvar.hum_gw_pump_status = "Not Available"
        }




        var rawData = new ArrayBuffer(64);
        var i = new Uint16Array(rawData);
        var ii  = new Float32Array(rawData);



        i[0] = val[3]
        i[1] = val[4]
        i[2] = val[5]
        i[3] = val[6]

        i[4] = val[7]
        i[5] = val[8]
        i[6] = val[9]
        i[7] = val[10]


        i[8] = val[11]
        i[9] = val[12]
        i[10] = val[13]
        i[11] = val[14]

        i[12] = val[15]
        i[13] = val[16]
        i[14] = val[17]
        i[15] = val[18]

        i[16] = val[19]
        i[17] = val[20]
        i[18] = val[21]
        i[19] = val[22]

        i[20] = val[23]
        i[21] = val[24]
        i[22] = val[24]
        i[23] = val[25]



        gvar.hum_gw_flow_meter_1_flow_rate = parseFloat(ii[0])
        gvar.hum_gw_flow_meter_1_total_flow = parseFloat(ii[1])
        gvar.hum_gw_flow_meter_2_flow_rate = parseFloat(ii[2])
        gvar.hum_gw_flow_meter_2_total_flow = parseFloat(ii[3])
        gvar.hum_gw_flow_meter_3_flow_rate = parseFloat(ii[4])
        gvar.hum_gw_flow_meter_3_total_flow = parseFloat(ii[5])
        gvar.hum_gw_borehole_lvl = parseFloat(ii[6])
        gvar.hum_gw_raw_water_tank_lvl = parseFloat(ii[7])
        gvar.hum_gw_final_water_tank_lvl = parseFloat(ii[8])
        gvar.hum_gw_pressure = parseFloat(ii[9])
        gvar.hum_gw_run_hours = parseFloat(ii[10])
        console.log("nmbm_hum_gw")
        console.log(gvar.hum_gw_run_hours)
        console.log("nmbm_hum_gw")


        if(gvar.hum_gw_flow_meter_1_flow_rate!=undefined || gvar.hum_gw_flow_meter_1_flow_rate!=null){

          var MongoClient = require('mongodb').MongoClient;
          var url= gvar.standardConnectionString;


    var firstValue ={
      hum_gw_last_update:gvar.hum_gw_last_update,
      hum_gw_voltage_ok:gvar.hum_gw_voltage_ok,
      hum_gw_mode:gvar.hum_gw_mode,
      hum_gw_pump_status:gvar.hum_gw_pump_status,
      hum_gw_VSD_Fault:gvar.hum_gw_VSD_Fault,
      hum_gw_borehole_low_level_fault:gvar.hum_gw_borehole_low_level_fault,
      hum_gw_raw_water_tank_low_level_fault:gvar.hum_gw_raw_water_tank_low_level_fault,
      hum_gw_raw_water_tank_high_level_fault:gvar.hum_gw_raw_water_tank_high_level_fault,
      hum_gw_final_water_tank_low_level_fault:gvar.hum_gw_final_water_tank_low_level_fault,
      hum_gw_final_water_tank_high_level_fault:gvar.hum_gw_final_water_tank_high_level_fault,
      hum_gw_flow_meter_1_flow_rate:gvar.hum_gw_flow_meter_1_flow_rate,
      hum_gw_flow_meter_1_total_flow:gvar.hum_gw_flow_meter_1_total_flow,
      hum_gw_flow_meter_2_flow_rate:gvar.hum_gw_flow_meter_2_flow_rate,
      hum_gw_flow_meter_2_total_flow:gvar.hum_gw_flow_meter_2_total_flow,
      hum_gw_flow_meter_3_flow_rate:gvar.hum_gw_flow_meter_3_flow_rate,
      hum_gw_flow_meter_3_total_flow:gvar.hum_gw_flow_meter_3_total_flow,
      hum_gw_borehole_lvl:gvar.hum_gw_borehole_lvl,
      hum_gw_raw_water_tank_lvl:gvar.hum_gw_raw_water_tank_lvl,
      hum_gw_final_water_tank_lvl:gvar.hum_gw_final_water_tank_lvl,
      hum_gw_pressure:gvar.hum_gw_pressure,
      hum_gw_run_hours:gvar.hum_gw_run_hours,
      id:"nmbm_hum_gw"
        }

        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
            var dbo = db.db("HawkEye");


            dbo.collection("GRDW_CurrentVals").findOne({id:{$all: ['nmbm_hum_gw']}}, function(err, result) {

              if (result!=null){}
              else{
                dbo.collection("GRDW_CurrentVals").insertOne(firstValue, function() {

                });
              }



          })
          var myquery = { id: "nmbm_hum_gw"};
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
  setTimeout(readVal_HUM_GW, mbtimeout);
  }





