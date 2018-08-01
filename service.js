const BFX = require('bitfinex-api-node');

const bfx = new BFX({
    apiKey: 'tErnGEZgfGPuSA1qZtJcpHL2v363iyLT7E7w4OJRWXa',
    apiSecret: 'zOsex8gFrDqEzKAWvjuzaFkCuq9IOPo5QRYzOu510NQ',
})

const bfxRest = bfx.rest(2);



var opts = {timeframe:"30m", symbol:"tIOTUSD", section:"hist"};

bfxRest.candles(opts, (err, res) => {
	if (err) console.log(err)
	console.log(res)
})
