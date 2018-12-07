
/*
var opts = {};
opts.timeframe= "1m";
opts.symbol= "tIOTUSD";
opts.section= "hist";

bfxRest.candles(opts, (err, res) => {
	if (err) console.log(err)
	console.log(res)
})
*/
const fs = require('fs');
const BFX = require('bitfinex-api-node')
const apiKey = "tErnGEZgfGPuSA1qZtJcpHL2v363iyLT7E7w4OJRWXa";
const apiSecretKey = "zOsex8gFrDqEzKAWvjuzaFkCuq9IOPo5QRYzOu510NQ";
const bfxRest = new BFX(apiKey, apiSecretKey, {version: 1}).rest
bfxRest.get_symbols((err, res) => {
	if (err) console.log(err)
	fs.writeFile("111.json", res, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
	});
})
