var connection=require('./config');

class deleteNotice{

static DeleteNoticeUser(req,res)
{
var  notice_id=req.body.notice_id;

    connection.query('delete from attachments where NoticeID=?;delete from images where NoticeID=?;delete from scope where NoticeID=?;delete from notices where Notice_id=?',[notice_id,notice_id,notice_id,notice_id],function(error,fields,results){
      if(error)
      {
        res.json({
          status:false,
          message:error.sqlMessage,
          code:401
        });
      }
      else {
        res.json({
          status:true,
          data:fields,
          message:'Notice deleted from Database',
          code:400
        });
      }
    });

}

}
module.exports=deleteNotice;
