var connection=require('./config');

class course{

static courseUser(dept_id,res)
{
  connection.query('SELECT Course_id,Course_branch from courses where Dept_id=?',[dept_id],function(error,fields,results){
    if(error)
    {
      console.log('error');
      res.json({
        status:false,
        code:401
      });
    }
    else{
      res.json({
        status:true,
        data:fields,
        message:'courses retrieved'
      });
    }
  });
}


}
module.exports=course;
