var request = require('request');
var Decimal = require('decimal');
const Kraken = require('kraken-wrapper');
const kraken = new Kraken('MAUbHU5dlLWgs0YZeagedsAdOl2Zy6BTSUmc+a+Wh9aoZdyldTCvNKvU', 'piH+62ac6Om0oeB+YAcgryB+4ry6pLUJ+CZYN3QMhUzpgzM1oSpGSpkB0Wkb3VYE/6gf7g2zfXQj1cfpmiF3iw==');

module.exports = {
  
      Kraken_get_info_from_exchange: function(){
        kraken.getTradableAssetPairs({pair: 'all' }).then((response) => {
          key_arr = [];

              //console.log(response.result.USDTZUSD)
              Object.keys(response.result).forEach(function(key,index) {
                    // key: the name of the object key
                    // index: the ordinal position of the key within the object
                    const altname = response.result[key].altname;



                    //var altname = 'ETHUSD'
                    //console.log(altname)
                  kraken.getTickerInformation({ pair: altname }).then((response) => {

                    Object.keys(response.result).forEach(function(key,index) {

                      var url = 'http://localhost:3000/ticker/kraken/'+altname;

                      request.get({url: url}, function(err,httpResponse,body2){
                          var last_json = JSON.parse(body2);
                          console.log(last_json.length);



                          var ask_price = response.result[key].a[0];
                          var bid_price = response.result[key].b[0];
                          var volume24 = response.result[key].v[1];
                          var trades24 = response.result[key].t[1];
                          var pair = altname;
                          var spread = Decimal(ask_price).sub(bid_price).toNumber();
                          var exchange = 'kraken';
                          var insert_date = Math.floor(Date.now() / 1000);


                          if(last_json.length > 0){

                            var last_ask = last_json[0].ask_price;
                            last_ask = parseFloat(last_ask);
                            ask_price = parseFloat(ask_price);
                            var last_spread = last_json[0].spread;
                            var last_volume = last_json[0].volume24;
                            last_volume = parseFloat(last_volume);
                            volume24 = parseFloat(volume24);
                            var ask_rat = Decimal(ask_price).div(last_ask).toNumber();
                            ask_rat = Math.round(ask_rat * 100000) / 100000
                            var lll = Decimal(spread).add(last_spread).toNumber();
                            var spread_rat = Decimal(lll).div(last_spread).toNumber();
                            var spread_rat = spread_rat * 100;
                            spread_rat = Math.round(spread_rat * 100000) / 100000

                            var ask_mod = Math.abs(last_ask - ask_price);
                            var volume_mod = Math.abs(volume24 - last_volume)
                            ask_mod = Math.round(ask_mod * 100000) / 100000
                            volume_mod = Math.round(volume_mod * 100000) / 100000
                          }
                          else{
                            var last_ask = '1';
                            var last_spread = '1';
                            var ask_rat = '1';
                            var spread_rat = '1';
                            var last_volume = '1';
                            var ask_mod = '0'
                            var volume_mod = '0'
                          }





                          //console.log(altname+': '+spread+' ap: '+ask_price+'bp: '+bid_price);
                          request.post({url:'http://localhost:3000/tickers', form: {ask_price : ask_price,ask_mod: ask_mod,volume_mod: volume_mod, ask_rat: ask_rat, bid_price : bid_price, spread_rat : spread_rat, spread : spread, volume24 : volume24, trades24 : trades24, pair: pair,altname: altname, exchange: exchange, insert_date: insert_date }}, function(err,httpResponse,body){
                              console.log(altname+': ask= '+ask_price+' last_ask= '+last_ask)
                              //console.log(Decimal(last_ask).sub(ask_price).toNumber())
                              //console.log(Math.abs(Decimal(last_ask).sub(ask_price).toNumber()))
                              console.log(ask_mod);
                              console.log(volume_mod);
                              console.log('<br><br><br>')
                          })
                      })








                    })

                    }).catch((error) => {
                      console.log(error);
                  });

                });
            }).catch((error) => {
              console.log(error);
        });

      }
}
