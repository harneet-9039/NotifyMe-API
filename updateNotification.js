var connection=require('./config');
class UpdateNotification{

    static updateNotification(res,req){
        if(req.body.studentID==undefined){
           
                //id honi chaie notification ki
                connection.query('update notification set status=1 where F_Reg_id=?',req.body.facultyID,function(error,results,fields){
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
                    res.json({
                        status:true,
                        code:200,
                        message:'status changed'
                      });
                  }
     
    
                });
        
        }
        else{
            connection.query('update notification set status=1 where S_Reg_id=?',req.body.studentID,function(error,results,fields){
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
                  res.json({
                      status:true,
                      code:200,
                      message:'status changed'
                    });
                }
   
  
              });
        }
       
        
  }
}
module.exports=UpdateNotification;
