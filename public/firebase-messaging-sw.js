importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBrujYmQhvG9FP7Q0qMQ-3i30DCnGcBSZk",
  authDomain: "test-86ed1.firebaseapp.com",
  projectId: "test-86ed1",
  storageBucket: "test-86ed1.appspot.com",
  messagingSenderId: "384029116906",
  appId: "1:384029116906:web:355d0583452a88cd43ca93",
};

// Initialize the Firebase app in the service worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  return self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
