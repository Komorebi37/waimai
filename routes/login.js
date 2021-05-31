
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

// router.get('/',(req,res)=>{
//     res.render('login');
// });
// router.post('/login',(req,res)=>{
//     let name=req.body.name;
//     let pass= req.body.pass;

//     if( req.session.user != undefined 
//         && 
//         name ==req.session.user.name
//         && 
//         pass == req.session.user.pass){
//             // res.send("login success");
//             res.redirect("/index");
//         }else{
//             res.send("login fail", );
//         }
         
// });



//  router.get('/',(req,res)=>{
//    res.render('login');
//  });

//  router.post('/login', (req, res) => {

//     var a = 'insert into login(userName,password) values(?,?)';
//     connection.query(a, [req.body.name,req.body.pass], function (err, result, fields) {
    
//  if (err) {
//             console.log('err', err);
//             return;
//         } else {
           
//             res.redirect('/index');
//         }
//     });
//     });
router.get('/', function (req, res) {
  res.render('login');
});
router.post('/', (req, res) => {


  var selectSQL = "select name,pass from register where name = '" + req.body.name + "' and pass = " + req.body.pass + "";
  connection.query(selectSQL, function (err, result, fields) {
      if (err) {
          console.log('err', err);
          return;
      } else {
       
          if (result == '') {
              res.send('登录失败');
          }
          else {
            if( req.body.name=="小陆"&& req.body.pass==123){
            res.redirect("/local");
  
            }else{
            res.redirect('/');
            }
          }
        }                 
  });
});

module.exports = router;
