var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   res.status(403);
   res.json({"code":403,"response":'no autorized'});
});

module.exports = router;
