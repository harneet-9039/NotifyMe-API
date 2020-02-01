var connection=require('./config');

class department{

static departmentUser(res)
{
  connection.query('SELECT Dept_id,Dept_name from department',function(error,fields,results){
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
        message:'departments retrieved'
      });
    }
  });
}


}
module.exports=department;
