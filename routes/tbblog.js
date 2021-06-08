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
  var sql = 'select * from moredish order by id desc limit 0,3';
  connection.query(sql, function (err, result, fields) {
      if (err) {
          console.log('err', err);
          return;
        } else { res.render('tbblog', { data: result }); }
  });
});

router.get('/addpage',(req,res) =>{
    res.render('addblog',{obj:{},id:""});
  });



router.post('/addblog',(req,res) => {
    var insertSql ="insert into moredish(photo,time,title,introduce) values(?,?,?,?)";
let a =[req.body.photo,req.body.time,req.body.time,req.body.introduce];
connection.query(insertSql,a,function (err,results,fields){
  if (err){
    console.log('err',err);
    return;
  }else{
    res.redirect('/tbblog');
  }
})

});

router.post('/', function (req, res, next) {
  var insql = 'select * from moredish where photo=? or time=? or title=? or introduce=?';
   
  connection.query(insql, [req.body.sea,req.body.sea,req.body.sea,req.body.sea], function (err, result, fields) {
    if (err) {
      console.log('err', err);
      return;
    } else { 
      if (result == '') {
        res.send('没有此类产品哟！');
    }
    else{
      res.render('tbblog', { data: result }); }
    }
});
});



router.get('/del/:id',(req,res) => {

      connection.query("delete from moredish where id='"+req.params.id+"'",function(){
      res.redirect('/tbblog')
    })
  });

router.get('/updateblog/:id',(req,res)=>{
  connection.query("select * from moredish where id= ?",[req.params.id],(err,result)=>{
res.render('updateblog',{obj:result[0]});
})
});

router.post('/updateblog',(req,res) =>{
  var sql ='update moredish set photo=?,time=?,title=?,introduce=? where id= ? '
  connection.query(sql,[req.body.photo,req.body.time,req.body.title,req.body.introduce,req.body.id], function (err, result, fields) {
    if (err) {
      console.log('err', err);
      return;
  } else {
      res.redirect('/tbblog');
  }
});
});

router.get('/nextpage', function (req, res, next) {
  connection.query("select * from moredish order by id desc limit 3,6", function (err, result, fields) {
      if (err) {
          console.log('err', err);
          
        } else { res.render('tbblog', { data: result }); }
      });
      });
      router.get('/nextpage', function (req, res, next) {
        connection.query("select * from moredish order by id desc limit 0,3", function (err, result, fields) {
            if (err) {
                console.log('err', err);
                
              } else { res.render('tbblog', { data: result }); }
            });
            });
      
      



module.exports = router;