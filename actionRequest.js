var connection=require('./config');

class requestRespond{

static RequestRespondUser(req,res)
{
     var request_id=req.body.request_id;
    var student_id=req.body.student_id;
    var flag=req.body.flag;
    if(flag==1)
    {
  connection.query('select * from student_registration where Reg_id like ?',[student_id],function(error,fields,results){
    if(error)
    {
      console.log(error);
      res.json({
        status:false,
        message:error.sqlMessage,
        code:401
      });
    }
    else{
      console.log(fields.length);
      if(fields.length==1)
      {
        connection.query('update request_data set status=1 where student_id=? and request_id=?; update student_registration set isCoordinator=1,eventName=(select eventName from requests where request_id=?) where Reg_id=?',[student_id,request_id,request_id,student_id],function(error,fields,results){
          if(error)
          {
            res.json({
              status:false,
              message:error.sqlMessage,
              code:402
            });
          }
          else{
            res.json({
              status:true,
              message:'request accepted',
              code:200
            });
          }
        });
      }
      else {
        connection.query('update request_data set status=2 where student_id=? and request_id=?',[student_id,request_id],function(error,fields,results){
          if(error)
          {
            res.json({
              status:false,
              message:error.sqlMessage,
              code:402
            });
          }
          else{
            res.json({
              status:true,
              message:'Invalid Registration Id',
              code:400
            });
          }
        });
      }
    }
  });
}
else {
  connection.query('select * from student_registration where Reg_id like ?',[student_id],function(error,fields,results){
    if(error)
    {
      res.json({
        status:false,
        message:error.sqlMessage,
        code:401
      });
    }
    else{
      console.log(fields.length);
      if(fields.length==1)
      {
        connection.query('update request_data set status=-1 where student_id=? and request_id=?',[student_id,request_id],function(error,fields,results){
          if(error)
          {
            res.json({
              status:false,
              message:error.sqlMessage,
              code:402
            });
          }
          else{
            res.json({
              status:true,
              message:'request rejected',
              code:300
            });
          }
        });
      }
      else {
        connection.query('update request_data set status=2 where student_id=? and request_id=?',[student_id,request_id],function(error,fields,results){
          if(error)
          {
            res.json({
              status:false,
              message:error.sqlMessage,
              code:402
            });
          }
          else{
            res.json({
              status:true,
              message:'Invalid Registration Id',
              code:400
            });
          }
        });
      }
    }
  });
}

}

}
module.exports=requestRespond;
