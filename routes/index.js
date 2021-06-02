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

// router.get('/shop:id'),(req,res)=>{
// connection.query("update dish set flip =" +(result[0].flip +1)+"where id ="+req.params.id),(err,result)=>{
//     res.render('index',{data:result[0]});
//     }
// }




module.exports = router;