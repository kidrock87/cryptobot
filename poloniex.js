const Poloniex = require('poloniex-api-node');
const request = require('request');
let poloniex = new Poloniex('WAZ9BB6F-8A7HNAC0-P122GQEP-T3MM5VWS', '62c7f33c7166327059b11e4b12966c894437e564120b52417cf3613906c3c358eaabd290f3bc897fd526eedf4166a187bb7eb91c62aa1b689e8de7c0608c4dc3');


poloniex.returnTicker().then((ticker) => {
console.log(ticker);


  Object.keys(ticker).forEach(function(key,index) {
      var altname = key;
      var ask_price = ticker[key].lowestAsk;
      var bid_price = ticker[key].highestBid;
      var volume24 = ticker[key].baseVolume;
      var trades24 = '-';
      var exchange = 'poloniex';
      var pair = key.replace('_', '');
      var insert_date = Date.now();
      request.post({url:'http://localhost:3000/tickers', form: {ask_price : ask_price, bid_price : bid_price, volume24 : volume24, trades24 : trades24, pair: pair,altname: altname, exchange: exchange, insert_date: insert_date }}, function(err,httpResponse,body){
            console.log(body)
      })
  })
}).catch((err) => {
  console.log(err.message);
});
