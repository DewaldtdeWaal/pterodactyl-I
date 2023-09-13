const express = require("express");
const router = express.Router();
const gvar = require('../../variables')


// nmbm_olip_r



function GetRouteData(path, ID){
  router.get(path, function (req,res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = gvar.standardConnectionString;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
       var dbo = db.db("HawkEye");

      var query = {id: ID};
      var routingArray=[]
      dbo.collection("R_CurrentVals").find(query).toArray(function(err,data){

        if(err) throw err;
        var i=0;
        while (i < data.length)
            {
              routingArray[i] =data[i]
                 i++;
             }
        res.status(200).json({
          routingArray


             });



      })

    })
  })
}
GetRouteData("/hawkeye/reservoirs/oliphantskop","nmbm_olip_r")
GetRouteData("/reservoirs/bluehorizonbay/values","nmbm_bh_r")
GetRouteData('/greenbushes/values','nmbm_gb_r')
GetRouteData('/grassridge/values',"nmbm_gr_wtw_r")


GetRouteData('/lovemoreheights/values',"nmbm_lh_ps_r")
GetRouteData('/rosedale/values',"nmbm_rd_r")
GetRouteData('/summit/values',"nmbm_sm_r")


GetRouteData('/theescombe/values',"nmbm_tc_ps_r")
GetRouteData('/vanriebeekhoogte/values',"nmbm_vrh_ps_r")
GetRouteData('/vanstadens/res/values',"nmbm_vs_r")

GetRouteData('/hawkeye/reservoirs/bushypark', "nmbm_bush_r")

GetRouteData('/hawkeye/reservoirs/emeraldhill',"nmbm_emer_r")

GetRouteData('/hawkeye/reservoirs/driftsands',"nmbm_drift_res")

GetRouteData('/hawkeye/reservoirs/schoemanshoek',"nmbm_schoe_r")


GetRouteData('/hawkeye/reservoirs/kwanobuhle',"nmbm_kwano_r")

GetRouteData('/hawkeye/reservoirs/graaf',"graaf")

GetRouteData('/hawkeye/reservoirs/malibar',"nmbm_mali_r")


module.exports = router;
