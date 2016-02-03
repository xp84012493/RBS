/**
 * Created by leo on 2015-06-20.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('rss/price', { title: '康复统计系统' });
});

module.exports = router;