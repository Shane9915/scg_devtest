var express = require('express');
var router = express.Router();

/* GET cv home page. */
router.get('/', function(req, res, next) {
  res.render('cv', { title: 'My Resume' });
});

module.exports = router;
