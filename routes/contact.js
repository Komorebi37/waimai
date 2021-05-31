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
    res.render('contact');
});

router.post('/', (req, res) => {

    var insertSql = 'insert into order(order,quantity,time,name,phone,email,address,contact) values(?,?,?,?,?,?,?,?)';
    connection.query(insertSql, [req.body.select,req.body.quantity,req.body.time,req.body.name,req.body.phone,req.body.email,req.body.address,req.body.contact], function (err, result, fields) {
    
        if (err) {
            console.log('err', err);
            return;
        } else {
           
            res.redirect('/index');
        }
   });
    });

module.exports = router;