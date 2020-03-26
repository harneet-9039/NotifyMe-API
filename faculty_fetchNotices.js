var connection=require('./config');

class faculty_notice{

static facultyUser(req,res)
{

      var dept_id=req.body.dept_id;
      var array = JSON.parse(req.body.course_id);
      console.log(array);

               var sql=' (select n.Notice_id,d.Dept_name as department, c.Course_branch as course, s.name ,CAST(s.contact AS char) as contact, s.Reg_id, n.validity,n.priority,n.title,n.description,n.date_time,s.email_id,s.isCoordinator ,sc.scope,GROUP_CONCAT(a.File_path) Attachments,GROUP_CONCAT(i.Image_path) Images from  student_registration s inner join department d on s.dept_id=d.Dept_id inner join courses c on d.Dept_id=c.Course_id inner join notices n on n.S_sender_id=s.Reg_id left join attachments a on n.Notice_id=a.NoticeID left join images i on n.Notice_id=i.NoticeID inner join scope sc on n.Notice_id=sc.NoticeID  where (sc.scope = 1 or (sc.scope=2 and sc.Dept_id ='+connection.escape(dept_id)+') or (sc.scope=3 and  sc.Course_id in (';

               array.forEach(item => {

                 sql+=' '+connection.escape(item)+',';

               });
       sql+=' -12)) or (scope=4 and  sc.Course_id in (';

               array.forEach(item => {

                 sql+=' '+connection.escape(item)+',';

               });

               sql+=' -12))) group by Notice_id) union (select n.Notice_id,d.Dept_name as department, c.Course_branch as course, f.Name as name,CAST(f.contact AS char) as contact, f.Faculty_id as Reg_id, n.validity,n.priority,n.title,n.description,n.date_time,f.email_id,f.designation as isCoordinator ,sc.scope,GROUP_CONCAT(a.File_path) Attachments,GROUP_CONCAT(i.Image_path) Images from  faculty_registration f inner join department d on f.dept_id=d.Dept_id inner join courses c on d.Dept_id=c.Course_id inner join notices n on n.F_sender_id=f.Faculty_id left join attachments a on n.Notice_id=a.NoticeID left join images i on n.Notice_id=i.NoticeID inner join scope sc on n.Notice_id=sc.NoticeID  where (sc.scope = 1 or (sc.scope=2 and sc.Dept_id ='+connection.escape(dept_id)+') or (sc.scope=3 and  sc.Course_id in (';

               array.forEach(item => {

                 sql+=' '+connection.escape(item)+',';

                });
        sql+=' -12)) or (scope=4 and  sc.Course_id in (';

               array.forEach(item => {

                 sql+=' '+connection.escape(item)+',';

               });




         array.forEach(item => {

           sql+=' '+connection.escape(item)+',';

         });
         sql+=' -12))) group by Notice_id)';



      console.log(sql);


  /*   else {
       var sql=' (select n.Notice_id, d.Dept_name as department, c.Course_branch as course, s.name, CAST(s.contact AS char) as contact, s.Reg_id,n.validity,n.priority,n.title,n.description,n.date_time,s.email_id,s.isCoordinator, GROUP_CONCAT(a.File_path) Attachments,GROUP_CONCAT(i.Image_path) Images from  student_registration s  inner join department d on s.dept_id=d.Dept_id inner join courses c on d.Dept_id=c.Course_id inner join notices n on n.S_sender_id=s.Reg_id left join attachments a on n.Notice_id=a.NoticeID left join images i on n.Notice_id=i.NoticeID inner join scope sc on n.Notice_id=sc.NoticeID where (sc.scope = 1 or (sc.scope=2 and sc.Dept_id ='+connection.escape(dept_id)+') or(sc.scope=3 or scope=4 and sc.Dept_id='+connection.escape(dept_id)+' and sc.Course_id ='+connection.escape(course_id)+' )or (sc.scope=4 and sc.Dept_id=2 and sc.Course_id=3   and  sc.Year=1)) group by Notice_id) union (select n.Notice_id,d.Dept_name as department, c.Course_branch as course, f.Name as name  ,CAST(f.contact AS char) as contact, f.Faculty_id as Reg_id, n.validity,n.priority,n.title,n.description,n.date_time,f.email_id,f.designation as isCoordinator  ,GROUP_CONCAT(a.File_path) Attachments,GROUP_CONCAT(i.Image_path) Images from  faculty_registration f inner join department d on f.dept_id=d.Dept_id inner join courses c on d.Dept_id=c.Course_id inner join notices n on n.F_sender_id=f.Faculty_id left join attachments a on n.Notice_id=a.NoticeID left join images i on n.Notice_id=i.NoticeID inner join scope sc on n.Notice_id=sc.NoticeID  where (sc.scope = 1 or (sc.scope=2 and sc.Dept_id =2) or (sc.scope=3 and sc.Dept_id=2 and sc.Course_id =3 )or(sc.scope=4 and sc.Dept_id=2 and sc.Course_id=3 and  sc.Year=1))  group by Notice_id)'
     }*/

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
