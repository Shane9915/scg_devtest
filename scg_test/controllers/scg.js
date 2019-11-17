const SCG_SequenceSolver = require('../library/scg/sequencesolver')
let scg_SequenceSolver_Obj = new SCG_SequenceSolver()

const SCG_GooglePlaceSearch = require('../library/scg/googleplacesearch_callback')
let scg_GooglePlaceSearch_Obj = new SCG_GooglePlaceSearch()


exports.sequencesolver_path = function(req, res, next) {
   console.log(req.params.sequence);

   //#Call Library Class of SolveVariables from ../library/scg/sequencesolver
   scg_SequenceSolver_Obj.setSequence(req.params.sequence)
   var getVariablesValue = scg_SequenceSolver_Obj.FindVariables()
   res.send(getVariablesValue);

};

exports.sequencesolver_path_post = function(req, res, next) {
   console.log('sequence: '+req.body.sequence);

   //#Call Library Class of SolveVariables from ../library/scg/sequencesolver
   scg_SequenceSolver_Obj.setSequence(req.body.sequence)
   var getVariablesValue = scg_SequenceSolver_Obj.FindVariables()
   res.send(getVariablesValue);
};


exports.googleplacesearch_path = function(req, res, next) {
   //console.log(req.params.squence);

   //#Call Library Class of Googleplacesearch from ../library/scg/googleplacesearch
   var search_param = "restaurants in Bang Sue"
   scg_GooglePlaceSearch_Obj.getGoogleApi(res, search_param)
};

exports.googleplacesearch_path_post = function(req, res, next) {
   console.log('searchparam: '+req.body.searchparam);

   //#Call Library Class of Googleplacesearch from ../library/scg/googleplacesearch
   var search_param = "restaurants in Bang Sue"
   scg_GooglePlaceSearch_Obj.getGoogleApi(res, search_param)
};

exports.scg_home = function(req, res, next) {
   res.send('scg home');
};



