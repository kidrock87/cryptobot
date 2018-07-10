var Decimal = require('decimal');
const crypto = require('crypto');
var request = require('request');


module.exports = {
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

            if(max == a && mid == b && min == c){
              if(rnd_type == "original"){return 4; }else{return 0;}
            }
            else if(max == a && mid == b){
              if(rnd_type == "original"){return 3;}else{return 0;}
            }
            else if(max == c && mid == b && min == a){
              if(rnd_type == "original"){return 0;}else{return 4;}
            }
            else if(max == c && mid == b){
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
          return 4;
        }
        else if(a > 1 && b > 1){return 3}
        else if(a > 1){return 1}
        else{return 0;}
      },

      rnd_spread_scolar: function(a,b,c){
        a = parseFloat(a);
        b = parseFloat(b);
        c = parseFloat(c);

        if(a < 0 && b < 0 && c < 0){
          return 4;
        }
        else if(a < 0 && b < 0){return 3}
        else if(a < 0){return 1}
        else{return 0;}
      },


      bitfinex_buy: function(){

                const apiKey = "tErnGEZgfGPuSA1qZtJcpHL2v363iyLT7E7w4OJRWXa";
                const apiSecret = "zOsex8gFrDqEzKAWvjuzaFkCuq9IOPo5QRYzOu510NQ";
                const baseUrl = 'https://api.bitfinex.com'
                const url = '/v1/order/new'
                const nonce = (Date.now()*100000).toString()
                const completeURL = baseUrl + url
                const symbol = "ETCUSD";
                const amount = "0.1";
                const price = "11.400";
                const side = "buy";
                const type = "exchange limit";
                const ocoorder = true
                const buy_price_oco = "11.500"
                const sell_price_oco = "11.270"

                const body = {
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
                const payload = new Buffer(JSON.stringify(body))
                	.toString('base64')

                const signature = crypto
                  .createHmac('sha384', apiSecret)
                  .update(payload)
                  .digest('hex')

                const options = {
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
                    console.log('response:', JSON.stringify(body, 0, 2))
                  }
                )








        }

}
