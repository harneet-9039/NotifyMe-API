var connection=require('./config');

class login{

static loginUser(reg_id,pass,client,res)
{
  connection.query('call login(?,?,@res);select @res "Code"',[reg_id,pass],function(error,fields,results){
   if(error){
     res.json({
       status:false,
       code:'345',
       message:'Internal server error'
     })
   }
   else {
     if(fields[1][0].Code=='101')
     res.json({
       status:false,
       message:'Username and password do not match'
     })
     else if(fields[1][0].Code=='102')
     res.json({
       status:false,
       message:'Register first'
     })
     else if(fields[1][0].Code=='103')
     res.json({
       status:false,
       message:'Account not activated,Check your gmail to activate'
     })
     else {
       client.set('Reg_id',reg_id);
       res.json({
         status:true,
         code:'100',
         message:'Úser successfully logged in'
       })
     }
   }

  });
}

}
module.exports=login;
