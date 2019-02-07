 //ติดต่อกับMysql Express เรียกจากฐานข้อมูล
 var mysql = require('mysql');
 var express = require('express');
 var app = express();
 var bodyparser = require('body-parser');
 
 app.use(bodyparser.json());
 
 var mysql      = require('mysql');
 var con = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '1234',
   database : 'myblog'
 });   
 
  con.connect((err)=>{
    if(!err) 
    console.log('DB Connection Success...');
    else
    console.log('Db connection Failed \n Errro :'+JSON.stringify(err,underfined,2));
  });
 
  app.listen(3000,()=>console.log('Express server is runing at port no:3000'));
 
 //Get all Categoreis
 app.get('/categories',(req,res)=>{
    con.query('SELECT * FROM categories', (err,rows, fields)=>{
      if(!err)
      //console.log(rows[0].id);
       res.send(rows);
      else
      console.log(err);
    })
   });
  
   //Get an Categoreis
   app.get('/categories/:id',(req,res)=>{
    con.query('SELECT * FROM categories WHERE id =?',[req.params.id], (err,rows, fields)=>{
      if(!err)
      //console.log(rows[0].id);
       res.send(rows);
      else
      console.log(err);
    })
   });

   //DELETE an Categoreis
 app.delete('/categories/:id',(req,res)=>{
    con.query('DELETE FROM categories WHERE id =?',[req.params.id], (err,rows, fields)=>{
      if(!err)
      //console.log(rows[0].id);
       res.send('Deleted SuccessFully.');
      else
      console.log(err);
    });
   });

   //rest api to create a new record into mysql database
app.post('/categories', function (req, res) {
   var postData  = req.body;
   con.query('INSERT INTO categories SET ?', postData, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

    //rest api to update record into mysql database
app.put('/categories', function (req, res) {
    con.query('UPDATE `categories` SET `name`=?  where `id`=?', [req.body.name, req.body.id], function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });
    
  