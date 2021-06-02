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

router.get('/', function (req, res) {
    res.render('singlepost');
});

router.post('/', (req, res) => {

    var insertSql = 'insert into comments(name,email,message) values(?,?,?)';
    connection.query(insertSql, [req.body.name,req.body.email,req.body.message], function (err, result, fields) {
    
        if (err) {
            console.log('err', err);
            return;
        } else {
           
            res.redirect('/');
        }
 });
    });

module.exports = router;