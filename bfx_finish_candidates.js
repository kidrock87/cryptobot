const rnd = require('./services/rnd')
const request = require('request')
const crypto = require('crypto')
var oco = require('./services/oco_setup')

const apiKey = "tErnGEZgfGPuSA1qZtJcpHL2v363iyLT7E7w4OJRWXa";
const apiSecret = "zOsex8gFrDqEzKAWvjuzaFkCuq9IOPo5QRYzOu510NQ";
const baseUrl = 'https://api.bitfinex.com'

request.get({url:'http://localhost:3000/candidates/status/get_it/bitfinex'}, function(err,httpResponse,body5){
    var json = JSON.parse(body5);


          const cd_id = json[0]._id;
          const bet = json[0].price;
          const order_oco_id  = json[0].order_oco_id;
          const order_sell_id  = json[0].order_sell_id;
          console.log(bet)

          if(order_oco_id){
            const url = '/v1/order/status'
            var nonce = (Date.now()*100000).toString()

            var completeURL = baseUrl + url
            var body = {
              request: url,
              order_id: parseFloat(order_sell_id),
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
                var is_live = json.is_live;
                var is_cancelled = json.is_cancelled;
                const new_price = json.price;
                console.log(json)
                if(is_live){
                  //еще жив
                  console.log('is_live_now')
                  process.exit(0);
                }else
                {
                    if(is_cancelled){
                      console.log('ic'+new_price)
                      console.log('going to oco order')
                      //переходим к осо
                      rnd.check_oco(order_oco_id, cd_id, bet);
                    }
                    else{
                      console.log('oc'+new_price)
                      oco.change_candidate_status(cd_id, new_price, bet)
                      //change candidate status
                    }

                }


            })
          }

})


















/*

{"id":4640726263,"cid":54429425717,"cid_date":"2017-10-26","gid":null,"symbol":"zecusd","exchange":"bitfinex",
"price":"225.62","avg_execution_price":"0.0","side":"sell","type":"exchange limit","timestamp":"1509030429.0",
"is_live":true,"is_cancelled":false,"is_hidden":false,"oco_order":"4640726266","was_forced":false,
"original_amount":"0.04","remaining_amount":"0.04","executed_amount":"0.0","src":"api"}







{"id":4640510026,"cid":53640660007,"cid_date":"2017-10-26","gid":null,"symbol":"zecusd","exchange":"bitfinex"
,"price":"223.1","avg_execution_price":"223.1","side":"sell","type":"exchange limit","timestamp":"1509029641.0",
"is_live":false,"is_cancelled":false,"is_hidden":false,"oco_order":null,
"was_forced":false,"original_amount":"0.04","remaining_amount":"0.0","executed_amount":"0.04","src":"api"}
*/


/*
{"id":4640510029,"cid":53640737990,"cid_date":"2017-10-26","gid":null,"symbol":"zecusd","exchange":null,
"price":"220.88","avg_execution_price":"0.0","side":"sell","type":"exchange stop","timestamp":"1509029641.0","is_live":false,
"is_cancelled":true,"is_hidden":false,"oco_order":null,"was_forced":false,"original_amount":"0.04","remaining_amount":"0.04",
"executed_amount":"0.0","src":"web"}
*/
