var connection=require('./config');

class s_register{

    static s_registerUser(id,name,dept_id,course_id,year,email_id,contact,password,isCoordinator,nodemailer,req,res)
    {

      var students={
        "Reg_id":id,
        "name":name,
        "dept_id":dept_id,
        "course_id":course_id,
        "year":year,
        "email_id":email_id,
        "contact":contact,
        "password":password,
        "isCoordinator":0,
        "isActivated":0
      }
        connection.query('call register(?,?,?,@res);select @res "Code"',[id,email_id,contact],function(error,fields,results){
          if(error){
            console.log(error);
            res.json({
              status:false,
              code:345,
              message:'Internal Server error'
            })
          }
          else{
            if (fields[1][0].Code=='101')
            res.json({
              status:false,
              message:'User already registered'
            })

            else if(fields[1][0].Code=='102')
            res.json({
              status:false,
              message:'Email_id already registered'
            })

            else if(fields[1][0].Code=='103')
            res.json({
              status:false,
              message:'contact already registered'
            })

            else {
              var smtpTransport=nodemailer.createTransport({
                service:"Gmail",
                auth:{
                  user:"notifyMe9039@gmail.com",
                  pass:"Notify@123"
                }
              });

            //  var rand=Math.floor((Math.random()*100)+54);
              var host=req.get('host');
              console.log(host);
             var link="https://"+req.get('host')+"/activate?id="+id;
              var mailOptions={
                to: email_id,
                subject:"Please confirm your Email Account",
                html:"Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click Here to verify</a>"
              }
              console.log(mailOptions);

              smtpTransport.sendMail(mailOptions,function(error,response){
                if(error)
                {
                  console.log(error);
                  res.json({
                    status:false,
                    message:"Email Id provided is not correct"
                  })
                }
                else{
                  connection.query('insert into student_registration set ?',students,function(error,results,fields){
                  if(error)
                  {
                    res.json({
                      status:false,
                      message:error.sqlMessage
                    })
                  }
                  else{
                  res.json({
                    status:true,
                    message:'User registered successfully , Check your gmail to activate'
                  })
                }

              });
            }
                });

            }
          }
        });
    }

}
module.exports=s_register;
