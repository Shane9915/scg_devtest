var express = require('express');
var router = express.Router();

//# Require SCG controller.
var scg_controller = require('../controllers/scg'); 


//# SCG for front-end pages

router.get('/sequencesolver', function(req, res, next) {
   res.render('sequencesolver', { title: 'Sequence Solver' });
});

router.get('/googleplacesearch', function(req, res, next) {
   res.render('googleplacesearch', { title: 'Google PlaceSearch' });
});

router.get('/linemessageapi', function(req, res, next) {
   res.render('linemessageapi', { title: 'Line Message Bot API' });
});


//# SCG Api for back-end module

//#sequencesolver
router.get('/api/sequencesolver/:sequence', scg_controller.sequencesolver_path);
router.post('/api/sequencesolver', scg_controller.sequencesolver_path_post);

//#googleplacesearch
router.get('/api/googleplacesearch', scg_controller.googleplacesearch_path);
router.post('/api/googleplacesearch', scg_controller.googleplacesearch_path_post);


module.exports = router;
