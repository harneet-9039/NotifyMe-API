var connection=require('./config');

class myNotices{

static myNoticeUser(req,res)
{
   var flag=0;
   if(req.body.student_id==undefined)
   {
     flag=1;
     var faculty_id=req.body.faculty_id;
   }
   else {
     var student_id=req.body.student_id;
   }
   if (flag==0)
   {
     connection.query('select n.Notice_id, d.Dept_name as mydepartment, c.Course_branch as mycourse, s.name, CAST(s.contact AS char) as contact,s.Reg_id,n.validity,n.priority,n.title,n.description,n.date_time,s.email_id,s.isCoordinator,sc.scope,d1.Dept_name as scope_department,c1.course_branch as scope_course,sc.year as scope_year,GROUP_CONCAT(a.File_path) Attachments,GROUP_CONCAT(i.Image_path) Images from  student_registration s  inner join department d on s.dept_id=d.Dept_id inner join courses c on d.Dept_id=c.Dept_id inner join notices n on n.S_sender_id=s.Reg_id left join attachments a on n.Notice_id=a.NoticeID left join images i on n.Notice_id=i.NoticeID inner join scope sc on n.Notice_id=sc.NoticeID  inner join department d1 on sc.Dept_id=d1.Dept_id inner join courses c1 on sc.Course_id=c1.Course_id where n.S_sender_id=? group by Notice_id',[student_id],function(error,fields,results){
       if(error)
       {
         res.json({
           status:false,
           code:401,
           message:error.sqlMessage
         });
       }
       else{
         res.json({
           status:true,
           code:400,
           data:fields,
           message:'notices retrieved'
         })
       }
     });
   }
   else {
     connection.query('select n.Notice_id,d.Dept_name as mydepartment, "" as mycourse, f.Name as name ,CAST(f.contact AS char) as contact, f.Faculty_id as Reg_id, n.validity,n.priority,n.title,n.description,n.date_time,f.email_id, f.designation as isCoordinator ,sc.scope,d1.Dept_name as scope_department,c1.course_branch as scope_course,sc.year as scope_year, GROUP_CONCAT(a.File_path) Attachments,GROUP_CONCAT(i.Image_path) Images from  faculty_registration f inner join department d on f.dept_id=d.Dept_id inner join courses c on d.Dept_id=c.Dept_id inner join notices n on n.F_sender_id=f.Faculty_id inner join scope sc  on n.Notice_id=sc.NoticeID inner join department d1 on sc.Dept_id=d1.Dept_id inner join courses c1 on sc.Course_id=c1.Course_id left join attachments a on n.Notice_id=a.NoticeID left join images i on n.Notice_id=i.NoticeID  where n.F_sender_id=? group by Notice_id',[faculty_id],function(error,fields,results){
       if(error)
       {
         res.json({
           status:false,
           code:401,
           message:error.sqlMessage
         });
       }
       else{
         res.json({
           status:true,
           code:400,
           data:fields,
           message:'notices retrieved'
         })
       }
     });
   }
}

}
module.exports=myNotices;
