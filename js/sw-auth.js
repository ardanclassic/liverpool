
// Checking Service Working!
if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
} else {
    registerServiceWorker();
    requestPermission();
}


// Register service worker
function registerServiceWorker() {
    return navigator.serviceWorker.register('sw.js')
        .then(function (registration) {
            console.log('Service worker has been registered!');
            return registration;
        })
        .catch(function (err) {
            console.error('Failed registering service worker!', err);
        });
}

// Request Permission 
function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Notification has been disapproved!");
                return;
            } else if (result === "default") {
                console.error("User closed the confirmation!");
                return;
            } else {
                // console.log("Notification has been allowed!");
            }

            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BN06HVpP9YXq_LDaIP2Pzrehn0ZnOHH_WjutkHDSYW90OZK12A1XENyicGTQJhityrjkTsh22WRnS5V2LqLUtOQ")
                    }).then(function(subscribe) {
						// console.log("system notification is secure!");
                        // console.log('endpoint: ', subscribe.endpoint);
                        // console.log('p256dh key: ', 
                        //     btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
                        // console.log('auth key: ', 
                        //     btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function(e) {
                        console.error('Gagal melakukan subscribe ', e.message);
                    });
                });
            }
        });
    }
}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}