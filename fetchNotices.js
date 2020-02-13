var connection=require('./config');

class notice{

static noticeUser(scope,dept_id,course_id,year,res)
{

      var Scope=scope;
      var Dept_id=dept_id==undefined?0:dept_id;
      var Course_id=course_id==undefined?0:course_id;
      var Year=year==undefined?0:year;
  connection.query('(select n.Notice_id, s.name, s.Reg_id,n.validity,n.priority,n.title,n.description,n.date_time,s.email_id,s.isCoordinator,GROUP_CONCAT(a.Att_name) Attachments,GROUP_CONCAT(i.Img_name) Images from  student_registration s inner join notices n on n.S_sender_id=s.Reg_id left join attachments a on n.Notice_id=a.NoticeID left join images i on n.Notice_id=i.NoticeID inner join scope sc on n.Notice_id=sc.NoticeID where sc.scope = ? and sc.Dept_id =? and sc.Course_id =? and sc.Year=? group by Notice_id)union (select n.Notice_id, f.Name , f.Faculty_id, n.validity,n.priority,n.title,n.description,n.date_time,f.email_id, f.designation ,GROUP_CONCAT(a.Att_name) Attachments,GROUP_CONCAT(i.Img_name) Images from  faculty_registration f inner join notices n on n.F_sender_id=f.Faculty_id left join attachments a on n.Notice_id=a.NoticeID left join images i on n.Notice_id=i.NoticeID inner join scope sc on n.Notice_id=sc.NoticeID where sc.scope=? and sc.Dept_id=? and sc.Course_id =? and sc.Year=? group by Notice_id)',[Scope,Dept_id,Course_id,Year],(error,fields,results)=>{
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
