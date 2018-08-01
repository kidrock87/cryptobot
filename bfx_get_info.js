var request = require('request');
var Decimal = require('decimal');
var body_common = '["tBTCUSD","tLTCUSD","tETHUSD","tETCUSD","tZECUSD","tXMRUSD","tDASHUSD","tXRPUSD","tIOTAUSD","tEOSUSD","tSANUSD","tOMGUSD","tBCHUSD","tNEOUSD","tETPUSD","tQTUMUSD","tAVTUSD"]';
var json = JSON.parse(body_common);
json.forEach(function(item, i, arr) {


        var pair = item;
        console.log(pair)
        request.get({url: 'https://api.bitfinex.com/v2/ticker/'+pair}, function(err,httpResponse,body){
                var ticker = JSON.parse(body);
                console.log(body)
                var url = 'http://localhost:3000/ticker/bitfinex/'+pair;
                console.log(url);
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
});
