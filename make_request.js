var connection=require('./config');
var uuid = require('uuid/v1');

class request{

static requestUser(req,res)
{
  const ID=uuid();
  var date_ob=new Date();
  console.log(date_ob);
      var sender_id=req.body.sender_id;
      var duration=req.body.duration;
      var array=JSON.parse(req.body.student_id);
      var date=date_ob.getDate();
      var month=date_ob.getMonth()+1;
      var year=date_ob.getFullYear();
      var date1=year+'-'+month+'-'+date;
      var status=0;


console.log(array);
  var request={
    "request_id":ID,
    "sender_id":sender_id,
    "date":date1,
    "duration":duration
  }

var flag=0;
   connection.query('insert into requests SET ?',request,function(error,results,fields){
         if(error)
         {
           console.log(error);
           res.json({
             status:false,
             code:401,
             message:error.sqlMessage
           })
         }
         else {
           array.forEach(item => {
               connection.query('insert into request_data values(?,?,?)',[ID,item,status],function(error,results,fields){
                 if(error)
                 {
                   console.log(error);
                   res.json({
                     status:false,
                     code:401,
                     message:'Error in making request'
                   });
                 }
                 else {
                   flag=1;
                 }


               });


           });

if(flag==1)
{
           res.json({
             status:true,
             code:400,
             message:'Request made successfully'
           });
         }


         }
   });





}

}
module.exports=request;
