var request = require('request');
function rnd_sort_ask(a,b,c) {
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

}

request.get({url:'http://localhost:3000/tickers/bitfinex/tBTCUSD'}, function(err,httpResponse,body1){
      pair_info = JSON.parse(body1);
      var ask = [];
      for(var i = 0; i < 3; i++) {
          var ask_el = pair_info[i].ask_price;
          ask.push(ask_el);
      }
      //console.log(ask);
})

var kkk = rnd_sort('5.0455','5.0433','5.004444');
console.log(kkk)
