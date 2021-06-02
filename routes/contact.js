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

    var insertSql = 'insert into tab_order(dorder,quantity,time,name,phone,email,address,contact) values(?,?,?,?,?,?,?,?)';
    connection.query(insertSql, [req.body.dorder,req.body.quantity,req.body.time,req.body.name,req.body.phone,req.body.email,req.body.address,req.body.contact], function (err, result, fields) {
    
        if (err) {
            console.log('err', err);
            return;
        } else {
           
            res.redirect('/');
        }
   });
    });

module.exports = router;