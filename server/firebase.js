const { initializeApp } = require('firebase/app');
const { getAnalytics } = require('firebase/analytics');
const config = require('config');

const firebaseConfig = config.get('firebaseConfig');

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);