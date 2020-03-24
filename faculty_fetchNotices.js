var connection=require('./config');

class faculty_notice{

static facultyUser(req,res)
{
      var dept_id=req.body.dept_id;
      var year=req.body.year;
      var sql=' (select n.Notice_id,d.Dept_name as department, c.Course_branch as course, f.Name ,CAST(f.contact AS char) as contact, f.Faculty_id, n.validity,n.priority,n.title,n.description,n.date_time,f.email_id,f.designation ,GROUP_CONCAT(a.File_path) Attachments,GROUP_CONCAT(i.Image_path) Images from  faculty_registration f inner join department d on f.dept_id=d.Dept_id inner join courses c on d.Dept_id=c.Course_id inner join notices n on n.F_sender_id=f.Faculty_id left join attachments a on n.Notice_id=a.NoticeID left join images i on n.Notice_id=i.NoticeID inner join scope sc on n.Notice_id=sc.NoticeID  where (sc.scope = 1 or (sc.scope=2 and sc.Dept_id ='+connection.escape(dept_id)+') or (sc.scope=3 or scope=4 and  sc.Course_id in (';

       if(req.body.course_id.length>1)
       {
         req.body.course_id.forEach(item => {

           sql+=' '+connection.escape(item)+',';

         });
         sql+=' -12))) group by Notice_id)';

     }

     console.log(sql);



    //  +connection.escape(course_id)+' )or(sc.scope=4 and sc.Dept_id='+connection.escape(dept_id)+' and sc.Course_id='+connection.escape(course_id)+' and  sc.Year='+connection.escape(year)+'))  group by Notice_id)';


  connection.query(sql,(error,fields,results)=>{
    if(error)
    {
      console.log('error');
      res.json({
        status:false,
        code:401,
        message:error.sqlMessage
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
module.exports=faculty_notice;
