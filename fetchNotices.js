var connection=require('./config');

class notice{

static noticeUser(scope,dept_id,course_id,year,res)
{

      var Scope=scope;
      var Dept_id=dept_id==undefined?1:dept_id;
      var Course_id=course_id==undefined?1:course_id;
      var Year=year==undefined?1:year;
  connection.query('(select n.Notice_id, d.Dept_name as department, c.Course_branch as course, s.name, CAST(s.contact AS char) as contact, s.Reg_id,n.validity,n.priority,n.title,n.description,n.date_time,s.email_id,s.isCoordinator,GROUP_CONCAT(a.File_path) Attachments,GROUP_CONCAT(i.Image_path) Images from  student_registration s  inner join department d on s.dept_id=d.Dept_id inner join courses c on d.Dept_id=c.Course_id inner join notices n on n.S_sender_id=s.Reg_id left join attachments a on n.Notice_id=a.NoticeID left join images i on n.Notice_id=i.NoticeID inner join scope sc on n.Notice_id=sc.NoticeID where sc.scope = ? and sc.Dept_id =? and sc.Course_id =? and sc.Year=? group by Notice_id)union (select n.Notice_id,d.Dept_name as department, c.Course_branch as course, f.Name ,CAST(f.contact AS char) as contact, f.Faculty_id, n.validity,n.priority,n.title,n.description,n.date_time,f.email_id, f.designation ,GROUP_CONCAT(a.File_path) Attachments,GROUP_CONCAT(i.Image_path) Images from  faculty_registration f inner join department d on f.dept_id=d.Dept_id inner join courses c on d.Dept_id=c.Course_id inner join notices n on n.F_sender_id=f.Faculty_id left join attachments a on n.Notice_id=a.NoticeID left join images i on n.Notice_id=i.NoticeID inner join scope sc on n.Notice_id=sc.NoticeID where sc.scope=? and sc.Dept_id=? and sc.Course_id =? and sc.Year=? group by Notice_id)',[Scope,Dept_id,Course_id,Year,Scope,Dept_id,Course_id,Year],(error,fields,results)=>{
    if(error)
    {
      console.log('error');
      res.json({
        status:false,
        code:401,
        messgae:error.sqlMessage
      });
    }
    else{
      res.json({
        status:true,
        data:fields,
        message:'notices retrieved'
      });
    }
  });

}


}
module.exports=notice;
