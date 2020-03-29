var FCM = require('fcm-node');

class Notification{

      static sendNotification(){
        var serverKey = 'AAAAnBO7K2M:APA91bFf8OCfd_MZ8NFqM0SEy5dchruavaL6Y2e7Txr3eym-dNVRMifXvmqjzW2k3l1LiDyFU3zGwov4UhpVjPzgXVU4DG7aUe2s2fmeSVWHHHPcuVqUg3H1atgGJQmPniY8KWXAvzgO'; // put your server key here
        var fcm = new FCM(serverKey);
     
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: 'ff3rro6fOgo:APA91bF0enFYGBijqVI7Bl-Awb1SB3XTWbt83WcCkmCYVeSgvzBDkBlNerRax-BdaV5qFxQeDgD_orzIPI8nqL5Jhz0FnVr41mv8y_03LYCKR4rq0O4fmY-n_vfhHs6SgiFKMG4K1hEw', 
            collapse_key: '2',
            
            notification: {
                title: 'Somebody added a notice', 
                body: 'click to view this notice' 
            }
        };
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
                console.log(err);
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }
}
module.exports=Notification;
   