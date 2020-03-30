var connection=require('./config');

class notice{

static noticeUser(dept_id,course_id,year,res)
{
      var Dept_id=dept_id;
      var Course_id=course_id;
      var Year=year;


  connection.query('(select n.Notice_id, d.Dept_name as department, c.Course_branch as course, s.name, CAST(s.contact AS char) as contact,s.Reg_id,n.validity,n.priority,n.title,n.description,n.date_time,s.email_id,s.isCoordinator,s.eventName,sc.scope,GROUP_CONCAT(a.File_path) Attachments,GROUP_CONCAT(i.Image_path) Images from  student_registration s  inner join department d on s.dept_id=d.Dept_id inner join courses c on d.Dept_id=c.Dept_id inner join notices n on n.S_sender_id=s.Reg_id left join attachments a on n.Notice_id=a.NoticeID left join images i on n.Notice_id=i.NoticeID inner join scope sc on n.Notice_id=sc.NoticeID where (sc.scope = 1 or (sc.scope=2 and sc.Dept_id =?) or(sc.scope=3 and sc.Dept_id=? and sc.Course_id =? )or (sc.scope=4 and sc.Dept_id=? and sc.Course_id=?   and  sc.Year=?)) group by Notice_id) union (select n.Notice_id,d.Dept_name as department, "" as course, f.Name as name ,CAST(f.contact AS char) as contact, f.Faculty_id as Reg_id, n.validity,n.priority,n.title,n.description,n.date_time,f.email_id, f.designation as isCoordinator ,"" as eventName,sc.scope,GROUP_CONCAT(a.File_path) Attachments,GROUP_CONCAT(i.Image_path) Images from  faculty_registration f inner join department d on f.dept_id=d.Dept_id inner join courses c on d.Dept_id=c.Dept_id inner join notices n on n.F_sender_id=f.Faculty_id left join attachments a on n.Notice_id=a.NoticeID left join images i on n.Notice_id=i.NoticeID inner join scope sc on n.Notice_id=sc.NoticeID  where (sc.scope = 1 or (sc.scope=2 and sc.Dept_id =?) or (sc.scope=3 and sc.Dept_id=? and sc.Course_id =? )or(sc.scope=4 and sc.Dept_id=? and sc.Course_id=? and  sc.Year=?))  group by Notice_id)',[Dept_id,Dept_id,Course_id,Dept_id,Course_id,Year,Dept_id,Dept_id,Course_id,Dept_id,Course_id,Year],(error,fields,results)=>{
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
