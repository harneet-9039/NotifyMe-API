var express=require('express');
var bodyparser=require('body-parser');
var cookieParser=require('cookie-parser');
var nodemailer=require('nodemailer');
var session=require('express-session');
var config=require('./config');
//var redis=require('redis');

var s_registerController=require('./student_register');
var departmentController=require('./department');
var courseController=require('./course');
var loginController=require('./login');
var activateController=require('./activate');

const port = process.env.PORT || 3000;
var app=express();

let client
if(process.env.REDIS_URL)
   client=redis.createClient(process.env.REDIS_URL);
   else
client=redis.createClient();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post('/',(req,res)=>{
  res.send("Hello app");
})

app.post('/student_register',(req,res)=>{
  s_registerController.s_registerUser(req.body.Reg_id,req.body.name,req.body.dept_id,req.body.course_id,req.body.year,req.body.email_id,req.body.contact,req.body.password,req.body.isCoordinator,nodemailer,req,res);
});

app.post('/department',(req,res)=>{
  departmentController.departmentUser(res);
});


app.post('/course',(req,res)=>{
  courseController.courseUser(req.body.dept_id,res);
});

app.post('/login',(req,res)=>{
  loginController.loginUser(req.body.reg_id,req.body.password,res);
});

app.get('/activate',(req,res)=>{
  console.log('hello');
  console.log(req.query.id);
  activateController.activateUser(req.query.id,res);
});


app.listen(port,()=>{
  console.log(`Server is running at port `+port);
});
