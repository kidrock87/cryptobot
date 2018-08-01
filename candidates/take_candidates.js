  'use strict'

var Decimal = require('decimal');
var rnd = require('../services/rnd')
var request = require('request');
const crypto = require('crypto')

const apiKey = "tErnGEZgfGPuSA1qZtJcpHL2v363iyLT7E7w4OJRWXa";
const apiSecret = "zOsex8gFrDqEzKAWvjuzaFkCuq9IOPo5QRYzOu510NQ";

module.exports = {
  take_candidates: function(){
      request.get({url:'http://localhost:3000/candidates/current/bitfinex'}, function(err,httpResponse,body){
            var json = JSON.parse(body);
            var xhour =  Math.floor(Date.now() / 1000) - 3600;


            var curr_candidates = [];
            if(json.length > 0){
              var cd_id = json[0]._id;
              var cd_pair = json[0].pair;
              cd_pair = cd_pair.substr(1);
              cd_pair = cd_pair.toLowerCase();
              

              console.log(cd_pair);
                request.get({url:'https://api.bitfinex.com/v1/symbols_details'}, function(err,httpResponse,body5){
                  var json5 = JSON.parse(body5);

                  for (var i = 0; i < json5.length; i++){
                    if (json5[i].pair == cd_pair){
                       // we found it
                      var _amount = json5[i].minimum_order_size;
///////////
                      const baseUrl = 'https://api.bitfinex.com'
                      const url = '/v1/orders'
                      var nonce = (Date.now()*100000).toString()


                      const completeURL = baseUrl + url
                      const body = {
                        request: url,
                        nonce
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

                          var json1 = JSON.parse(body);
                            if(json1.some(item => item.symbol === cd_pair)){
                              request.post({url:'http://localhost:3000/check_candidate_status/'+cd_id, form: {status : 'already_in'}}, function(err,httpResponse,body){
                                console.log('already_in')
                                  process.exit(1);

                              })
                            }
                            else{
                                console.log("rnd.bitfinex_buy")
                                rnd.bitfinex_buy(cd_pair, 0.005, cd_id, _amount);
                            }

                        }
                      )

                    }
                  }
                })
            }
            else{
                console.log('no_pairs')
                process.exit(1);
            }




      })

      //запросить цену.

      //выставить ОСО



  }






}
