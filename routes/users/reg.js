/**
 * Created by leo on 2015-06-21.
 */
var express = require('express');
var router = express.Router();
var userService = require('../../service/userservice');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users/reg', { title: '用户注册' });
});

router.post('/new', userService.new);

module.exports = router;
