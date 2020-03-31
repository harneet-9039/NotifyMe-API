var FCM = require('fcm-node');

class Notification{

      static sendNotification(res,req,array){
        var serverKey = 'AAAAnBO7K2M:APA91bFf8OCfd_MZ8NFqM0SEy5dchruavaL6Y2e7Txr3eym-dNVRMifXvmqjzW2k3l1LiDyFU3zGwov4UhpVjPzgXVU4DG7aUe2s2fmeSVWHHHPcuVqUg3H1atgGJQmPniY8KWXAvzgO'; // put your server key here
        var fcm = new FCM(serverKey);

        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            registration_ids: ['dKOmM79dqtY:APA91bF9J7GHEgUcPn4UICTLpS70jY43Sif9UsUzRJwpvbDB2HmcmywJDRYDJzaGSJHjMXZlzmH6NVOmt41thaw42UdOJ5CiIhczp7A0fBQkFAUH_leQKNCI14oQ4anUvCdAZNCLnBar'],
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
              res.json();
                console.log("Successfully sent with response: ", response);
            }
        });
    }
}
module.exports=Notification;
