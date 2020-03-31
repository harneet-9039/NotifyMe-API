var FCM = require('fcm-node');

class Notification{

      static sendNotification(res,req,array){
        var serverKey = 'AAAAnBO7K2M:APA91bFf8OCfd_MZ8NFqM0SEy5dchruavaL6Y2e7Txr3eym-dNVRMifXvmqjzW2k3l1LiDyFU3zGwov4UhpVjPzgXVU4DG7aUe2s2fmeSVWHHHPcuVqUg3H1atgGJQmPniY8KWXAvzgO'; // put your server key here
        var fcm = new FCM(serverKey);

        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            registration_ids: ['ekbQHSpi3Ks:APA91bG3n7RKxRgX28CqkxnrKtuLsyGTgWqkYnUQ7CwIQYzcgowT6dGrQXCzi0i5jG5Jki49h4Q76u0ou1Z13jjBWDnnhnimNXuKL0h8DbnTb7cuCPIYRNJsPwWgVtY0u4ZpqAbLIG6u','ekbQHSpi3Ks:APA91bG3n7RKxRgX28CqkxnrKtuLsyGTgWqkYnUQ7CwIQYzcgowT6dGrQXCzi0i5jG5Jki49h4Q76u0ou1Z13jjBWDnnhnimNXuKL0h8DbnTb7cuCu4ZpqAbLIG6u'], 
            collapse_key: '2',
            
            data: {  //you can send only notification or only data(or include both)
                title: 'my notification',
                body: 'my another value'
            }
        };
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
                console.log(err);
            } else {
              res.json();
                console.log("Successfully sent with response: ", response);
            }
        });
    }
}
module.exports=Notification;
