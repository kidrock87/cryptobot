const BFX = require('bitfinex-api-node')
const bfxRest = new BFX('1234', '4321', {version: 2}).rest

var opts = {};
opts.timeframe= "1m";
opts.symbol= "tIOTUSD";
opts.section= "hist";

bfxRest.candles(opts, (err, res) => {
	if (err) console.log(err)
	console.log(res)
})
