var connection=require('./config');

class viewRequestStatus{

static ViewStatusUser(req,res)
{
    var facultyID=req.body.faculty_id;
    connection.query('select r.request_id,r.date,r.duration,GROUP_CONCAT(COALESCE(s.name,"false"))Student_name,GROUP_CONCAT(rd.Student_id) Student_id,GROUP_CONCAT(rd.status) status  from requests r inner join faculty_registration f on r.sender_id=f.Faculty_id inner join request_data rd on r.request_id=rd.request_id left join student_registration s on rd.student_id=s.Reg_id WHERE (r.sender_id=?)  group by request_id ',[facultyID],function(error,fields,results){
      if(error)
      {
        res.json({
          status:false,
          message:error.sqlMessage,
          code:401
        });
      }
      else {
        res.json({
          status:true,
          data:fields,
          message:'requests retrieved',
          code:400
        });
      }
    });

}

}
module.exports=viewRequestStatus;
