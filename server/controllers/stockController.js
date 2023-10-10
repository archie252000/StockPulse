const { UserSubscribedStocks } = require('../models');
const axios = require('axios');

// DB interaction utils
const subscibeStockToUser = async(symbol, targetPrice, UserId) => {
    return await UserSubscribedStocks.create({
        symbol,
        targetPrice,
        UserId
    });
}

const checkSubscribedStock = async(symbol, UserId) => {
    return await UserSubscribedStocks.findOne({
        where: {
            symbol,
            UserId
        }
    })
}

const getSubscribedStocks = async(UserId) => {
    return await UserSubscribedStocks.findAll({
        where: {
            UserId
        }
    })
}

// Controller to subscribe stock
const subscibeToStock = async(req, res) => {
    const { symbol, targetPrice } = req.body;

    try {

        const subscribedStock = await checkSubscribedStock(symbol, req.userId);
        if (subscribedStock) {
            return res.status(400).json({ message: "You have already subsribed to this stock" });
        }

        await subscibeStockToUser(symbol, targetPrice, req.userId);

        res.status(200).json({ message: "You have successfully subscribed to this stock!" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

// Controller to search stocks

const searchStocks = async(req, res) => {

    try {
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.query.keywords}&apikey=${process.env.ALPHAVNTAGE_KEY}`;
        const searchResults = await axios.get(url);
        res.status(200).json({ matches: searchResults.data.bestMatches });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }


}


// Controller to get subscribed stocks by the user
const subscribedStocks = async(req, res) => {
    try {
        const userSubscribedStocks = await getSubscribedStocks(req.userId);
        res.status(200).json({ subscribedStocks: userSubscribedStocks });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    subscibeToStock,
    searchStocks,
    subscribedStocks
};