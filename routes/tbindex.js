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
  var sql = 'select * from dish order by id desc limit 0,3';
  connection.query(sql, function (err, result, fields) {
      if (err) {
          console.log('err', err);
          return;
        } else { res.render('tbindex', { data: result }); }
  });
});

router.get('/addpage',(req,res) =>{
    res.render('addindex',{obj:{},id:""});
  });



router.post('/addindex',(req,res) => {
    var insertSql ="insert into dish(photo,title,cookTime,price,dorder,introduce) values(?,?,?,?,?,?)";
let a =[req.body.photo,req.body.title,req.body.cookTime,req.body.price,req.body.dorder,req.body.introduce];
connection.query(insertSql,a,function (err,results,fields){
  if (err){
    console.log('err',err);
    return;
  }else{
    res.redirect('/tbindex');
  }
})

});

router.post('/', function (req, res, next) {
  var insql = 'select * from dish where photo=? or title=? or cookTime=? or price=? or dorder=? or introduce=?';
   
  connection.query(insql, [req.body.sea,req.body.sea,req.body.sea,req.body.sea,req.body.sea,req.body.sea], function (err, result, fields) {
    if (err) {
      console.log('err', err);
      return;
    } else { 
      if (result == '') {
        res.send('没有此类产品哟！');
    }
    else{
      res.render('tbindex', { data: result }); }
    }
});
});



router.get('/del/:id',(req,res) => {

      connection.query("delete from dish where id='"+req.params.id+"'",function(){
      res.redirect('/tbindex')
    })
  });

router.get('/updateindex/:id',(req,res)=>{
  connection.query("select * from dish where id= ? ",[req.params.id],(err,result)=>{
res.render('updateindex',{obj:result[0]});
})
});

router.post('/updateindex',(req,res) =>{
  var sql ='update dish set photo=?,title=?,cookTime=?,price=?,dorder=?,introduce=? where id= ? '
  connection.query(sql,[req.body.photo,req.body.title,req.body.cookTime,req.body.price,req.body.dorder,req.body.introduce,req.body.id], function (err, result, fields) {
    if (err) {
      console.log('err', err);
      return;
  } else {
      res.redirect('/tbindex');
  }
});
});

router.get('/nextpage', function (req, res, next) {
  connection.query("select * from dish order by id desc limit 3,6", function (err, result, fields) {
      if (err) {
          console.log('err', err);
          
        } else { res.render('tbindex', { data: result }); }
      });
      });


module.exports = router;