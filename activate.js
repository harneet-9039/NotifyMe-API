var connection=require('./config');

class activate{

static activateUser(reg_id,res)
{
  connection.query('select * from student_registration where Reg_id=?',[reg_id],function(error,fields,results){
    if(fields[0].isActivated!=0)
    {
      res.writeHead(200, { 'Content-Type': 'text/html' });
             res.write('<h1 style="color:green;text-align:center" > Account already activated</h1><br /><h2 style="color:blue;text-align:center;">You can directly login</h2>');
             res.end();
    }
    else{

      connection.query('update student_registration set isActivated=1 where Reg_id=?',[reg_id],function(error,fields,results){
       if(error){
         res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h1 style="color:red;text-align:center" >Error</h1><br /><h2  style="color:blue;text-align:center;">Internal Server Error</h2>');
                res.end();
       }
       else {
         res.writeHead(200, { 'Content-Type': 'text/html' });
              res.write('<h1 style="color:green;text-align:center">Success</h1><br /><h2 style="color:blue;text-align:center;">Account activated, you can now login to continue</h2>');
              res.end();
       }

      });
    }
  });

}

}
module.exports=activate;
