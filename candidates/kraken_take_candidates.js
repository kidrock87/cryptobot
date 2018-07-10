var Decimal = require('decimal');
var rnd = require('../services/rnd')
const Kraken = require('kraken-wrapper');
const kraken = new Kraken('MAUbHU5dlLWgs0YZeagedsAdOl2Zy6BTSUmc+a+Wh9aoZdyldTCvNKvU', 'piH+62ac6Om0oeB+YAcgryB+4ry6pLUJ+CZYN3QMhUzpgzM1oSpGSpkB0Wkb3VYE/6gf7g2zfXQj1cfpmiF3iw==');
var request = require('request');
module.exports = {
  take_candidates: function(){
  var params = ''
kraken.getTickerInformation({ pair: "ZECEUR" }).then((response) => {

  var ask_price = parseFloat(response.result["XZECZEUR"].a[0]);
  var take_profit = ask_price*0.01+ask_price*0.0026+ask_price;
  var stop_loss = ask_price - ask_price*0.01 - ask_price*0.0026;

  console.log(take_profit)
  console.log(stop_loss)
  //kraken.setAddOrder({"pair": "ZECEUR", "type" :"buy", "ordertype": "limit", 'price': ask_price,"volume": "0.03", 'close': {'ordertype':'stop-loss-profit', 'price': stop_loss, 'price2': take_profit}
  kraken.setAddOrder({"pair": "ZECEUR", "type" :"buy", "ordertype": "limit", 'price': ask_price,"volume": "0.03"}
  }).then((response) => {
      console.log(response);
  })

})

/*
    request.get({url:'http://localhost:3000/candidates/current/kraken'}, function(err,httpResponse,body){
          var json = JSON.parse(body);

          var xhour =  Math.floor(Date.now() / 1000) - 3600*2;

          console.log(xhour);
          var curr_candidates = [];
          for(var i = 0; i < json.length; i++) {
              if(parseInt(json[i].insert_date) > parseInt(xhour) && parseInt(json[i].total_points) > 10){
                console.log(json[i]);
                setAddOrder(params)
                //take_order
                //change status to in_game
              }else{
                //change status to out_of_game
                //console.log('fffffuuuu')
              }
          }



    })
*/
  }




}
