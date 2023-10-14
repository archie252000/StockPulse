importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');


firebase.initializeApp({
    apiKey: "AIzaSyBshhyzZX144zfSsQ9tEOZiVRz5QjhQM7Y",

    authDomain: "stockpulse-69d0b.firebaseapp.com",

    projectId: "stockpulse-69d0b",

    storageBucket: "stockpulse-69d0b.appspot.com",

    messagingSenderId: "183016835125",

    appId: "1:183016835125:web:a6a93041295397c7ee897c",

    measurementId: "G-BX1B0FMXJ6",
});

const messaging = firebase.messaging();