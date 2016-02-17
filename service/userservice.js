/**
 * Created by leo on 2016-02-14.
 */
var db = require('../dao/userdao');

exports.index = function (req, res, next) {
    db.allUsers(function (err, users) {
        if (err) {
            return next(err);
        }
        res.render('index.html', {users: users});
    });
};

exports.new = function (req, res, next) {
    //console.log(req);
    //console.log(req.body.content);
    var obj = req.body;
    db.add(obj, function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};