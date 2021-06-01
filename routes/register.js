let express = require ('express');
let router = express.Router();


// let User=require('./bean/user');

// router.get('/',(req,res)=>{
//     res.render('register');
// })

// router.post('/',(req,res)=>{
    
//    let user= new User(req.body.name,req.body.pass,req.body.cpass,req.body.sname,req.body.phone,req.body.mail);
//    console.log(user);
//    req.session.user = user;
//    res.send("register success");    

// })


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hotte"
});
connection.connect();

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/', (req, res) => {
var find ="select name,pass from register where name = '" + req.body.name + "' and pass = " + req.body.pass + ""
    var insertSql = 'insert into register(name,pass,cpass, sname, phone, mail) values(?,?,?,?,?,?)';
    connection.query(find,function(err,result,fields){

    
        if (err) {
            console.log('err', err);
            return;
        } else if(result.length > 0){
            res.send('用户账号已经存在哟！')
        }else{ 
            connection.query(insertSql, [req.body.name,req.body.pass,req.body.cpass,req.body.sname,req.body.phone,req.body.mail], function (err, result, fields) {
            res.redirect('/sign');
        
    });
    }
    });
}) 

module.exports = router;