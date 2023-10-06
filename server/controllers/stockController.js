const { UserSubscribedStocks } = require('../models');

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


module.exports = { subscibeToStock };