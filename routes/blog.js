let express = require ('express');
let router = express.Router();
var mysql =require('mysql');
var connection =mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'hotte'
})
connection.connect();

router.get('/', function (req, res, next) {
    
    connection.query("select * from moredish", function (err, result, fields) {
        if (err) {
            console.log('err', err);
            return;
        } else { res.render('blog', { data: result }); }
    });
});


module.exports = router;