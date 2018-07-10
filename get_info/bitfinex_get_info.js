var Decimal = require('decimal');
const BFX = require('bitfinex-api-node')
var request = require('request');
api_key = "tErnGEZgfGPuSA1qZtJcpHL2v363iyLT7E7w4OJRWXa";
api_key_secret = "zOsex8gFrDqEzKAWvjuzaFkCuq9IOPo5QRYzOu510NQ";
const opts = { version: 2 }
const bws = new BFX(api_key, api_key_secret, opts).ws


module.exports = {
bitfinex_get_info_from_exchange: function(){

        bws.on('open', () => {
          //bws.subscribeTrades('BTCUSD')
          //bws.subscribeOrderBook('BTCUSD')
          bws.subscribeTicker('BTCUSD')
          bws.subscribeTicker('LTCUSD')
          bws.subscribeTicker('ETHUSD')
          bws.subscribeTicker('ETCUSD')
          bws.subscribeTicker('ZECUSD')
          bws.subscribeTicker('XMRUSD')
          bws.subscribeTicker('DASHUSD')
          bws.subscribeTicker('XRPUSD')
          bws.subscribeTicker('IOTAUSD')
          bws.subscribeTicker('EOSUSD')
          bws.subscribeTicker('SANUSD')
          bws.subscribeTicker('AVTUSD')
          bws.subscribeTicker('OMGUSD')
          bws.subscribeTicker('BCHUSD')
          bws.subscribeTicker('NEOUSD')
          bws.subscribeTicker('ETPUSD')
          bws.subscribeTicker('QTUMUSD')
        })

        /*
          BID,
          BID_SIZE,
          ASK,
          ASK_SIZE,
          DAILY_CHANGE,
          DAILY_CHANGE_PERC,
          LAST_PRICE,
          VOLUME,
          HIGH,
          LOW
        */

        bws.on('trade', (pair, trade) => {
          console.log('Trade:', trade)
        })

        bws.on('orderbook', (pair, book) => {
          console.log('Order book:', book)
        })

        bws.on('ticker', (pair, ticker) => {
                    //console.log(pair+': ', ticker[4])
                    var url = 'http://localhost:3000/ticker/bitfinex/'+pair;
                    request.get({url: url}, function(err,httpResponse,body2){
                        var last_json = JSON.parse(body2);
                        var ask_price = ticker[2];
                        var bid_price = ticker[0];
                        var volume = ticker[7];
                        var dc = ticker[6];
                        var spread = Decimal(ask_price).sub(bid_price).toNumber();
                        var exchange = 'bitfinex';
                        var insert_date = Math.floor(Date.now() / 1000);

                        if(last_json.length > 0){
                          var last_ask = last_json[0].ask_price;
                          last_ask = parseFloat(last_ask);
                          ask_price = parseFloat(ask_price);
                          var last_spread = last_json[0].spread;
                          var last_volume = last_json[0].volume;
                          last_volume = parseFloat(last_volume);
                          volume = parseFloat(volume);
                          var ask_rat = Decimal(ask_price).div(last_ask).toNumber();
                          ask_rat = Math.round(ask_rat * 100000) / 100000
                          var lll = Decimal(spread).add(last_spread).toNumber();
                          var spread_rat = Decimal(lll).div(last_spread).toNumber();
                          var spread_rat = spread_rat * 100;
                          spread_rat = Math.round(spread_rat * 100000) / 100000
                          var ask_mod = Math.abs(last_ask - ask_price);
                          var volume_mod = Math.abs(volume - last_volume)
                          ask_mod = Math.round(ask_mod * 100000) / 100000
                          volume_mod = Math.round(volume_mod * 100000) / 100000
                        }else{
                          var last_ask = '1';
                          var last_spread = '1';
                          var ask_rat = '1';
                          var spread_rat = '1';
                          var last_volume = '1';
                          var ask_mod = '0'
                          var volume_mod = '0'
                        }
                        request.post({url:'http://localhost:3000/tickers', form: {ask_price : ask_price,ask_mod: ask_mod,volume_mod: volume_mod, ask_rat: ask_rat, bid_price : bid_price, spread_rat : spread_rat, spread : spread, volume : volume, trades24 : "-", pair: pair,altname: pair, exchange: exchange, insert_date: insert_date }}, function(err,httpResponse,body){
                            console.log(pair+': ask= '+ask_price+' last_ask= '+last_ask)
                            //console.log(Decimal(last_ask).sub(ask_price).toNumber())
                            //console.log(Math.abs(Decimal(last_ask).sub(ask_price).toNumber()))
                            console.log(body)
                        })



                    })
                  })

                  bws.on('subscribed', (data) => {
                    console.log('New subscription', data)
                  })

                  bws.on('error', console.error)
          }
}
