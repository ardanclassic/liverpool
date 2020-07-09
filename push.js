var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BN06HVpP9YXq_LDaIP2Pzrehn0ZnOHH_WjutkHDSYW90OZK12A1XENyicGTQJhityrjkTsh22WRnS5V2LqLUtOQ",
    "privateKey": "uHQSRCQh-wScsoRAsxbhkSDHZs4jnoZaBJx7uGbafUA"
};

webPush.setVapidDetails(
    'mailto:ardan.learn@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dKmyqlGE20o:APA91bEv5uyI2ECwF_X6lhYUs4sCOYvHhTmZ0jbyis9EZNRUPw0RtC8L4w71L9t3ULKrRhd2xC7HKrPzmMdv2sTvvzeaO9YprmNyGa25xscFiV5SBlwy7al5x1FvC0J3DHmCF6B61Sd4",
    "keys": {
        "p256dh": "BP6g1xi/P9u0acm+zoVYIFmPn/qeUOHOfhmuWd8BSHWwHNGsYYMtkIBIUNxeRd8vSTnKC/O6ewsXP+Rgs7Y6fzg=",
        "auth": "MKzO7yFzoZltrOzohKV/oA=="
    }
};

var payload = 'Alhamdulillah! My first notification from server!';

var options = {
    gcmAPIKey: '333696452969',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);