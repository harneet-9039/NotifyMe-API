var connection=require('./config');

class request{

static requestUser(req,res)
{
  var date_ob=new Date();
  console.log(date_ob);
      var sender_id=req.body.sender_id;
      var duration=req.body.duration;
      var array=JSON.parse(req.body.student_id);
      

    //  +connection.escape(course_id)+' )or(sc.scope=4 and sc.Dept_id='+connection.escape(dept_id)+' and sc.Course_id='+connection.escape(course_id)+' and  sc.Year='+connection.escape(year)+'))  group by Notice_id)';




}

}
module.exports=request;
