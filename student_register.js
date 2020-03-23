var connection=require('./config');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "19478322100-ci86q8k7ra4b2p960l6s2ktgts9860rb.apps.googleusercontent.com",
  "0ngstkira0AfvwBq1_aDfGfE",
  "https://developers.google.com/oauthplayground" // Redirect URL
);

class s_register{

    static s_registerUser(id,name,dept_id,course_id,year,email_id,contact,password,isCoordinator,nodemailer,req,res)
    {
      oauth2Client.setCredentials({
        refresh_token: "1//04vrMd0YzRvrVCgYIARAAGAQSNwF-L9IrjqWKvdgSq83vYaWiGgsETh34EwLx3LZjAzSG-OCWWmJh0R-RdazwQQLTB-9KRCegmtg"
   });
   const accessToken = oauth2Client.getAccessToken()
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
              code:401,
              message:'User already registered'
            })

            else if(fields[1][0].Code=='102')
            res.json({
              status:false,
              code:402,
              message:'Email_id already registered'
            })

            else if(fields[1][0].Code=='103')
            res.json({
              status:false,
              code:403,
              message:'contact already registered'
            })

            else {
              var smtpTransport=nodemailer.createTransport({
                service:"Gmail",
                auth:{
                  clientId: "19478322100-ci86q8k7ra4b2p960l6s2ktgts9860rb.apps.googleusercontent.com",
                  clientSecret: "0ngstkira0AfvwBq1_aDfGfE",
                  refreshToken: "1//04vrMd0YzRvrVCgYIARAAGAQSNwF-L9IrjqWKvdgSq83vYaWiGgsETh34EwLx3LZjAzSG-OCWWmJh0R-RdazwQQLTB-9KRCegmtg",
                  accessToken: accessToken
                }
              });

            //  var rand=Math.floor((Math.random()*100)+54);
              var host=req.get('host');
              console.log(host);
             var link="https://app--notifyme.herokuapp.com/activate?id="+id;
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
                    code:404,
                    message:"Email Id provided is not correct"
                  })
                }
                else{
                  connection.query('insert into student_registration set ?',students,function(error,results,fields){
                  if(error)
                  {
                    res.json({
                      status:false,
                      code:501,
                      message:error.sqlMessage
                    })
                  }
                  else{
                  res.json({
                    status:true,
                    code:200,
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
