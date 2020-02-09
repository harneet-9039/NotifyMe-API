var connection=require('./config');
var fs = require('fs');
var uuid = require('uuid/v1');
var uploadAttachment;
var uploadBanner;
class createNotice{


static InsertScope(req,res, ID){
    var scope={
        "NoticeID":ID,
        "scope":req.body.scope,
        "Dept_id":req.body.depID==undefined?null:req.body.depID,
        "Course_id":req.body.CourseID==undefined?null:req.body.CourseID,
        "Year":req.body.year==undefined?null:req.body.year
    }

    connection.query('insert into scope set ?',scope,(error,results,fields)=>{
        if(error)
        {
          res.json({
            status:false,
            message:error.sqlMessage
          })
          return;
        }
        else{
            res.json({
                status:true,
                code: 200,
                message: 'Notice Created Successfully'
              });
        }
    });
}
static createNotice(req,res)
{
    const ID = uuid();

    var notice = {
        "Notice_id":ID,
        "S_sender_id":req.body.studentID==undefined?null:req.body.studentID,
        "F_sender_id":req.body.facultyID==undefined?null:req.body.facultyID,
        "validity":req.body.validPeriod,
        "priority":req.body.priority,
        "title":req.body.title,
        "description":req.body.desc,
        "date_time":req.body.timestamp
    };

    
    connection.query('insert into notices set ?',notice,function(error,results,fields){
        if(error)
        {
          res.json({
            status:false,
            message:error.sqlMessage
          })
          return;
        }
        else{
                try{
                    
                    if(!req.files)
                    {
                        createNotice.InsertScope(req,res,ID);
                    }

                    if(!req.files.attachment && !req.files.banner)
                    {
                        createNotice.InsertScope(req,res,ID);
                          
                    }
                    
                    if(req.files.attachment){
                    var AttachmentOBJ = null;
                    var BannerOBJ = null;
                    var i=0;
                    if(req.files.attachment.length>1){
                        
                    req.files.attachment.forEach(element => {
                        
                        var ImageID = uuid();
                        var name = ImageID+'-'+element.name;
                        fs.writeFile('./uploads/Attachments/'+name,element.data,(error)=>{
                            if(error)
                            {
                                res.json({
                                    status:false,
                                    code: 500,
                                    message: 'Server-side error'
                                  })    
                            }
                            else{
                                AttachmentOBJ = {
                                    "NoticeID":ID,
                                    "Att_name": name,
                                    "File_path": './uploads/Attachments/'+name
                                };
                                connection.query('insert into attachments set ?',AttachmentOBJ,
                                (error,results,fields)=>{
                                    if(error)
                                    {
                                      res.json({
                                        status:false,
                                        message: 'SQL error'
                                      })
                                      
                                    }
                                   
                                });
                            }
                        });
                       
                    });
                }
                else{
                    
                    var ImageID = uuid();
                    var name = ImageID+'-'+req.files.attachment.name;
                    fs.writeFile('./uploads/Attachments/'+name,req.files.attachment.data,(error)=>{
                        if(error)
                        {
                            res.json({
                                status:false,
                                code: 500,
                                message: 'Server-side error'
                              })
                              
                        }
                        else{
                            
                            AttachmentOBJ = {
                                "NoticeID":ID,
                                "Att_name": name,
                                "File_path": './uploads/Attachments/'+name
                            };
                            connection.query('insert into attachments set ?',AttachmentOBJ,
                            (error,results,fields)=>{
                                if(error)
                                {
                                  res.json({
                                    status:false,
                                    code:500,
                                    message: 'error in SQL'
                                  })
                                  
                                }
                                
                            });
                        }
                    });
                
                }
            }
                
                    if(req.files.banner){
                    var ImageID = uuid();
                    var name = ImageID+'-'+req.files.banner.name;
                    fs.writeFile('./uploads/Banner/'+name,req.files.banner.data,(error)=>{
                        if(error)
                        {
                            
                            res.json({
                                status:false,
                                code: 500,
                                message: 'Server-side error'
                              })
                              
                        }
                        else{
                            BannerOBJ = {
                                "NoticeID":ID,
                                "Img_name": name,
                                "Image_path": './uploads/Banner/'+name
                            };
                            connection.query('insert into images set ?',BannerOBJ,
                            (error,results,fields)=>{
                                if(error)
                                {
                                    res.json({
                                        status:false,
                                        code: 500,
                                        message: 'SQL error'
                                      })
                                }
                                else{
                                    createNotice.InsertScope(req,res,ID);
                                }
                            });
                        }
                    });
                    }
                    else{
                        createNotice.InsertScope(req,res,ID);
                        
                    }  
                }catch(error){
                    console.log(error);
                }
      }

    });
}

}
module.exports=createNotice;
