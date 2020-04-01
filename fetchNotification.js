var connection=require('./config');
class fetchNotification{

    static fetchNotification(res,req){
        if(req.body.studentID==undefined){
           
                //id honi chaie notification ki
                connection.query('select title,date,status from notification where F_Reg_id=?',req.body.facultyID,function(error,results,fields){
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
                        data:results,
                        message:'notification fetched'
                      });
                  }
     
    
                });
        
        }
        else{
            connection.query('select title,date,status from notification where status=0 and S_Reg_id=?',req.body.studentID,function(error,results,fields){
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
                      data:results,
                      message:'notification fetched'
                    });
                }
   
  
              });
        }
       
        
  }
}
module.exports=fetchNotification;
