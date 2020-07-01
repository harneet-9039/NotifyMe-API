var FCM = require('fcm-node');

class Notification{

      static sendNotification(res,array, title, body){
        var serverKey = 'AAAAnBO7K2M:APA91bFf8OCfd_MZ8NFqM0SEy5dchruavaL6Y2e7Txr3eym-dNVRMifXvmqjzW2k3l1LiDyFU3zGwov4UhpVjPzgXVU4DG7aUe2s2fmeSVWHHHPcuVqUg3H1atgGJQmPniY8KWXAvzgO'; // put your server key here
        var fcm = new FCM(serverKey);

        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            registration_ids: array, 
            collapse_key: '2',
            
            data: {  //you can send only notification or only data(or include both)
                title: title,
                body: body
            }
        };
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
                console.log(err);
                res.json({
                    status:true,
                    code: 200,
                    message: 'Notice Created Successfully'
                  });
            } else {
                res.json({
                    status:true,
                    code: 200,
                    message: 'Notice Created Successfully'
                  });
                console.log("Successfully sent with response: ", response);
            }
        });
    }
}
module.exports=Notification;
