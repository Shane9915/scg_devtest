const axios = require("axios");
const fs = require('fs');

class GooglePlaceSearch 
{ 
   constructor(){
      this.myAPIkey = "AIzaSyCIEpP9tUjrkJI8tYhmHIobk3cvVlhrrd8"
      this.query = "restaurants in Bang Sue"
      this.API_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+this.query+"&key="+this.myAPIkey
      this.filename = "googledata.json"
   }

   async getGoogleApi( resHttpObj ){

      if ( fs.existsSync(this.filename) ) {
         this.readCacheData(resHttpObj, this.filename)
      }
      else{ 
         try {
            const res = await axios.get(this.API_url);
            let resData = res.data;
            //console.log(resData);
            this.writedataIntoCache( resData, this.filename)
            resHttpObj.send(resdata);
         } catch (error) {
            //console.log(error);
         }
      }
      
   }

   readCacheData(resHttpObj, thisfilename ){
      let rawdata = fs.readFileSync( thisfilename );
      let data = JSON.parse(rawdata);
      //console.log(data);
      
      //#filter fields for displaying
      //console.log(data.results.length);
      var resdata = [];
      for(var i=0; i<data.results.length; i++){
         var data_el = {};
         data_el['name'] = data.results[i].name;
         data_el['address'] = data.results[i].formatted_address;
         resdata.push(data_el);
         //console.log('('+(i+1)+') '+ data.results[i].name);
         //console.log('     '+data.results[i].formatted_address);
      }
      //console.log(resdata);

      //#Send out HTTP output directly
      resHttpObj.send(resdata);
   }

   writedataIntoCache(resData, thisfilename ){
      fs.writeFile (thisfilename, JSON.stringify(resData), function(err) {
         if (err) throw err;
            //console.log('complete');
         }
      );
   }

}

module.exports = GooglePlaceSearch