var connection=require('./config');
class Logout{

      static logout(res,req){
        connection.query('delete from registrationtoken where regID=? and DeviceToken=?',[req.body.regID,req.body.token],(error,results,fields)=>{
            if(error){
              res.json({
                status:false,
                code: 404,
                message:error.sqlMessage
              });
    
            }else{
                res.json({
                    status:true,
                    code: 200,
                    message:'record deleted successfully'
                  });
            }
        });
    }
}
module.exports=Logout;
