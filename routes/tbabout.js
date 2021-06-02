let express = require ('express');
let router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hotte",
    debug:true
});
connection.connect();

router.get('/', function (req, res, next) {
 
    connection.query("select * from cooker order by id desc limit 0,3", function (err, result, fields) {
        if (err) {
            console.log('err', err);
            return;
        } else { res.render('tbabout', { data: result }); }
    });
});

router.get('/addpage',(req,res) =>{
    res.render('addabout',{obj:{},id:""});
  });



router.post('/addabout',(req,res) => {
    var insertSql ="insert into cooker(name,photo,introduce) values(?,?,?)";
let a =[req.body.name,req.body.photo,req.body.introduce];
connection.query(insertSql,a,function (err,results,fields){
  if (err){
    console.log('err',err);
    return;
  }else{
    res.redirect('/tbabout');
  }
})

});

router.post('/', function (req, res, next) {
  var insql = 'select * from cooker where name=? or photo=? or introduce=?';
   
  connection.query(insql, [req.body.sea,req.body.sea,req.body.sea], function (err, result, fields) {
    if (err) {
      console.log('err', err);
      return;
    } else { 
      if (result == '') {
        res.send('没有这位厨师哟！');
    }
    else{
      res.render('tbabout', { data: result }); }
    }
});
});



router.get('/del/:id',(req,res) => {

      connection.query("delete from cooker where id='"+req.params.id+"'",function(){
        
      res.redirect('/tbabout')
    })
  });

router.get('/updateabout/:id',(req,res)=>{
  connection.query("select * from cooker where id= ?",[req.params.id],(err,result)=>{
res.render('updateabout',{obj:result[0]});
})
});

router.post('/updateabout',(req,res) =>{
  var sql ='update cooker set name=?,photo=?,introduce=? where id= ? '
  connection.query(sql,[req.body.name,req.body.photo,req.body.introduce,req.body.id], function (err, result, fields) {
    if (err) {
      console.log('err', err);
      return;
  } else {
      res.redirect('/tbabout');
  }
});
});

module.exports = router;