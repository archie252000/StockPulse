const { UserSubscribedStocks } = require('../models');
const axios = require('axios');
const config = require('config');

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

// Controller to search stocks

const searchStocks = async(req, res) => {

    try {
        // const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.query.keywords}&apikey=${config.get('alphavantageKey')}`;
        // const searchResults = await axios.get(url);
        const bestMatches = [{
                '1. symbol': 'T',
                '2. name': 'AT&T Inc',
                '3. type': 'Equity',
                '4. region': 'United States',
                '5. marketOpen': '09:30',
                '6. marketClose': '16:00',
                '7. timezone': 'UTC-04',
                '8. currency': 'USD',
                '9. matchScore': '1.0000'
            },
            {
                '1. symbol': 'T.TRT',
                '2. name': 'Telus Corp',
                '3. type': 'Equity',
                '4. region': 'Toronto',
                '5. marketOpen': '09:30',
                '6. marketClose': '16:00',
                '7. timezone': 'UTC-05',
                '8. currency': 'CAD',
                '9. matchScore': '0.4000'
            },
            {
                '1. symbol': 'T04.FRK',
                '2. name': 'TITOMIC LTD',
                '3. type': 'Equity',
                '4. region': 'Frankfurt',
                '5. marketOpen': '08:00',
                '6. marketClose': '20:00',
                '7. timezone': 'UTC+02',
                '8. currency': 'EUR',
                '9. matchScore': '0.3333'
            },
            {
                '1. symbol': 'T0A.FRK',
                '2. name': 'TRULIEVE CANNABIS',
                '3. type': 'Equity',
                '4. region': 'Frankfurt',
                '5. marketOpen': '08:00',
                '6. marketClose': '20:00',
                '7. timezone': 'UTC+02',
                '8. currency': 'EUR',
                '9. matchScore': '0.3333'
            },
            {
                '1. symbol': 'T0J.FRK',
                '2. name': 'MFE-MEDIAFOREU. A EO -06',
                '3. type': 'Equity',
                '4. region': 'Frankfurt',
                '5. marketOpen': '08:00',
                '6. marketClose': '20:00',
                '7. timezone': 'UTC+02',
                '8. currency': 'EUR',
                '9. matchScore': '0.3333'
            },
            {
                '1. symbol': 'T0P.FRK',
                '2. name': 'TAG Oil Ltd',
                '3. type': 'Equity',
                '4. region': 'Frankfurt',
                '5. marketOpen': '08:00',
                '6. marketClose': '20:00',
                '7. timezone': 'UTC+02',
                '8. currency': 'EUR',
                '9. matchScore': '0.3333'
            },
            {
                '1. symbol': 'T0T.FRK',
                '2. name': 'KEDA INDL GRP.C.LTD GDR A',
                '3. type': 'Equity',
                '4. region': 'Frankfurt',
                '5. marketOpen': '08:00',
                '6. marketClose': '20:00',
                '7. timezone': 'UTC+02',
                '8. currency': 'EUR',
                '9. matchScore': '0.3333'
            },
            {
                '1. symbol': 'T0J0.FRK',
                '2. name': 'MFE-MEDIAFOREU. B EO -60',
                '3. type': 'Equity',
                '4. region': 'Frankfurt',
                '5. marketOpen': '08:00',
                '6. marketClose': '20:00',
                '7. timezone': 'UTC+02',
                '8. currency': 'EUR',
                '9. matchScore': '0.2857'
            },
            {
                '1. symbol': 'T0U0.FRK',
                '2. name': 'TC BIOPHARM(HLD.)SP.ADS/1',
                '3. type': 'Equity',
                '4. region': 'Frankfurt',
                '5. marketOpen': '08:00',
                '6. marketClose': '20:00',
                '7. timezone': 'UTC+02',
                '8. currency': 'EUR',
                '9. matchScore': '0.2857'
            },
            {
                '1. symbol': 'T10G.LON',
                '2. name': 'UBS(Lux)Fund Solutions – Bloomberg TIPS 10+ UCITS ETF(hedged GBP)A-dis GBP',
                '3. type': 'ETF',
                '4. region': 'United Kingdom',
                '5. marketOpen': '08:00',
                '6. marketClose': '16:30',
                '7. timezone': 'UTC+01',
                '8. currency': 'GBP',
                '9. matchScore': '0.2857'
            }
        ]
        res.status(200).json({ matches: bestMatches });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }


}


module.exports = {
    subscibeToStock,
    searchStocks
};