importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    messagingSenderId: "685690946929",
    apiKey: "AIzaSyBokU94jWQYcu15G4aKQgMm04aREOxhiFQ",
    projectId: "k7-webpush",
    appId: "1:685690946929:web:863cc2e36285a7cf2922d0",
});


var firebaseConfig = {
    apiKey: "AIzaSyBokU94jWQYcu15G4aKQgMm04aREOxhiFQ",
    authDomain: "k7-webpush.firebaseapp.com",
    databaseURL: "https://k7-webpush.firebaseio.com",
    projectId: "k7-webpush",
    storageBucket: "k7-webpush.appspot.com",
    messagingSenderId: "685690946929",
    appId: "1:685690946929:web:863cc2e36285a7cf2922d0",
    measurementId: "G-4D5ZTDE5HJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging
   .requestPermission()
   .then(function () {
     MsgElem.innerHTML = "Notification permission granted." 
     console.log("Notification permission granted.");
   })
   .catch(function (err) {
   ErrElem.innerHTML = ErrElem.innerHTML + "; " + err
   console.log("Unable to get permission to notify.", err);
 });

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});