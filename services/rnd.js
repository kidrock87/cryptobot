var Decimal = require('decimal');
const crypto = require('crypto');
var request = require('request');
var oco = require('../services/oco_setup')

const apiKey = "tErnGEZgfGPuSA1qZtJcpHL2v363iyLT7E7w4OJRWXa";
const apiSecret = "zOsex8gFrDqEzKAWvjuzaFkCuq9IOPo5QRYzOu510NQ";
const baseUrl = 'https://api.bitfinex.com'


module.exports = {
  rnd_sort_ask: function(a,b,c) {
        a = parseFloat(a);
        b = parseFloat(b);
        c = parseFloat(c);
        if(a > b && b > c){
          return 5;
        }
        else if(a > b && b < c)
        {
          return 1;
        }
        else {
          return 0;
        }

    },

    rnd_sort_reverse: function(a,b,c) {
          a = parseFloat(a);
          b = parseFloat(b);
          c = parseFloat(c);
          if(a < b && b < c){
            return 5;
          }
          else if(a < b && b > c)
          {
            return 1;
          }
          else {
            return 0;
          }

      },
    rnd_sort: function(a,b,c,rnd_type){
            a = parseFloat(a);
            b = parseFloat(b);
            c = parseFloat(c);

            var max = Math.max(a, b, c);
            var min = Math.min(a, b, c);

            var mid_a = Decimal(a).add(b).add(c).toNumber();
            var mid_b = Decimal(max).add(min).toNumber();
            var mid = Decimal(mid_a).sub(mid_b).toNumber();

            //mid = Math.round(mid * 10000)/10000;
            //max = Math.round(max * 10000)/10000;
            //min = Math.round(min * 10000)/10000;

            //console.log(mid);console.log(b);

            if(a > b > c){
              if(rnd_type == "original"){return 5; }else{return 0;}
            }
            else if(a > c && b > c){
              if(rnd_type == "original"){return 1;}else{return 0;}
            }
            else if(a < b < c){
              if(rnd_type == "original"){return 0;}else{return 4;}
            }
            else if(b > a && c > a){
              if(rnd_type == "original"){ return 0;}else{return 3;}
            }
            else{return 0; }
      },

      dynamic_view: function(a,b,c) {
        a = parseFloat(a);
        b = parseFloat(b);
        c = parseFloat(c);
        var temp1;
        var temp2;

        if(a > 1 && b > 1 && c >1){
          //Процент роста роста
          //var aaa = Decimal(a).add(b).toNumber();
          //var ask_temp =  Decimal(aaa).div(b).toNumber();

          return 4;
        }else if(a > 1 && b > 1){
          return 3;
        }else{return 0}

      },

      rnd_scolar: function(a,b,c){
        a = parseFloat(a);
        b = parseFloat(b);
        c = parseFloat(c);

        if(a > 1 && b > 1 && c > 1){
          return 5;
        }
        else if(a > 1 && b > 1 && c < 1){return 2}
        else if(a > 1){return 1}
        else{return 0;}
      },

      rnd_spread_scolar: function(a,b,c){
        a = parseFloat(a);
        b = parseFloat(b);
        c = parseFloat(c);

        if(a < 0 && b < 0 && c < 0){
          return 5;
        }
        else if(a < 0 && b < 0 && c > 0){return 2}
        else if(a < 0){return 1}
        else{return 0;}
      },



      bitfinex_buy: function(pair, deal_profit, cd_id, _amount){

                    //купить по маркету
                    _amount1 = parseFloat(_amount);
                    _amount1 = _amount1 + (_amount1)*0.003
                    _amount1 = _amount1.toString()

                    var url = '/v1/order/new'
                    var nonce = (Date.now()*100000).toString()
                    var completeURL = baseUrl + url
                    var symbol = pair;
                    var amount = _amount1;
                    var price = "11.400";
                    var side = "buy";
                    var type = "exchange market";
                    var ocoorder = false
                    var buy_price_oco = "11.500"
                    var sell_price_oco = "11.270"

                    var body = {
                      request: url,
                      nonce,
                      symbol,
                      amount,
                      price,
                      side,
                      type,
                      ocoorder,
                      buy_price_oco,
                      sell_price_oco
                    }
                    var payload = new Buffer(JSON.stringify(body))
                    	.toString('base64')

                    var signature = crypto
                      .createHmac('sha384', apiSecret)
                      .update(payload)
                      .digest('hex')

                    var options = {
                      url: completeURL,
                      headers: {
                        'X-BFX-APIKEY': apiKey,
                        'X-BFX-PAYLOAD': payload,
                        'X-BFX-SIGNATURE': signature
                      },
                      body: JSON.stringify(body)
                    }

                   return request.post(
                      options,
                      function(error, response, body) {
                            var json = JSON.parse(body);
                            //console.log(body);
                            var ask_price = json.price;
                            var _order_buy_id = json.id
                            console.log('ask_price='+ask_price)
                            if(ask_price){
                                setTimeout(oco.oco_setup(pair,ask_price,deal_profit,cd_id, _amount, _order_buy_id), 30000);
                            }else{
                              console.log('buy error');
                              process.exit(0);
                            }

                      }
                    )
        },
        check_oco: function(order_oco_id, cd_id, bet){
                const url = '/v1/order/status'
                var nonce = (Date.now()*100000).toString()

                var completeURL = baseUrl + url
                var body = {
                  request: url,
                  order_id: parseFloat(order_oco_id),
                  nonce
                }
                var payload = new Buffer(JSON.stringify(body))
                  .toString('base64')

                var signature = crypto
                  .createHmac('sha384', apiSecret)
                  .update(payload)
                  .digest('hex')

                var options = {
                  url: completeURL,
                  headers: {
                    'X-BFX-APIKEY': apiKey,
                    'X-BFX-PAYLOAD': payload,
                    'X-BFX-SIGNATURE': signature
                  },
                  body: JSON.stringify(body)
                }



                return request.post(
                  options,
                  function(error, response, body) {
                    var json = JSON.parse(body);

                    var _new_price = json.price;
                      console.log('new_p='+_new_price)
                    oco.change_candidate_status(cd_id, _new_price, bet)
                    //change candidate status;
                })

        }


}
