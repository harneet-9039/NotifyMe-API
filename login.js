var connection=require('./config');

class login{

static loginUser(reg_id,pass,token,res,flag)
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
         connection.query('select s.Reg_id,s.name,s.dept_id,d.Dept_name,s.course_id,c.Course_branch,s.year,s.email_id,cast(s.contact as CHAR) as contact from student_registration s inner join department d on s.dept_id=d.Dept_id inner join courses c on s.course_id=c.Course_id where Reg_id=? ',[reg_id],function(error,fields,results){
           if(!error)
           {
            var temp=fields;
             if(flag==undefined){
              res.json({
                status:true,
                code:'200',
                data:temp,
                message:'student successfully logged in'
              });
             }
             else{
             
            connection.query('insert into registrationtoken values(?,?)',[reg_id,token],function(error,fields,results){
            if(!error){
              res.json({
                status:true,
                code:'200',
                data:temp,
                message:'student successfully logged in'
            });
          }
           else{
            res.json({
              status:true,
              code:'430',
              message:'error'
          }); 
           }
           
           });
          }
          }
           else{
            res.json({
              status:true,
              code:'430',
              message:'error'
          }); 
           }
          });
        }
          
     else if(fields[1][0].Code=='200'){
       connection.query('select s.Reg_id,s.name,s.dept_id,d.Dept_name,s.course_id,c.Course_branch,s.year,s.email_id,cast(s.contact as CHAR) as contact from student_registration s inner join department d on s.dept_id=d.Dept_id inner join courses c on s.course_id=c.Course_id where Reg_id=? ',[reg_id],function(error,fields,results){
        if(!error)
        {
          var temp=fields;
          if(flag==undefined){
            res.json({
              status:true,
              code:'200',
              data:temp,
              message:'student successfully logged in'
            });
           }
           else{
          
         connection.query('insert into registrationtoken values(?,?)',[reg_id,token],function(error,fields,results){
         if(!error){
           res.json({
             status:true,
             code:'200',
             data:temp,
             message:'Coordinator successfully logged in'
         });
       }
        else{
         res.json({
           status:true,
           code:'430',
           message:'error'
       }); 
        }
        
        });
      }
       }
        else{
         res.json({
           status:true,
           code:'430',
           message:'error'
       }); 
        }
       });

     }
     else if(fields[1][0].Code=='300'){
 connection.query('select f.Faculty_id,f.Name,f.email_id,cast(f.contact as CHAR) as contact,f.dept_id,d1.Dept_name,f.designation,GROUP_CONCAT(fc.course_id) as Course_id ,GROUP_CONCAT(fc.year) as year,GROUP_CONCAT(c.Course_branch) as course_name,GROUP_CONCAT(c.Dept_id) as Course_Dept_id, GROUP_CONCAT(d.Dept_name) as Course_Dept_name from faculty_registration f inner join department d1 on f.dept_id=d1.Dept_id left join faculty_courses fc on f.Faculty_id=fc.faculty_id inner join courses c on fc.course_id=c.Course_id inner join department d on c.Dept_id=d.Dept_id where f.Faculty_id=? group by faculty_id ',[reg_id],function(error,fields,results){
  if(!error)
  {
    var temp=fields;
    if(flag==undefined){
      res.json({
        status:true,
        code:'200',
        data:temp,
        message:'student successfully logged in'
      });
     }
     else{
   connection.query('insert into registrationtoken values(?,?)',[reg_id,token],function(error,fields,results){
   if(!error){
     res.json({
       status:true,
       code:'200',
       data:temp,
       message:'student successfully logged in'
   });
 }
  else{
   res.json({
     status:true,
     code:'430',
     message:'error'
 }); 
  }
  
  });
}
 }
  else{
   res.json({
     status:true,
     code:'430',
     message:'error'
 }); 
  }
       });

     }
   }

  });
}

}
module.exports=login;
