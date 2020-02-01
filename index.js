var express=require('express');
var bodyparser=require('body-parser');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var config=require('./config');

var s_registerController=require('./student_register');
var departmentController=require('./department');
var courseController=require('./course');

const port = process.env.port || 8080;
var app=express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post('/',(req,res){
  res.send("Hello app");
})

app.post('/student_register',(req,res)=>{
  s_registerController.s_registerUser(req.body.Reg_id,req.body.name,req.body.dept_id,req.body.course_id,req.body.year,req.body.email_id,req.body.contact,req.body.password,req.body.isCoordinator);
});

app.post('/department',(req,res)=>{
  departmentController.departmentUser(res);
});


app.post('/course',(req,res)=>{
  courseController.courseUser(req.body.dept_id,res);
});


app.listen(port,()=>{
  console.log("server started "+port);
});
