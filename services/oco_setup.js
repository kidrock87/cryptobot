var Decimal = require('decimal');
const crypto = require('crypto');
var request = require('request');
module.exports = {

oco_setup: function(pair,ask_price,deal_profit, cd_id, _amount, _order_buy_id){
        //расчет OCO
        return function(){
                var take_profit =  Math.round((((ask_price*deal_profit)*1 + ask_price*1))*1000)/1000;
                var stop_loss = Math.round((ask_price*1-ask_price*deal_profit)*1000)/1000;
                take_profit = take_profit.toString();
                stop_loss = stop_loss.toString();
                console.log("ask="+ask_price);
                console.log("tp="+take_profit);
                console.log("sl="+stop_loss);

                //Продажа с ОСО
                const apiKey = "tErnGEZgfGPuSA1qZtJcpHL2v363iyLT7E7w4OJRWXa";
                const apiSecret = "zOsex8gFrDqEzKAWvjuzaFkCuq9IOPo5QRYzOu510NQ";
                const baseUrl = 'https://api.bitfinex.com'
                var url = '/v1/order/new'
                var nonce = (Date.now()*100000).toString()
                var completeURL = baseUrl + url
                var symbol = pair;
                var amount = _amount;
                var price = take_profit;
                var side = "sell";
                var type = "exchange limit";
                var ocoorder = true
                var buy_price_oco = "11.500"
                var sell_price_oco = stop_loss

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

                    var jsn = JSON.parse(body);
                    var _order_oco_id = jsn.oco_order;
                    var _order_sell_id = jsn.id;
                    //change_status

                    request.post({url:'http://localhost:3000/check_candidate_status/'+cd_id, form: {status : 'get_it', order_buy_id: _order_buy_id, order_sell_id: _order_sell_id, order_oco_id: _order_oco_id, price: ask_price, status_result: 'live', bet_result: '0'}}, function(err,httpResponse,body){
                        console.log('end');
                        process.exit(1);
                    })
                  }
                )
        }
},

change_candidate_status: function(cd_id, new_price, bet)
  {
    console.log('bet='+bet)
    var bet_result = parseFloat(new_price)- parseFloat(bet);
    
    console.log('bet_result='+bet_result)
    var fff = Math.sign(bet_result);
    console.log('fff='+fff);
    if(fff > 0){
      var status = 'winner';
    }else{
      var status = 'failed';
    }
    //console.log(cd_id)
    request.post({url:'http://localhost:3000/check_candidate_status/'+cd_id, form: {status : "finished", bet_result: bet_result, status_result: status}}, function(err,httpResponse,body){
        console.log(body);
        process.exit(0);
    })
  }
}
