var axios = require('axios');
const BFX = require('bitfinex-api-node')






var opts = {};
opts.timeframe= "1m";
opts.symbol= "tIOTUSD";
opts.section= "hist";

bfxRest.candles(opts, (err, res) => {
	if (err) console.log(err)
	console.log(res)
})


//go('tBTCUSD');

//таймфрейм  '1m', '5m', '15m', '30m', '1h', '3h', '6h', '12h', '1D', '7D', '14D', '1M'
//получить данные о свечке сейчас
//получить данные о свечке с разным таймфреймом
