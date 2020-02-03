var connection=require('./config');

class activate{

static activateUser(reg_id,res)
{
  connection.query('update student_registration set isActivated=1 where Reg_id=?',[reg_id],function(error,fields,results){
   if(error){
     res.json({
       status:false,
       code:'345',
       message:'Internal server error'
     })
   }
   else {
    res.json({
      status:true,
      code:100,
      message:'Account activated,you can now login to continue'
    })
   }

  });
}

}
module.exports=activate;
