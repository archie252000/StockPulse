const express = require('express');
const cron = require('node-cron');
const axios = require('axios');
const config = require('config');
const { UserSubscribedModels } = require('../models')



const generateUrl = (symbol) => {
    return `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${config.get('alphavantageKey')}`;
}

const setAlerts = () => {
    cron.schedule('*/5 * * * *', async() => {
        try {


            const response = await axios.get(generateUrl);

            // Process the response data as needed
            console.log('HTTP GET response:', response.data);
        } catch (error) {
            // Handle errors
            console.error('Error making HTTP request:', error.message);
        }
    });
}

module.exports = { setAlerts };