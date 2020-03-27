var express=require('express');
var bodyparser=require('body-parser');
var nodemailer=require('nodemailer');
var config=require('./config');
var multer = require('express-fileupload');

var s_registerController=require('./student_register');
var departmentController=require('./department');
var courseController=require('./course');
var loginController=require('./login');
var activateController=require('./activate');
var createNoticeController = require('./createNotice');
var fetchNoticeController=require('./fetchNotices');
var facultyNoticeController=require('./faculty_fetchNotices');
var requestController=require('./make_request');
var viewRequestController=require('./viewRequests');


const port = process.env.PORT || 3000;
var app=express();

//app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(multer());
app.use(express.static(__dirname+'/uploads/Attachments'));
app.use(express.static(__dirname+'/uploads/Banner'));
//app.use(bodyparser.json({limit: '30mb', extended: true}));
//app.use(bodyparser.urlencoded({limit: '30mb', extended: true}));


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
  console.log(req.query.id);
  activateController.activateUser(req.query.id,res);
});

app.post('/create',(req,res)=>{
  console.log("hit");
  createNoticeController.createNotice(req,res);
});

app.post('/fetchNotice',(req,res)=>{
    fetchNoticeController.noticeUser(req.body.dept_id,req.body.course_id,req.body.year,res);
})

app.post('/faculty_fetchNotices',(req,res)=>{
     console.log(req.body);
    facultyNoticeController.facultyUser(req,res);
})

app.post('/make_request',(req,res)=>{
  requestController.requestUser(req,res);
})

app.post('/viewRequests',(req,res)=>{
  viewRequestController.ViewRequestUser(req,res);
})


app.listen(port,()=>{
  console.log(`Server is running at port `+port);
});
