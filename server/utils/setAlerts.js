const { CronJob } = require('cron')
const axios = require('axios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { UserSubscribedStocks, Users, UserNotificationToken } = require('../models');
const FCM = require('fcm-node');
const serverKey = process.env.FIREBASE_SERVER_KEY;
const fcm = new FCM(serverKey);

const threshold = 5;

async function fetchDataFromAlphaVantage(symbol) {
    const apiKey = 'your_alpha_vantage_api_key';
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data['Global Quote'];
        const price = parseFloat(data['05. price']);
        return price;
    } catch (error) {
        console.error(`Error fetching data for symbol ${symbol}: ${error.message}`);
        return null;
    }
}

async function getUserNotificationToken(userId) {
    try {
        const userToken = await UserNotificationToken.findOne({
            where: { UserId: userId },
        });
        return userToken ? userToken.notificationToken : null;
    } catch (error) {
        console.error('Error fetching user notification token:', error);
        return null;
    }
}

function sendFCMMessage(message, userId) {
    fcm.send(message, (err, response) => {
        if (err) {
            console.log(`Failed to send FCM message to user ${userId}:`, err);
            console.log(`Response:`, response);
        } else {
            console.log(`FCM message sent to user ${userId}. Response:`, response);
        }
    });
}


const setAlerts = () => {
    console.log("called");
    const cron = new CronJob('0 */3 * * *', async() => {


        try {
            const uniqueSymbols = await UserSubscribedStocks.findAll({
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('symbol')), 'symbol'],
                ],
            });

            for (const symbol of uniqueSymbols) {
                const currentPrice = await fetchDataFromAlphaVantage(symbol.symbol);

                if (currentPrice !== null) {
                    const subscriptions = await UserSubscribedStocks.findAll({
                        where: {
                            symbol: symbol.symbol,
                            targetPrice: {
                                [Op.between]: [currentPrice, currentPrice + threshold],
                            },
                        },
                        include: Users,
                    });

                    for (const subscription of subscriptions) {
                        const userId = subscription.User.id;
                        const userToken = await getUserNotificationToken(userId);

                        if (userToken) {
                            const message = {
                                to: userToken.notificationToken,
                                notification: {
                                    title: 'NotificationTestAPP',
                                    body: 'Message from Node.js app',
                                },
                                data: {
                                    title: 'Your custom data title',
                                    body: JSON.stringify({
                                        name: 'okg ooggle ogrlrl',
                                        product_id: '123',
                                        final_price: '0.00035',
                                    }),
                                },
                            };

                            sendFCMMessage(message, userId);
                        }
                    }
                }
            }


        } catch (error) {
            console.error('Error in cron job:', error);
        }
    });

    cron.start();
}

module.exports = {
    setAlerts
}