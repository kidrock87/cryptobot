var Decimal = require('decimal');
var rnd = require('../services/rnd')
var request = require('request');
module.exports = {
   get_candidates: function(body_common,exchange){
      //  request.get({url:'http://localhost:3000/exchange/kraken'}, function(err,httpResponse,body){
              var body = body_common;//kraken '["XBTEUR","LTCEUR","ETCEUR","BCHEUR","DASHEUR","ETHEUR","XMREUR","ZECEUR","XRPEUR","REPEUR"]';
              var json = JSON.parse(body);
              //console.log(json);
              for(var i = 0; i <json.length; i++) {
                  var pair = json[i];

                  request.get({url:'http://localhost:3000/tickers/'+exchange+'/'+pair}, function(err,httpResponse,body1){
                      pair_info = JSON.parse(body1);

                      var ask = [];
                      var ask_rat_arr = [];
                      var spread_rat_arr = [];
                      var volume = [];
                      var spread = [];
                      var ask_mod_arr = [];
                      var volume_mod_arr = [];
                      var pair = '';
                      var exchange='';
                      for(var i = 0; i < pair_info.length; i++) {
                          var ask_el = pair_info[i].ask_price;
                          ask.push(ask_el);

                          var volume_el = pair_info[i].volume24;
                          volume.push(volume_el);

                          var spred_el = pair_info[i].spread;
                          spread.push(spred_el);

                          var ask_rat_el = pair_info[i].ask_rat;
                          ask_rat_arr.push(ask_rat_el);

                          var spread_rat_el = pair_info[i].spread_rat;
                          spread_rat_arr.push(spread_rat_el);

                          var ask_mod_el = pair_info[i].ask_mod;
                          ask_mod_arr.push(ask_mod_el);

                          var volume_mod_el = pair_info[i].volume_mod;
                          volume_mod_arr.push(volume_mod_el);

                          pair = pair_info[i].altname;
                          exchange = pair_info[i].exchange;
                      }

                      var insert_date = Math.floor(Date.now() / 1000);
                      var ask_result1 = rnd.rnd_sort_ask(ask[0],ask[1],ask[2]);
                      var ask_result ='["'+ask_result1+'" ,"'+ask[0]+'","'+ask[1]+'","'+ask[2]+'"]';

                      var ask_dynamic1 = rnd.rnd_sort_ask(ask_rat_arr[0],ask_rat_arr[1],ask_rat_arr[2]);
                      var ask_dynamic ='["'+ask_dynamic1+'" ,"'+ask_rat_arr[0]+'","'+ask_rat_arr[1]+'","'+ask_rat_arr[2]+'"]';

                      var ask_scolar1 = rnd.rnd_scolar(ask_rat_arr[0],ask_rat_arr[1],ask_rat_arr[2]);
                      var ask_scolar ='["'+ask_scolar1+'" ,"'+ask_rat_arr[0]+'","'+ask_rat_arr[1]+'","'+ask_rat_arr[2]+'"]';

                      var spread_dynamic1 = rnd.rnd_sort_reverse(spread_rat_arr[0],spread_rat_arr[1],spread_rat_arr[2]);
                      var spread_dynamic ='["'+spread_dynamic1+'" ,"'+spread_rat_arr[0]+'","'+spread_rat_arr[1]+'","'+spread_rat_arr[2]+'"]';

                      var spread_result1  = rnd.rnd_sort_reverse(spread[0],spread[1],spread[2]);
                      var spread_result ='["'+spread_result1+'" ,"'+spread[0]+'","'+spread[1]+'","'+spread[2]+'"]';

                      var spread_scolar1 = rnd.rnd_spread_scolar(spread_rat_arr[0],spread_rat_arr[1],spread_rat_arr[2]);
                      var spread_scolar ='["'+spread_scolar1+'" ,"'+spread_rat_arr[0]+'","'+spread_rat_arr[1]+'","'+spread_rat_arr[2]+'"]';

                      var ask_mod = ask_mod_arr[0]+ask_mod_arr[1]+ask_mod_arr[2];
                      var volume_mod = volume_mod_arr[0]+volume_mod_arr[1]+volume_mod_arr[2];
                      var total_points = ask_result1 + ask_dynamic1+ask_scolar1+spread_dynamic1+spread_result1+spread_scolar1;
                      total_points = parseFloat(total_points);


                      request.post({url:'http://localhost:3000/candidates', form: {ask_result : ask_result, ask_dynamic: ask_dynamic,ask_scolar: ask_scolar, spread_dynamic: spread_dynamic, spread_result : spread_result, spread_scolar : spread_scolar, total_points : total_points, pair: pair,exchange: exchange, insert_date: insert_date, status: 'candidate' }}, function(err,httpResponse,body){
                          console.log(body)
                          setTimeout(function() {
                            process.exit(0);
                          }, 5000);

                      })

                    //  console.log(pair)
                    //  console.log('ask_result: '+spread_rat_arr+' ask_dynamic');
                    //  console.log(spread_dyamic);
                  })

              }
      //  })
    }
}
