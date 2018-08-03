  'use strict'
const BFX = require('bitfinex-api-node')
var axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');



const apiKey = "tErnGEZgfGPuSA1qZtJcpHL2v363iyLT7E7w4OJRWXa";
const apiSecret = "zOsex8gFrDqEzKAWvjuzaFkCuq9IOPo5QRYzOu510NQ";

const opts1 = { version: 2 };
const bfxRest = new BFX(apiKey, apiSecret, opts1).rest;

const token = '568981743:AAH5juMeVw9-8kjuApL7iRpNtzv0qEs_lgU';
const bot = new TelegramBot(token, {polling: true});

function getCoffee() {
  return new Promise(resolve => {
    setTimeout(() => resolve('☕'), 5000); // it takes 2 seconds to make coffee
  });
}

module.exports.take_volume = async function(pair) {
  try {
    // but first, coffee
    //const coffee = await getCoffee();
    //console.log(coffee); // ☕
    // then we grab some data over an Ajax request

    var t_frames = ['1h', '3h', '6h', '12h'];
    for (let tf of t_frames) {
            var opts = {};
            opts.timeframe= tf;
            opts.symbol= pair;
            opts.section= "hist";


            var coffee = await getCoffee();
            console.log(pair)
            await bfxRest.candles(opts, (err, res) => {
              if (err) console.log(err)
              if(res){
                  let a = res[1][5]; //volume1
                  let b = res[2][5]; //volume2
                  let open1 = res[1][1];
                  let close1 = res[1][2];
                  let open2 = res[2][1];
                  let close2 = res[2][2];

                  let vector2 = close2 - open2;
                  let vector1 = close1 - open1;

                  var kkk = a - b;
                  let rrr = Math.abs(((a-b)/a)*100);
                  if(b>a){
                    if(rrr > 5){
                      if(Math.sign(vector1) === Math.sign(vector2)){
                          console.log('done');
                          var vector_sign_sign = Math.sign(vector2);
                          var vector_sign = '';
                          if(vector_sign ==='-'){
                            vector_sign = 'Красная';
                          }else{
                            vector_sign = "Зеленая"
                          }
                          //bot.sendMessage("294132907", "Пара: "+pair+"\r\nтаймфрейм: "+tf+"\r\nПроцент: "+rrr+"\r\nНаправленность: "+vector_sign);
                          bot.sendMessage("7618953", "Пара: "+pair+"\r\nтаймфрейм: "+tf+"\r\nПроцент: "+rrr+"\r\nНаправленность: "+vector_sign);
                          //bot.sendMessage("294132907", "Пара: "+pair+"\r\nтаймфрейм: "+tf+"\r\nПроцент: "+rrr+"\r\nНаправленность: "+vector_sign);
                          //bot.sendMessage("", "Пара: "+pair+"\r\nтаймфрейм: "+t_frame+"\r\nПроцент: "+rrr);
                      }else{
                          console.log('vector error')
                      }

                    }else{
                      console.log('percent none')
                    }
                  }else{
                      console.log('b>a none')
                  }
                }
              })

      }

  } catch (e) {
    console.error(e); // 💩
  }
}
