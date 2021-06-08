var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hotte"
});
connection.connect();

router.get('/', function (req, res, next) {
  connection.query("select * from tab_order order by id desc limit 0,3", function (err, result, fields) {
      if (err) {
          console.log('err', err);
          return;
        } else { res.render('order', { data: result }); }
  });
});

   
router.post('/', function (req, res, next) {
var insql = 'select * from tab_order where dorder=? or quantity=? or time=? or name=? or phone=? or email=? or address=? or contact=?';
connection.query(insql, [req.body.sea,req.body.sea,req.body.sea,req.body.sea,req.body.sea,req.body.sea,req.body.sea,req.body.sea], function (err, result, fields) {
   if (err) {
          console.log('err', err);
          return;
        } else { res.render('order', { data: result }); }
    });
    });

router.get('/addpage',(req,res) =>{
  res.render('add',{obj:{},id:""});
});

router.post('/add',(req,res) => {
var insertSql ="insert into tab_order(dorder,quantity,time,name,phone,email,address,contact) values(?,?,?,?,?,?,?,?)";
let a =[req.body.order,req.body.quantity,req.body.time,req.body.name,req.body.phone,req.body.email,req.body.address,req.body.contact];
connection.query(insertSql,a,function (err,results,fields){
  if (err){
    console.log('err',err);
    return;
  }else{
    res.redirect('/order');
  }
})
});



router.get('/del/:id',(req,res) => {
  connection.query("delete from tab_order where id='"+req.params.id+"'",function(){
      res.redirect('/order')
    })
  });
  
  router.get('/update/:id',(req,res)=>{
    connection.query("select * from tab_order where id= ?",[req.params.id],(err,result)=>{
  res.render('update',{obj:result[0]});
  })
  });
  
  router.post('/update',(req,res) =>{
    var sql ='update tab_order set dorder=?,quantity=?,time=?,name=?,phone=?,email=?,address=?,contact=? where id= ? '
    connection.query(sql,[req.body.dorder,req.body.quantity,req.body.time,req.body.name,req.body.phone,req.body.email,req.body.address,req.body.contact,req.body.id], function (err, result, fields) {
      if (err) {
        console.log('err', err);
        return;
    } else {
        res.redirect('/order');
    }
  });
  });
  router.get('/nextpage', function (req, res, next) {
    connection.query("select * from tab_order order by id desc limit 3,6", function (err, result, fields) {
        if (err) {
            console.log('err', err);
            
          } else { res.render('order', { data: result }); }
        });
        });
  
  
        router.get('/lastpage', function (req, res, next) {
          connection.query("select * from tab_order order by id desc limit 0,3", function (err, result, fields) {
              if (err) {
                  console.log('err', err);
                  
                } else { res.render('order', { data: result }); }
              });
              });
        
        
      




module.exports = router;
