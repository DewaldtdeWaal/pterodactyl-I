const app = require("./app");
const http = require("http");
const debug = require('debug')('node-angular');
const cors = require('cors');
app.use(
  cors({
    origin:"http://mac-creations.co.za:3000"
  })
)
var gvar = require("./variables")

const multer = require('multer');
const AllResTrends = require('./Database-Functions/res_trends')
const FPT_Trend = require('./Database-Functions/fpt_trend')
const PS_Trend = require('./Database-Functions/ps_trend')
const Storms_Trend = require('./Database-Functions/storms_trend')
const CG_Trend = require('./Database-Functions/rw_cg_trend')
const WTW_Trend = require('./Database-Functions/wtw_trend')
const GW_Trend = require('./Database-Functions/grdw_trend')
const FL_Trend = require('./Database-Functions/fl_trend')
const AUTO_Trend = require('./Database-Functions/auto_trend')






const getnew = require("./Database-Functions/Coega-kop")
getnew.GetVal_NMB_CGK_R();







const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
     // console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
     // console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);




















var MongoClient = require('mongodb').MongoClient;

var url= gvar.standardConnectionString;

var MongoClient = require('mongodb').MongoClient;

var url= gvar.standardConnectionString;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
   var dbo = db.db("HawkEye");
  var query = {id:"ALARMS"};
  dbo.collection("ALARMS_CurrentVals").find(query).sort({_id:-1}).toArray(function(err,data){
   // gvar.fmt_FM_LOW_B = data[0].fmt_FM_LOW_B


    gvar.hum_gw_raw_water_tank_lvl = data[0].fmt_FM_LOW_B
    gvar.hum_gw_final_water_tank_lvl= data[0].fmt_FM_LOW_B
 })


})




setInterval(() => {

      // faultEmail( gvar.hum_gw_voltage_ok,0,"hum_gw_voltage_ok_trigger","dewaldt@macautomation.co.za","Humerail Fault ", "Voltage Fault detected at:")
      // faultEmail( gvar.hum_gw_VSD_Fault,1,"hum_gw_VSD_Fault_trigger","dewaldt@macautomation.co.za","Humerail Fault ", "VSD Fault detected at:")
      // faultEmail( gvar.hum_gw_borehole_low_level_fault,1,"hum_gw_borehole_low_level_fault_trigger","dewaldt@macautomation.co.za","Humerail Fault ", "Low level detected at:")
      // faultEmail( gvar.hum_gw_raw_water_tank_low_level_fault,1,"hum_gw_raw_water_tank_low_level_fault_trigger","dewaldt@macautomation.co.za","Humerail Fault ", "Low level detected at:")
      // faultEmail( gvar.hum_gw_final_water_tank_low_level_fault,1,"hum_gw_final_water_tank_low_level_fault_trigger","dewaldt@macautomation.co.za","Humerail Fault ", "Final Water Tank Low Level:")

      // faultEmail(gvar.nmb_schoe_r_actuator_valve_feedback_signal_error,1,"nmb_schoe_r_actuator_valve_feedback_signal_error_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Valve Signal Error detected at: ")
      // faultEmail(gvar.nmb_schoe_r_reservoir_level_signal_error,1,"nmb_schoe_r_reservoir_level_signal_error_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Level Signal detected at")
      // faultEmail(gvar.nmb_schoe_r_actuator_valve_command_signal_error,1,"nmb_schoe_r_actuator_valve_command_signal_error_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Command Signal detected at")
      // faultEmail(gvar.nmb_schoe_r_actuator_valve_fault,1,"nmb_schoe_r_actuator_valve_fault_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Fault detected at:")
      // faultEmail(gvar.nmb_schoe_r_actuator_valve_torque_fail_close,1,"nmb_schoe_r_actuator_valve_torque_fail_close_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Torque fail close at:")
      // faultEmail(gvar.nmb_schoe_r_actuator_valve_torque_fail_open,1,"nmb_schoe_r_actuator_valve_torque_fail_open_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Torque fail open at:")
      // faultEmail(gvar.nmb_schoe_r_general_fault,1,"nmb_schoe_r_general_fault_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "General Fault at:")
      // faultEmail(gvar.nmb_schoe_r_actuator_general_fault,1,"nmb_schoe_r_actuator_general_fault_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Actuator General fault: ")
      // faultEmail(gvar.nmb_schoe_r_actuator_valve_timeout,1,"nmb_schoe_r_actuator_valve_timeout_trigger","gerard@macautomation.co.za,dewaldt@macautomation.co.za","Schoemans Fault", "Valve timeout at: ")

     //


      // levelWarningEmail(gvar.hum_gw_raw_water_tank_lvl,50,100,"hum_gw_raw_water_tank_lvl_low_trigger","hum_gw_raw_water_tank_lvl_high_trigger", "dewaldt@macautomation.co.za","Humerail Raw Water Tank","Level below 50% in raw water tank detected at : ","" )

      // levelWarningEmail(gvar.hum_gw_final_water_tank_lvl,50,100,"hum_gw_final_water_tank_lvl_low_trigger","hum_gw_final_water_tank_lvl_high_trigger", "dewaldt@macautomation.co.za","Humerail Final Water Tank","Level below 50% in final water tank detected at : ","" )




},10000)



var MongoClient = require('mongodb').MongoClient;

var url= gvar.standardConnectionString;


async function faultEmail(gvarAlarm ,condition, object, emailList, subject, message){

  detectNulls(object,"Not Sent")

if(gvarAlarm == condition && gvar[object] != "Sent" )
{
      sendEmail(emailList,subject,message)
      updatedb(object, "Sent")

}
else if(gvarAlarm != condition && gvar[object] == "Sent")
{
  updatedb(object, "Not Sent")
}

}


function sendEmail(emailList,subject,Message){
  const isoDate = new Date().toISOString().toString();
  let date = new Date(isoDate);

  let formattedDate = date.toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    });

console.log(formattedDate);

        const nodemailer = require("nodemailer");
          var emailBody = Message + " " + formattedDate;

          async function main() {
            let transporter = nodemailer.createTransport({
              host: "mail.macautomation.co.za",
              port: 26,
              secure: false,
              auth: {
                user: 'dewaldt@macautomation.co.za',
                pass: "Beanstalk2022",
              },
              tls:{
                rejectUnauthorized:false
              }
            });

            let info = await transporter.sendMail({
              from: '"Dewaldt de Waal" <dewaldt@macautomation.co.za>',
              to: emailList,
              subject: subject,
              text: emailBody,
            });

            console.log("Message sent: %s", info.messageId);

            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          }

          main().catch(console.error);
        }

function detectNulls(object,string){
  if(gvar[object] == null || gvar[object]== undefined){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
       var dbo = db.db("HawkEye");
      var query = {id:"ALARMS"};
      dbo.collection("ALARMS_CurrentVals").find(query).sort({_id:-1}).toArray(function(err,data){
        gvar[object] = data[0][object]

        if(gvar[object] == null || gvar[object]== undefined)
        {
           gvar[object] = string;
           var firstValue ={
           [object]:gvar[object],
           id:"ALARMS"
         }
           var myquery = { id: "ALARMS"};
           var newValues = {$set:firstValue }

           dbo.collection("ALARMS_CurrentVals").updateOne(myquery,newValues , function(err, res){
           if (err) throw err;
           db.close();
            });

           }
     })



   })

  }


}


function updatedb(object, string){

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var dbo = db.db("HawkEye");

gvar[object] = string;
var firstValue ={
    [object]:gvar[object],
    id:"ALARMS"
  }
var myquery = { id: "ALARMS"};
var newValues = {$set:firstValue }

dbo.collection("ALARMS_CurrentVals").updateOne(myquery,newValues , function(err, res){
    if (err) throw err;
    db.close();
     });
    })

}












async function levelWarningEmail(gvar1 , condition1, condition2, object1,object2, emailList, subject, message1,message2 )
{
  detectNulls(object1,"Not Sent")

  detectNulls(object2,"Not Sent")

if (gvar1 < condition1 && gvar[object1] == "Not Sent"  && gvar[object1] != undefined){
  sendEmail(emailList,subject,message1);
  updatedb(object1, "Sent")
}
else if(gvar1 > condition1 && gvar[object1] == "Sent" && gvar[object1] != undefined ){
  updatedb(object1, "Not Sent")
}
else if(gvar1 > condition2 && gvar[object2] != "Sent" && gvar[object2] != undefined){

  sendEmail(emailList,subject,message2);
  updatedb(object2, "Sent")


}
else if(gvar1 < condition2 && gvar[object2] == "Sent" && gvar[object2] != undefined){

  updatedb(object2, "Not Sent")
}


}
