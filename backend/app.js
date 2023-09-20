const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const admin = require('./Database-Functions/create_admin')





const UsersRoutes = require("./routes/users")
const TrendPicker = require("./routes/trend-picker")
const  FlowMeterRoutes= require("./routes/flow-meter-trends")
const FeedLotsRoutes = require("./routes/feed-lots-trends")
const crowngardensRoutes = require("./routes/crown-gardens-trends")
const adminRoutes = require("./routes/admin")
const controlLogRoutes = require("./routes/controlLogs")
const UserPresetRoutes = require("./routes/userPresets")






const costom_trends = require("./routes/costom-trend")



var gvar = require("./variables")







//////test

//https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
const app = express();
const nodemailer = require("nodemailer")








app.listen(5000, () => {

})

app.get('/', (req,res) =>{


})




const handleConnectionError = (error) => {
  console.log('Connection Failed', error);
  setTimeout(() => {
    mongoose.connect(gvar.MongooseConnectionString, { useNewUrlParser: true})
    .then(() => {
      console.log('Connected to database')
    })
    .catch(handleConnectionError)
  },60000);
};

mongoose.connect(gvar.MongooseConnectionString, {useNewUrlParser:true})
.then(() => {
  console.log("Connected to Database")
})
.catch(handleConnectionError)


admin.CreateAdmin();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname,"angular")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");  //"http://allelectrical.dyndns.org:4200/"
  res.setHeader(
    "Access-Control-Allow-Headers",
    "*, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(costom_trends);



app.use(UsersRoutes);
app.use(TrendPicker);
app.use(adminRoutes);
app.use(FeedLotsRoutes);
app.use(FlowMeterRoutes);
app.use(controlLogRoutes);

app.use(UserPresetRoutes)
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,"angular", "index.html"));
});






module.exports=app;
