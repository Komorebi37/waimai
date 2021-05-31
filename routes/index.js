let express = require ('express');
let router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hotte"
});
connection.connect();

router.get('/', function (req, res, next) {
    var sql = 'select * from dish';
    connection.query(sql, function (err, result, fields) {
        if (err) {
            console.log('err', err);
            return;
        } else { res.render('index', { data: result }); }
    });
});




module.exports = router;