var connection=require('./config');

class login{

static loginUser(reg_id,pass,res)
{
  connection.query('call login(?,?,@res);select @res "Code"',[reg_id,pass],function(error,fields,results){
   if(error){
     res.json({
       status:false,
       code:'345',
       message:error.sqlMessage
     })
   }
   else {
     if(fields[1][0].Code=='101')
     res.json({
       status:false,
       code: '400',
       message:'Username and password do not match'
     })
     else if(fields[1][0].Code=='102')
     res.json({
       status:false,
       code:'401',
       message:'Register first'
     })
     else if(fields[1][0].Code=='103')
     res.json({
       status:false,
       code:'402',
       message:'Account not activated,Check your gmail to activate'
     })
     else if(fields[1][0].Code=='100'){
         connection.query('select Reg_id,name,dept_id,course_id,year,email_id,cast(contact as CHAR) as contact from student_registration where Reg_id=? ',[reg_id],function(error,fields,results){
           if(!error)
           {
             res.json({
               status:true,
               data:fields,
               code:'100',
               message:'Student successfully logged in'
             })
           }
         });

     }
     else if(fields[1][0].Code=='200'){
       connection.query('select Reg_id,name,dept_id,course_id,year,email_id,cast(contact as CHAR) as contact from student_registration where Reg_id=? ',[reg_id],function(error,fields,results){
         if(!error)
         {
           res.json({
             status:true,
             data:fields,
             code:'200',
             message:'Coordinator successfully logged in'
           })
         }
       });

     }
     else if(fields[1][0].Code=='300'){
       connection.query('select Faculty_id,Name,email_id,cast(contact as CHAR) as contact,dept_id,designation from faculty_registration where Faculty_id=?',[reg_id],function(error,fields,results){
         if(!error)
         {
           res.json({
             status:true,
             data:fields,
             code:'300',
             message:'Faculty successfully logged in'
           })
         }
       });

     }
   }

  });
}

}
module.exports=login;
