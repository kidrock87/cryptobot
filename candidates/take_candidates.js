  'use strict'
var rnd = require('../services/rnd')
var Decimal = require('decimal');
var rnd = require('../services/rnd')
var request = require('request');

const BFX = require('bitfinex-api-node')
const apiKey = "tErnGEZgfGPuSA1qZtJcpHL2v363iyLT7E7w4OJRWXa";
const apiSecret = "zOsex8gFrDqEzKAWvjuzaFkCuq9IOPo5QRYzOu510NQ";
const opts = { version: 2, transform: false, autoOpen: false }
const bws = new BFX(api_key, api_key_secret, opts).ws
module.exports = {
  take_candidates: function(){
      /*request.get({url:'http://localhost:3000/candidates/current/bitfinex'}, function(err,httpResponse,body){
            var json = JSON.parse(body);
            var xhour =  Math.floor(Date.now() / 1000) - 3600*2;

            console.log(xhour);
            var curr_candidates = [];
            for(var i = 0; i < json.length; i++) {
                if(parseInt(json[i].insert_date) > parseInt(xhour) && parseInt(json[i].total_points) > 10){
                  console.log(json[i]);

                    rnd.bitfinex_buy();
                  //take_order
                  //change status to in_game
                }else{
                  //change status to out_of_game
                  //console.log('fffffuuuu')
                }
            }



      })
      */
      //запросить цену.
      //купить по маркету
      //выставить ОСО
      //rnd.bitfinex_buy();
      request.get("https://api.bitfinex.com/v1/pubticker/etcusd",
        function(error, response, body1) {
          var body1 = JSON.parse(body1);
          var ask_price = body1.ask
          console.log(ask_price);
      })

  }






}
