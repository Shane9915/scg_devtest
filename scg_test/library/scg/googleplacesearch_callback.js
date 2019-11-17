var request = require('sync-request');
var fs = require('fs');

class GooglePlaceSearch 
{ 
   constructor(){
      this.myAPIkey = "AIzaSyCIEpP9tUjrkJI8tYhmHIobk3cvVlhrrd8"
      this.query = ""; //restaurants in Bang Sue
      this.API_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+this.query+"&key="+this.myAPIkey
      this.filename = "googledata.json"
   }

   async getGoogleApi( resObj, query_param ){

      this.query = query_param

      if ( fs.existsSync(this.filename) ) {
         this.readCacheData(resObj, this.filename)
      }
      else{
         this.API_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+this.query+"&key="+this.myAPIkey

         let res = await request('GET', this.API_url);
         let resData = JSON.parse( res.body.toString('utf-8') );
         //console.log(resData)

         this.writedataIntoCache( resObj, resData, this.readCacheData, this.filename )
         //this.readCacheData(resObj, this.filename)
      }

   }

   readCacheData(resObj, thisfilename ){
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
      resObj.send(resdata);

   }

   writedataIntoCache(resObj, resData, callback, thisfilename ){
      fs.writeFile (thisfilename, JSON.stringify(resData), function(err) {
            if (err) throw err;
            //console.log('complete');
            callback(resObj, thisfilename)
         }
      );
   }

}

module.exports = GooglePlaceSearch